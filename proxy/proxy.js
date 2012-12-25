var http = require('http');
var https = require('https');
var url = require('url');
var util = require('util');
var zlib = require('zlib');
var fs = require('fs');

var request_id_next = 1;


var server = http.createServer(function (request, response) {
    var request_url = url.parse(request.url);
console.log(request.method, request.url)
    var proxy_options = {};
    proxy_options.headers = request.headers;
    proxy_options.path = request_url.path;
    proxy_options.method = request.method;
    proxy_options.host = request_url.hostname;
    proxy_options.port = request_url.port || 80;

    proxy_options.headers["accept-encoding"] = '*;q=1,gzip=0'

    request.id = "request_id_" + ( request_id_next++ );


    var proxy_request = http.request(proxy_options,function (proxy_response) {

        var content_type = proxy_response.headers['content-type'] || "";
        var is_text = content_type.match('text\/html') || 0;
        var mybuffer = '';
        var output = '';
        proxy_request.myresponse = proxy_response;
        proxy_request.do_close = 0;


        if (request.url.match(/\.(ico|xml|css|js|jpg|gif|png)/i)) {
            is_text = 0;
        }
        if (request.url.match(/(owa|facebook|gravatar|vimeo|stumbleupon)/)) {
            is_text = 0;
        }

        var len = parseInt(proxy_response.headers['content-length'], 10);
        var s = '<script src="http://assets.daily.taobao.net/p/uitest/build/uitest-jquery.js" ></script>';
        // this only works if we dont change the content-lenght, but only rearrange
        if (is_text&&len) {
            len = proxy_response.headers['content-length'] = len + s.length;
        }


        var contentEncoding = proxy_response.headers['content-encoding']
        if (!contentEncoding) {
            contentEncoding = '';
        }

        if (!is_text) {
            response.writeHead(proxy_response.statusCode, proxy_response.headers);
        }


        var cur = 0;


        var buffers = []
        proxy_response.on('data', function (chunk) {
            if (is_text) {
                buffers.push(chunk);
            } else {
                response.write(chunk);
            }


            if (proxy_request.do_close == 1) {
                proxy_request.abort();
            }
        });


        proxy_response.on('end', function () {
            if (is_text) {

                var buffers_all = Buffer.concat(buffers);
                if (proxy_response.headers['content-encoding']) {


                    zlib.gunzip(buffers_all, function (err, bufferrs) {
                        if (!err) {

                            mybuffer = bufferrs.toString("binary");

                            mybuffer = mybuffer.replace(/\<\!doctype/i, s+'<!doctype');

                            bufferrs = new Buffer(mybuffer, "binary");

                            zlib.gzip(bufferrs, function (er, newBuffer) {
                                if (!er) {
                                    console.log("replace4");
                                    proxy_response.headers['content-length'] = newBuffer.length;
                                    response.writeHead(proxy_response.statusCode, proxy_response.headers);
                                    response.write(newBuffer)
                                    response.end();
                                }
                            })

                        }
                    })

                }
                else {
                    mybuffer = buffers_all.toString("binary");
                    mybuffer = mybuffer.replace(/\<head\>/i, '<head>' + s);

                    response.writeHead(proxy_response.statusCode, proxy_response.headers);
                    response.write(mybuffer, "binary");
                    response.end();
                }
            }
            else {
                response.end();
            }


        });

    }).on('error', function (e) {

        })
    proxy_request.on('close', function () {

        if (proxy_request) {
            proxy_request.end();

        }

    })
    proxy_request.on('end', function () {
        proxy_request.end();
    })

    request.on('data', function (chunk) {

        proxy_request.write(chunk);
    });
    request.on('end', function () {

        proxy_request.end();
    });
    request.on('close', function () {

        proxy_request.do_close = 1;
        //proxy_request.end();
    });

}).listen(
    8080
)
server.on('error', function (e) {
    console.log('got server error' + e.message);
});

// curl -k https://localhost:8000/






https.createServer(httpsConfig,function(req,res){
    res.writeHead(500, {
    });

    console.log(123);
    res.write("123123")
    res.end();
}).listen(8083)







console.log("server on listen  8080")

