/**
 * UITester Server Module
 * @author: LongGang <tblonggang@gmail.com>
 * require:
 *      1. underscore (npm install unerscore)
 *      2. socket.IO (npm install socket.io)
 */
var app = require('http').createServer(handler),
    io = require('socket.io').listen(app),
    fs = require('fs');

app.listen(3030);

function handler (req, res) {
    fs.readFile(__dirname + '/../console.html', function (err, data) {
        if (err) {
            res.writeHead(500);
            return res.end('Error loading console.html');
        }

        res.writeHead(200);
        res.end(data);
    });
}

var clientManager = require('./client-mgr'),
    // taskManager = require('./task-mgr'),
    eventManager = require('./event-mgr');

clientManager.init({
    eventManager: eventManager
});

// taskManager.init({
//     eventManager: eventManager
// });


// app.on('connection', function (socket){
//     console.log('hey http');
// });

io.sockets.on('connection', function (socket) {
    // console.info(socket);

    socket.on('disconnect', function (){
        eventManager.emit('client_disconnect');
    });

    socket.emit('client_is_connected', '[Server Msg] Your client is connected to server');

    socket.on('client_register', function (data){
        console.info(data);
        eventManager.emit('client_connect', data);
    });

    socket.on('client_task_finish', function (data){
        eventManager.emit('client_task_finish', data);
    });
});

