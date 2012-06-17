var S = KISSY, D = S.DOM, E = S.Event;
var longtimeEl = D.get("#long-time");
var lastTime = new Date().getTime();
var longtime = 1000 * 60 * 60 * $(longtimeEl).val();
var timer = null;
var isAutoRun = D.get("#is-auto-run");
var showRunConfig = D.get("#show-run-config");
var isShowPage = D.get("#is-show-page");
var iframe = D.get("#run-iframe");

E.on(isAutoRun, "click", function () {
    if (isAutoRun.checked) {
        showRunConfig.style.display = "block";
        if (timer) {
            window.clearInterval(timer);
            timer = null;
        }
        timer = window.setInterval(function () {
            iframe.reload();
            D.get("#run-status").style.display ="block";
        }, longtime)
    }
    else {
        showRunConfig.style.display = "none";
    }
})
E.on(longtimeEl, "change", function () {
    
    console.log("change")

    longtime = 1000 * 60 * 60 * $(longtimeEl).val();
    console.log("change",longtime)
    if (timer) {
        window.clearInterval(timer);
        timer = null;
    }
    timer = window.setInterval(function () {
        iframe.reload();
        D.get("#run-status").style.display ="block";
    }, longtime)
})
E.on(isShowPage, "click", function () {
    if (D.hasClass(iframe, "hide")) {
        D.removeClass(iframe, "hide")
    }
    else {
        D.addClass(iframe, "hide")
    }
})

postmsg.bind(function (data) {

    var jsonReporter = new jasmine.JsonReporter;

    KISSY.use("template", function (S, Template) {
        var div = document.createElement('div');
        document.body.appendChild(div);
        div.innerHTML = "<div class='result-report'>" + jsonReporter.renderHTML(data);
        D.get("#run-status").style.display ="none";

        if (isAutoRun.checked && KISSY.DOM.val('#J_MailTo')) {

            KISSY.io.setupConfig({
                contentType:"application/x-www-form-urlencoded; charset=GBK"
            });
            KISSY.io.post('/mail/send.php', {
                to     :KISSY.DOM.val('#J_MailTo'),
                subject:'uitest report',
                msg    :'<link href="http://uitest.taobao.net/UITester/lib/jasmine.css" rel="stylesheet">' + div.innerHTML
            });

        }

    });
});
