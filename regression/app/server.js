/**
 * UITester Server Module
 * @author LongGang <tblonggang@gmail.com>
 * @description UITester auto test server
 * @require:
 *      1. underscore (npm install unerscore)
 *      2. socket.IO (npm install socket.io)
 */
//回归服务
var http = require("http"),
    socket = require('socket.io'),
    fs = require('fs'),
    userAgent = require('user-agent');

var app = http.createServer(handler),
    io = socket.listen(app, { 'log level':2 });

app.listen(3030);

function handler(req, res) {
    if(req.url.indexOf("run.html")!=-1){
        fs.readFile(__dirname + '/run.html', function (err, data) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading console.html');
            }
            res.writeHead(200);
            res.end(data);
        })
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

var ClientManager = require('client-mgr'),
    TaskManager = require('task-mgr').TaskManager,
    RemoteTaskManager = require('remote-task').RemoteTaskManager,
    EventManager = require('event-mgr');

ClientManager.init();
RemoteTaskManager.init();
TaskManager.init();


io.sockets.on('connection', function (socket) {
    // wrapper object
    var clientObject = null;

    // Socket.IO disconnected
    socket.on('disconnect', function () {
        if (clientObject)  EventManager.emit('client:disconnect', clientObject);
    });

    // Register client after Socket.IO connected
    socket.on('console:register', function (data) {


        clientObject = {
            socket:socket,
            userAgent:userAgent.parse(data.userAgent)
        };

        EventManager.emit('client:register', clientObject);
    });

    socket.on('remote:task_start', function (data) {
        console.log("remote:task_start",data);

        var remoteTask = {
            task:data,
            socket:socket
        };

        RemoteTaskManager.taskStart(remoteTask);
    });

    // For Console Request
    socket.on('console:get_summary', function (){
        EventManager.emit('client:send_summary', clientObject);
    });

});
//远程运行服务


