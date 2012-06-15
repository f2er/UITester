postmsg.bind(function(data) {
	console.log('outer output: ', data);
    var jsonReporter = new jasmine.JsonReporter;
      
	KISSY.use("template", function (S, Template) {
            var div = document.createElement('div');
			document.body.appendChild(div); 
			div.innerHTML = "<div class='result-report'>" + jsonReporter.renderHTML(data);
			if (KISSY.DOM.val('#J_MailTo')) {
				KISSY.io.setupConfig({
					contentType: "application/x-www-form-urlencoded; charset=GBK",
				});
				KISSY.io.post('/mail/send.php', {
					to: KISSY.DOM.val('#J_MailTo'),
					subject: 'uitest report',
					msg: '<link href="http://uitest.taobao.net/UITester/lib/jasmine.css" rel="stylesheet">' + div.innerHTML
				});
			}
    });
});
