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

// this is test event emit
eventManager.emit('client_disconnect');

io.sockets.on('connection', function (socket) {
    // socket.emit('news', { hello: 'world' });
    // socket.on('report', function (data) {
    //   console.log(data);
    // });
});