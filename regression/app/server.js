/**
 * UITester Server Module
 * @author LongGang <tblonggang@gmail.com>
 * @description UITester auto test server
 * @require:
 *      1. underscore (npm install unerscore)
 *      2. socket.IO (npm install socket.io)
 */
//回归服务
var ClientManager = require('client-mgr'),
    TaskManager = require('task-mgr'),
    fs = require("fs");



function handler(req, res) {
    if(req.url.indexOf("run.html")!=-1){
        fs.readFile(__dirname + '/run.html', function (err, data) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading run.html');
            }
            res.writeHead(200);
            res.end(data);
        })
    }
   else  if(req.url.indexOf("run_test.html")!=-1){
        fs.readFile(__dirname + '/run_test.html', function (err, data) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading run_test.html');
            }
            res.writeHead(200);
            res.end(data);
        })
    }
    else if(req.url.indexOf("console_v2.html")!=-1){
        fs.readFile(__dirname + '/console_v2.html', function (err, data) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading console_v2.html');
            }
            res.writeHead(200);
            res.end(data);
        });
    }
    else{
        fs.readFile(__dirname + '/console.html', function (err, data) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading console.html');
            }
            res.writeHead(200);
            res.end(data);
        });
    }

}



ClientManager.init(handler);

TaskManager.init(ClientManager);




//远程运行服务


