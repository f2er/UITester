function start () {
    console.log(time() + ' [INFO] ' + 'Mother process is running.');

    var ls = require('child_process').spawn('node', ['server.js']);

    ls.stdout.on('data', function (data) {
		data.toString().split('\n').forEach(function(line) {
			line && console.log(time() + ' [INFO] ' + line);
		});
    });

    ls.stderr.on('data', function (data) {
		data.toString().split('\n').forEach(function(line) {
	        line && console.log(time() + ' [ERROR] ' + line);
		});
    });

    ls.on('exit', function (code) {
        console.log(time() + ' [ERROR] ' + 'child process exited with code ' + code);
        delete(ls);
        setTimeout(start, 3000);
    });

};

function time() {
	var date = new Date();
	return '' + 
			(date.getYear() + 1900) + '-' + 
			padding(date.getMonth()+1) + '-' + 
			padding(date.getDate()) + ' ' + 
			padding(date.getHours()) + ':' + 
			padding(date.getMinutes()) + ':' + 
			padding(date.getSeconds()) + '.' + 
			padding(date.getMilliseconds(), 3)
}
function padding(num, count) {
	if (count) {
		return num > 99 ? num : '0' + (num > 9 ? num : '0' + num);
	} else {
		return num > 9 ? num : '0' + num;
	}
}

start();