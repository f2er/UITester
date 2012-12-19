

var util = require('util'),

    http = require('http'),
    httpProxy = require('http-proxy');



//
// Basic Http Proxy Server
//
httpProxy.createServer(9000, 'localhost').listen(8000);

//
// Target Http Server
//
http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    http.get(req.url, function(res){
        console.log( res);
       // res.write('request successfully proxied to: ' + req.url + '\n' + JSON.stringify(req.headers, true, 2));
      //  res.end();
    })
    res.end();

}).listen(9000);

util.puts('http proxy server started  on port 8000');
util.puts('http server started on port 9000');
