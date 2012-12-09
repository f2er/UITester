 /**
 * UITester Server Module
 * @author LongGang <tblonggang@gmail.com>
 * @description UITester auto test server
 * @require:
 *      1. underscore (npm install unerscore)
 *      2. socket.IO (npm install socket.io)
 */

var app = require('http').createServer(handler),
    io = require('socket.io').listen(app, { 'log level': 2 }),
    fs = require('fs'),
    userAgent = require('./user-agent');

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

var ClientManager = require('./client-mgr'),
    // TaskManager = require('./task-mgr'),
    EventManager = require('./event-mgr');

ClientManager.init();
// TaskManager.init();

// app.on('connection', function (socket){
//     console.log(socket);
// });

io.sockets.on('connection', function (socket) {
    // wrapper object
    var clientObject = {
        socket: socket
    };

    // Socket.IO disconnected
    socket.on('disconnect', function (){
        EventManager.emit('client:disconnect', clientObject);
    });

    // Register client after Socket.IO connected
    socket.on('console:register', function (data){
        clientObject.userAgent = userAgent.parse(data.userAgent);
        EventManager.emit('client:register', clientObject);
    });

    // Client task finished, report send back
    socket.on('console:task_finish', function (data){
        clientObject.reportData = data.reportData;
        EventManager.emit('client:task_finish', data);
    });

    // Socket.IO connected
    socket.emit('console:is_connected', {
        msg: 'UITester: Your ClientId is connected.'
    });

    // This is just simulate event of task:data_update
    // simply by console.html for testing
    socket.on('console:send_test_data_update', function (){
        EventManager.emit('task:data_update');
    });
});
