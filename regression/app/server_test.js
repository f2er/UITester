/**
 * UITester Server Module
 * @author LongGang <tblonggang@gmail.com>
 * @description UITester auto test server
 * @require:
 *      1. underscore (npm install unerscore)
 *      2. socket.IO (npm install socket.io)
 */
//回归服务


var io = require('socket.io-client');

//建立浏览器链接服务

var socket = io.connect("localhost",{port:3033});
socket.on("connect",function(){
    console.log("client")
})
socket.on("browser",function(data){
   console.log(data)
})



//远程运行服务


