<?php include_once('./common/header.php'); ?>
<script src="assets/form.js"></script>
<style>
    #input_test {
        margin: 50px 0 0 ;
    }

</style>

<div class="container" style="width: 920">

    <div id ="input_test" class="input-append" style="text-align: center">
        <input class="input-xlarge" placeholder="输入测试代码的地址" id="test_src" type="text"><br>
        <button class="btn btn-primary " type="button " id="run_test">测试</button>

    </div>

    <div id="myModal" style="width: 700px" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            <h3 id="myModalLabel">测试结果</h3>
        </div>
        <div class="modal-body result-report">

        </div>
        <div class="modal-footer">
            <button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>

        </div>
    </div>

    <script>
        (function () {
            var isConnected = false;
            var http_host = location.host || "localhost";
            var url = 'http://' + http_host + ":3030" + "/socket.io/socket.io.js"


            jQuery.getScript(url, function () {

                var socket = io.connect('http://' + http_host + ":3030");

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
                        var src = jQuery("#test_src").val();

                        jQuery("#myModal .modal-body").html("正在测试....");
                        $('#myModal').modal('show');
                        socket.emit("remote:task_start", {"task_inject_uri":src})
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
                    socket.on("remote:task_finish", function (data) {
                        $('#myModal').modal('show');
                        for(var p in data.task_result){
                            console.log(data.task_result[p])
                            jQuery("#myModal .modal-body").html("")
                            jsonReporter.renderHTML(data.task_result[p], jQuery("#myModal .modal-body"));
                        }


                        console.log("remote:task_finish", data)
                    })


                    // Send task report to server through Socket.IO
                    // by trigger method of emit of socket object
                    // socket.emit('console:task_finish', jasmineData);
                })


            })


        })();
    </script>



    <?php include_once('./common/footer.php'); ?>




</div>