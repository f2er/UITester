var net = require('net');
var local_port = 8080;
var zlib = require('zlib');

//在本地创建一个server监听本地local_port端口
net.createServer(function (client) {

    //首先监听浏览器的数据发送事件，直到收到的数据包含完整的http请求头
    var buffer = new Buffer(0);
    var buffers = [];
    var frist = true;
    var is_text = 0;
    var is_https = 0;
    var is_gzip = 0;
    var is_first = 1;
    var qqq = {}

    client.on('data', function (data) {

        buffer = buffer_add(buffer, data);


        if (buffer_find_body(buffer) == -1) return;
        var req = parse_request(buffer);
        if (req === false) return;
        client.removeAllListeners('data');
        if (buffer) {
            is_text = buffer.toString('utf8').match('text\/html') || 0;
            is_https = buffer.toString('utf8').match(/https/i) || 0;
        }

        console.log("is_text" + is_text)
        console.log(req)


        if (req.path && req.path.match(/\.(ico|xml|css|js|jpg|gif|png)/i)) {
            is_text = 0;
        }
        if (req.path && req.path.match(/(owa|facebook|gravatar|vimeo|stumbleupon)/)) {
            is_text = 0;
        }
        qqq = req;
        relay_connection(req);
        console.log(req.method, req.host, req.path)

    });

    //从http请求头部取得请求信息后，继续监听浏览器发送数据，同时连接目标服务器，并把目标服务器的数据传给浏览器
    function relay_connection(req) {
        // console.log(req.method+' '+req.host+':'+req.port);

        //如果请求不是CONNECT方法（GET, POST），那么替换掉头部的一些东西
        if (req.method != 'CONNECT') {
            //先从buffer中取出头部
            var _body_pos = buffer_find_body(buffer);
            if (_body_pos < 0) _body_pos = buffer.length;
            var header = buffer.slice(0, _body_pos).toString('utf8');
            //替换connection头
            header = header.replace(/(proxy\-)?connection\:.+\r\n/ig, '')
                .replace(/Keep\-Alive\:.+\r\n/i, '')
                .replace("\r\n", '\r\nConnection: close\r\n');

            //  header = header.replace(/accept\-encoding\:.+\r\n/i, '*;q=1,gzip=0');

            //替换网址格式(去掉域名部分)
            if (req.httpVersion == '1.1') {
                var url = req.path.replace(/http\:\/\/[^\/]+/, '');
                if (url.path != url) header = header.replace(req.path, url);
            }
            buffer = buffer_add(new Buffer(header, 'utf8'), buffer.slice(_body_pos));
        }

        //建立到目标服务器的连接
        var server = net.createConnection(req.port, req.host);
        //交换服务器与浏览器的数据
        client.on("data", function (data) {
            //  console.log("client data", data.toString());
            server.write(data);
        });

        server.on("data", function (data) {
            console.log(qqq.host + " server data:-------" + data.length + "----------------------------");
            console.log(data.toString().substring(0, 200));
            if (is_https) {
                client.write(data);
                return;
            }
            if (is_text && data) {
                console.log("is_text")
                buffers.push(data);
                return;
                var uitest = '<script src = "http://a.tbcdn.cn/p/uitest/build/uitest.js"></script>'

                var _body_pos = buffer_find_body(data);
                if (_body_pos < 0) _body_pos = data.length;
                var header = data.slice(0, _body_pos).toString('utf8');
                var bodyBuffer = data.slice(_body_pos, data.length);


                if (header.indexOf("gzip") != -1) {
                    console.log("zip")
                    buffers.push(data);
                    is_gzip = 1;


                }
                else {
                    console.log("nozip")
                    var body = bodyBuffer.toString('utf8');
                    if (body.match(/^\s*\<!DOCTYPE/i)) {
                        body = uitest + body;


                        if (getLength(header)) {
                            var l = uitest.length + parseInt(getLength(header).trim());
                            console.log(l)

                            header = setLength(header, l);

                        }


                        client.write(new Buffer(header + body))
                    }
                }


                ;
            }
            else {
                client.write(data);
            }


        });


        server.on("end", function (data) {
            if (is_text) {
                console.log("end",data)
                var uitest = '<script src = "http://a.tbcdn.cn/p/uitest/build/uitest.js"></script>'

                var allBuffers = Buffer.concat(buffers);
                var _body_pos = buffer_find_body(allBuffers);
                if (_body_pos < 0) _body_pos = allBuffers.length;
                var header = allBuffers.slice(0, _body_pos).toString('utf8');
                var bodyBuffer = allBuffers.slice(_body_pos, allBuffers.length-4);


                if (header.indexOf("gzip") != -1) {

                    console.log(bodyBuffer.length)
                    zlib.gunzip(bodyBuffer, function (err, result) {
                        console.log("in gzip", err)
                        if (!err) {
                            var body = result.toString('utf8');
                            console.log("gunzip")
                            if (body.match(/^\s*\<!DOCTYPE/i)) {
                                body = uitest + body;
                                if (getLength(header)) {
                                    var l = uitest.length + parseInt(getLength(header).trim());
                                    console.log(l)

                                    header = setLength(header, l);

                                }
                                zlib.gzip(new Buffer(body), function (er, newBuffer) {
                                    if (!er) {
                                        client.write(Buffer.concat([new Buffer(header), newBuffer]))
                                        client.end(data);
                                    }
                                })

                            }

                        }
                    })


                }
                else{
                    console.log("nozip")
                    var body = bodyBuffer.toString('utf8');
                    if (body.match(/^\s*\<!DOCTYPE/i)) {
                        body = uitest + body;
                        if (getLength(header)) {
                            var l = uitest.length + parseInt(getLength(header).trim());
                            console.log(l)
                            header = setLength(header, l);
                        }
                        client.write(new Buffer(header + body))
                    }
                }
            }


        });

        server.on("error", function (err) {
            console.log(err);

        })


        if (req.method == 'CONNECT')
            client.write(new Buffer("HTTP/1.1 200 Connection established\r\nConnection: close\r\n\r\n"));
        else {
            server.write(buffer);
        }

    }
}).listen(local_port);

console.log('Proxy server running at localhost:' + local_port);


//处理各种错误
process.on('uncaughtException', function (err) {
    console.log("\nError!!!!");
    console.log(err);
});


/**
 * 从请求头部取得请求详细信息
 * 如果是 CONNECT 方法，那么会返回 { method,host,port,httpVersion}
 * 如果是 GET/POST 方法，那么返回 { metod,host,port,path,httpVersion}
 */
function parse_request(buffer) {
    var s = buffer.toString('utf8')
    var method = s.split('\n')[0].match(/^([A-Z]+)\s/)[1];
    if (method == 'CONNECT') {
        var arr = s.match(/^([A-Z]+)\s([^\:\s]+)\:(\d+)\sHTTP\/(\d\.\d)/);
        if (arr && arr[1] && arr[2] && arr[3] && arr[4])
            return { method:arr[1], host:arr[2], port:arr[3], httpVersion:arr[4] };
    }
    else {
        var arr = s.match(/^([A-Z]+)\s([^\s]+)\sHTTP\/(\d\.\d)/);
        if (arr && arr[1] && arr[2] && arr[3]) {
            var host = s.match(/Host\:\s+([^\n\s\r]+)/)[1];
            if (host) {
                var _p = host.split(':', 2);
                return { method:arr[1], host:_p[0], port:_p[1] ? _p[1] : 80, path:arr[2], httpVersion:arr[3] };
            }
        }
    }
    return false;
}


/**
 * 两个buffer对象加起来
 */
function buffer_add(buf1, buf2) {
    var re = new Buffer(buf1.length + buf2.length);
    buf1.copy(re);
    buf2.copy(re, buf1.length);
    return re;
}

/**
 * 从缓存中找到头部结束标记("\r\n\r\n")的位置
 */
function isText() {

}
function isGzip(header, name) {


    return header


}
function getHead(buffer, name) {


    var _body_pos = buffer_find_body(buffer);
    if (_body_pos < 0) _body_pos = buffer.length;
    var header = buffer.slice(0, _body_pos).toString('utf8');
    var headerArray = header.split("\r\n");
    for (var i = 0; i < headerArray.length; i++) {
        if (headerArray[i].indexOf(name) != -1) {
            return headerArray[i].substring(headerArray[i].indexOf(":") + 1, headerArray[i].length)
        }
    }


}
function getLength(headerString) {


    var matcher = headerString.match(/Content\-Length\:\s*(\d*)\r\n/)
    return matcher && matcher[1];
}
function setLength(headerString, value) {


    return   headerString.replace(/(Content\-Length\:\s*)(\d*)(\r\n)/, '$1' + value + "$3")

}
function modifyContent(buffer) {

    if (buffer.toString().indexOf("HTTP/1.1") != -1) {

        console.log("modify")
        var addBuffer = new Buffer('a');
        var _body_pos = buffer_find_body(buffer);
        var headerBuffer = buffer.slice(0, _body_pos);

        var bodyBuffer = buffer.slice(_body_pos, buffer.length);
        var headerString = headerBuffer.toString();
        console.log(headerString);

        var l = addBuffer.length + parseInt(getLength(headerString));
        if (l) {
            headerString = setLength(headerString, l);
        }
        headerBuffer = new Buffer(headerString);
        return Buffer.concat([headerBuffer, addBuffer, bodyBuffer]);
    }
    else {
        return buffer;
    }

    // buffer.write("123",_body_pos,3)
}

function buffer_find_body(b) {
    for (var i = 0, len = b.length - 3; i < len; i++) {
        if (b[i] == 0x0d && b[i + 1] == 0x0a && b[i + 2] == 0x0d && b[i + 3] == 0x0a) {
            return i + 4;
        }
    }
    return -1;
}