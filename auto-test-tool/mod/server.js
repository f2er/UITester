 /**
 * UITester Server Module
 * @author: LongGang <tblonggang@gmail.com>
 * require:
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

// Generate unique id for identify client
// function guid (){
//     if (!this.guid){ this.guid = 0; }
//     return this.guid++;
// }

var ClientManager = require('./client-mgr'),
    // TaskManager = require('./task-mgr'),
    EventManager = require('./event-mgr');

ClientManager.init();
// TaskManager.init();

// app.on('connection', function (socket){
//     console.log(socket);
// });

io.sockets.on('connection', function (socket) {
    // store client info for ident
    var clientObject = {};

    // Socket.IO disconnected
    socket.on('disconnect', function (){
        EventManager.emit('client:disconnect', clientObject);
    });

    // Register client after Socket.IO connected
    socket.on('console:register', function (data){
        // Mix clientType(just ua) to clientObject

        socket.userAgent = userAgent.parse(data.userAgent);
        EventManager.emit('client:register', socket);
    });

    // Client task finished, report send back
    socket.on('console:task_finish', function (data){
        // Mix Jasmine report to clientObject
        clientObject.task_report_data = data.task_report_data;

        EventManager.emit('client:task_finish', data);
    });

    // Socket.IO connected
    socket.emit('console:is_connected', {
        msg: 'UITester: Your ClientId is connected.'
    });
});
