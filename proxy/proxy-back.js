var http = require('http');
var url = require('url');
var util = require('util');
var zlib = require('zlib');
//var nc  = require('ncurses');
//var StringDecoder = require('StringDecoder');

var spaces_b200 = new Buffer(200);
spaces_b200.fill(" ");
var spaces_200 = spaces_b200.toString();

var requests_status = "";
var requests_data = {};
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
    //  proxy_options.headers.encoding =null;
    //  proxy_options.headers["accept-encoding"] = '*;q=1,gzip=0'

    var spaces = new Buffer(90);
    spaces.fill(' ');
    var request_url_substr = (request.url + spaces ).substr(0, 90);
    request.id = "request_id_" + ( request_id_next++ );



    var proxy_request = http.request(proxy_options,function (proxy_response) {
        var content_type = proxy_response.headers['content-type'] || "";
        var is_text = content_type.match('text\/html') || 0;
        var mybuffer = '';
        var output = '';
        proxy_request.myresponse = proxy_response;
        proxy_request.do_close = 0;

        console.log(proxy_response.headers);

        if (request.url.match(/\.(ico|xml|css|js|jpg|gif|png)/i)) {
            is_text = 0;
        }
        if (request.url.match(/(owa|facebook|gravatar|vimeo|stumbleupon)/)) {
            is_text = 0;
        }

        if (is_text) {

            //  proxy_response.setEncoding('binary');
        }
        var len = parseInt(proxy_response.headers['content-length'], 10);
        var s = '<script src="http://assets.daily.taobao.net/p/uitest/build/uitest-jquery.js" ></script>';
        // this only works if we dont change the content-lenght, but only rearrange
        if (is_text) {
            len = proxy_response.headers['content-length'] = len + s.length;
        }


        var contentEncoding = proxy_response.headers['content-encoding']
        if (!contentEncoding) {
            contentEncoding = '';
        }

       if(!is_text) {
           response.writeHead(proxy_response.statusCode, proxy_response.headers);
       }


        var cur = 0;

        // there could be optimization to grab javascripts already from
        // chunks, and reinsert them at the on('end'), but its quite complicated
        // because a string can be split up in 2 chunks... load full buffer for now.
        var buffers = []
        proxy_response.on('data', function (chunk) {
            if (is_text) {
                buffers.push(chunk);

                // response.write(chunk);

                //buffers.push( chunk );
            } else {
                response.write(chunk);
            }




            if (proxy_request.do_close == 1) {
                proxy_request.abort();
            }
        });


        proxy_response.on('end', function () {
            if (is_text) {
                // workaround: to get multiline regex we convert nl to uffff and back
                //buffers_all = Buffer.concat( buffers );
                //var decoder = new StringDecoder('utf8');
                //output = decoder.write( buffers_all ).toString('utf8');

                var buffers_all = Buffer.concat(buffers);
                if (proxy_response.headers['content-encoding']) {

                    /* response.write(buffers_all)

                     response.end();
                     return;
                     */
                    zlib.gunzip(buffers_all, function (err, bufferrs) {
                        if (!err) {

                            mybuffer = bufferrs.toString("binary");

                            mybuffer = mybuffer.replace(/\<head\>/i, '<head>' + s);

                            bufferrs = new Buffer(mybuffer, "binary");

                            zlib.gzip(bufferrs, function (er, qwe) {
                                if(!er){
                                    console.log("replace4");
                                    proxy_response.headers['content-length']  = qwe.length;
                                    response.writeHead(proxy_response.statusCode, proxy_response.headers);
                                    response.write(qwe)

                                    response.end();
                                }


                            })

                        }
                    })

                }
                else {
                    mybuffer = buffers_all.toString("binary");
                    mybuffer = mybuffer.replace(/\<head\>/i, '<head>' + s);


                    console.log("replace2");


                    response.writeHead(proxy_response.statusCode, proxy_response.headers);
                    response.write(mybuffer, "binary");

                    response.end();
                }


            }
            else {

                response.end();
            }


        });

    }).on('error',function (e) {

        }).on('close',function () {

            //POST ?
            if (proxy_request) {
                proxy_request.end();

            }

        }).on('end', function () {
            //console.log('sent post data');

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
).on('error', function (e) {
        console.log('got server error' + e.message);
    });

// set to 0 if you want to turn off ncurses display-refresh, 
// change refreshtimer in setInterval (default 1000 = 1seconds)

console.log('server stated on port 8080');

