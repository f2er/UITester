<?php include_once('./common/header.php'); ?>
<script src="assets/form.js"></script>
<style>
    #input_test {
        margin: 200px 0 0 ;
    }

</style>

<div id="content" class="container" style="width: 920">

    <div id ="input_test"  style="text-align: center">
        <input class="input-xxlarge" placeholder="输入测试代码的地址" id="test_src" type="text"><br>
        <button class="btn" type="button" id="run_test">测试</button>

    </div>

    <div id="myModal" style="width: 700px" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            <h3 id="myModalLabel">测试结果</h3>
        </div>
        <div class="modal-body result-report" id="m-result-report"">

        </div>
        <div class="modal-footer">
            <button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>

        </div>
    </div>

    <script>
        (function () {
            var renderResult = function (el, result) {
                var c = $(el);
                var jsonReporter = new jasmine.JsonReporter();
                var navHtml = '<ul class="nav nav-tabs" >'
                var bodyHtml = '<div class="tab-content result-report">'
                for (var p in result) {
                    if(result[p].reports.failedSpecs !== 0||result[p].reports.errors.length !== 0){
                        var passed = "未通过"
                    }
                    else{

                        var passed = "通过"
                    }

                    var name = p.replace(/\./g,"_")

                    navHtml += '<li class=""><a href="#' + name + '">' + p + passed+ '</a></li>'
                    bodyHtml += '<div class="tab-pane " id="' + name + '"></div>'

                }
                navHtml += "</ul>";
                bodyHtml += "</div>";
                c.html(navHtml + bodyHtml);


                var i = 1;
                jQuery.each(result, function (key, value) {
                    var name = key.replace(/\./g,"_")
                    if (i) {
                        $('.nav-tabs a[href="#' + name + '"]',c[0]).tab('show');
                        i = 0;
                    }

                    jsonReporter.renderHTML(value, jQuery("#" + name));
                });


                $('.nav-tabs a', c[0]).click(function (e) {
                    e.preventDefault();
                    $(this).tab('show');
                })


            }
            var isConnected = false;
            var http_host = location.host || "localhost";
            var url = 'http://' + http_host + ":3030" + "/socket.io/socket.io.js"


            jQuery.getScript(url, function () {

                var socket = io.connect('http://' + http_host + ":3031");

                if (!window.console) {
                    window.console = {
                        log:function () {
                        },
                        info:function () {
                        },
                        debug:function () {
                        }
                    }
                }


                jQuery("#run_test").on("click", function () {
                    if (isConnected) {
                        var src = jQuery.trim(jQuery("#test_src").val());
                        jQuery("#myModal .modal-body").html("");
                        jQuery("#myModal .modal-body").append($('<p>开始测试....</p>'));
                        $('#myModal').modal('show');
                        socket.emit("start", {"url":src})
                    }
                    else {
                        alert("未能成功连接")
                    }

                })

                socket.on("connect", function () {
                    console.info("connect");
                    if (isConnected)return;
                    isConnected = true;
                    var jsonReporter = new jasmine.JsonReporter();
                    $('#myModal').modal({show:false})
                    socket.on("start_in_browser", function (data) {


                        jQuery("#myModal .modal-body").append($('<p>'+data.type+'开始运行</p>'));


                    })
                    socket.on("complete_in_browser", function (data) {


                        jQuery("#myModal .modal-body").append($('<p>'+data.type+'运行完成</p>'));


                    })
                    socket.on("complete", function (data) {


                        renderResult("#m-result-report", data.reports)


                    })


                    // Send task report to server through Socket.IO
                    // by trigger method of emit of socket object
                    // socket.emit('console:task_finish', jasmineData);
                })


            })


        })();
    </script>








</div>
<?php include_once('./common/footer.php'); ?>