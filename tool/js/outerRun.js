var S = KISSY, D = S.DOM, E = S.Event;
var longtimeEl = D.get("#long-time");
var lastTime = new Date().getTime();
var longtime = 1000 * 60 * parseInt($(longtimeEl).val()) ;
var timer = null;
var isAutoRun = D.get("#run-auto");
var showRunConfig = D.get(".run-auto-set");

var iframe = D.get("#run-iframe");

E.on(isAutoRun, "click", function () {
    if (isAutoRun.checked) {
        showRunConfig.style.display = "block";
        if (timer) {
            window.clearInterval(timer);
            timer = null;
        }
        timer = window.setInterval(function () {
            iframe.src = iframe.src;
            D.get("#run-result").innerHTML =="正在测试"

        }, longtime)
    }
    else {
        showRunConfig.style.display = "none";
    }
})
E.on(longtimeEl, "change", function () {

    console.log("change")

    longtime = 1000 * 60 * parseInt($(longtimeEl).val());
    console.log("change", longtime)
    if (timer) {
        window.clearInterval(timer);
        timer = null;
    }
    timer = window.setInterval(function () {
        iframe.src = iframe.src
        D.get("#run-result").innerHTML =="正在测试"
    }, longtime)
})


postmsg.bind(function (data) {

    var jsonReporter = new jasmine.JsonReporter;

    KISSY.use("template", function (S, Template) {

        D.get("#run-result").innerHTML = "<div class='result-report'>" + jsonReporter.renderHTML(data);


        if (isAutoRun.checked && KISSY.DOM.val('#J_MailTo')) {

            KISSY.io.setupConfig({
                contentType:"application/x-www-form-urlencoded; charset=GBK"
            });
            KISSY.io.post('/mail/send.php', {
                to     :KISSY.DOM.val('#J_MailTo'),
                subject:'uitest report',
                msg    :'<link href="http://uitest.taobao.net/UITester/lib/jasmine.css" rel="stylesheet">' + div.innerHTML
            });

            if (timer) {
                window.clearInterval(timer);
                timer = null;
            }

        }

        KISSY.io.post('./update_result.php', {
            task_id:taskInfo.id,
            failed_specs:data.failedSpecs,
            total_specs :data.totalSpecs
        });

    });
});
