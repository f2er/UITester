(function () {
	var jasmineEnv = jasmine.getEnv();
	jasmineEnv.updateInterval = 1000;

	var htmlReporter = new jasmine.JsonReporter(function (json) {
		console.log(json)
		postmsg.send({
			target: parent,
			data: json
		});
	});
	jasmineEnv.addReporter(htmlReporter);

	setTimeout(function() {
		jasmineEnv.execute();
	}, 2000);
})();