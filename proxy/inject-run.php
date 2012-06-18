<?php echo $placeholder ?>

<!--inject-proxy-->
<script src="http://uitest.taobao.net/UITester/lib/jquery-1.7.2.min.js"></script>
<script src="http://uitest.taobao.net/UITester/lib/jasmine.js"></script>
<script src="http://uitest.taobao.net/UITester/lib/jasmine-html.js"></script>
<script src="http://uitest.taobao.net/UITester/lib/event-simulate.js"></script>
<script src="http://uitest.taobao.net/UITester/lib/matcher.js"></script>
<script src="http://uitest.taobao.net/UITester/tool/record/postmsg.js"></script>
<script>
    (function () {
        $(document).ready(function () {
            setTimeout(function () {
                $.getScript("<?php echo $task["task_inject_uri"] ?>", function () {

                    var jasmineEnv = jasmine.getEnv();
                    jasmineEnv.updateInterval = 1000;

                    var htmlReporter = new jasmine.JsonReporter(function (json) {
                        console.log(json)
                        postmsg.send({
                            target:parent,
                            data  :json
                        });
                    });
                    jasmineEnv.addReporter(htmlReporter);
                    jasmineEnv.execute();

                })
            }, 2000);
        })

    })();
</script>
