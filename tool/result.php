<?php include_once('./common/header.php'); ?>
<script src="assets/form.js" xmlns="http://www.w3.org/1999/html"></script>
<style>
    .other {
        position: absolute;
        top: 70px;
        right: 161px;
        font-size: 14px;
        line-height: 2.5;
        border: 1px solid #eee;
        padding: 10px;
        min-width: 200px;
    }

</style>

<div class="container" style="width: 920px">


    <?php
    $task_name = '';
    $task_target_uri = '';
    $task_inject_uri = '';
    $modify_tag = '';

    $task_id = trim($_REQUEST['task_id']);

    if ($task_id !== '') {

        include_once('conn_db.php');

        $sql = 'select * from list where id = ' . $task_id;
        $taskResult = mysql_query($sql);

        if (mysql_num_rows($taskResult) > 0) {
            $result_item = mysql_fetch_assoc($taskResult);
            $task_name = $result_item['task_name'];
            $productline = $result_item['productline'];
            $week = $result_item['week'];
            $task_inject_uri = $result_item['task_inject_uri'];
            $creator = $result_item['creator'];
            $createtime = $result_item['createtime'];
            $result = $result_item['task_result'];
            $duration = $result_item['duration'];
            //数据库中是UTF8, 转换为GBK, 用于页面显示
            $result = mb_convert_encoding($result, 'GBK', 'UTF-8');
            $modify_tag = 'modify';
           $prev_time =  $result_item['prev_time'] == '0000-00-00 00:00:00' ? '' : $result_item['prev_time'];
        }
    }
    ?>
    <div style="margin: 10px 0;">
        <span style="line-height: 20px; font-size: 24.5px;font-weight: bold"><?php echo $result_item['task_name'] ?></span>

        <div style="float: right">
            <a id="go_test" target="_blank" class="btn btn-small" href="#">立即测试</a>
            <a class="btn btn-small" href="modify.php?id=<?php $result_item['id'] ?>">修改</a>
            <a target="_self" class="btn btn-small" href="handle.php?modify_tag=remove&task_id=<?php echo $result_item['id'] ?>">删除</a>
        </div>
    </div>


    <div id="detail-info">
        <ul class="unstyled">
            <li>产品线: <span id="productline" data-id="<?php echo $productline ?>"></span></li>
            <li>创建人: <span><?php echo $creator  ?></span></li>
            <li>测试用例地址: <a href="<?php echo $task_inject_uri  ?>"><?php echo $task_inject_uri  ?></a></li>
            <li>回归时间: <span id="weeks" data-id="<?php echo $week  ?>"></span></li>
            <li>回归频率: <?php echo $duration / 60  ?>小时</li>
            <li>创建时间: <?php echo $createtime  ?></li>
        </ul>
    </div>


    <p style="margin: 10px 0  5px 0">测试结果:(上次回归时间:<?php echo $prev_time ?>)</p>

    <ul class="nav nav-tabs" id="myTab">
        <li class="active"><a href="#chrome">chrome</a></li>
        <li><a href="#ie9">IE9</a></li>
        <li><a href="#ie8">IE8</a></li>
        <li><a href="#ie7">IE7</a></li>
        <li><a href="#ie6">IE6</a></li>
    </ul>

    <div class="tab-content result-report">
        <div class="tab-pane active" id="chrome"></div>
        <div class="tab-pane" id="ie9"></div>
        <div class="tab-pane" id="ie8"></div>
        <div class="tab-pane" id="ie7"></div>
        <div class="tab-pane" id="ie6"></div>
    </div>
    <!-- Modal -->
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
    <?php include_once('./common/footer.php'); ?>
    <script>
        $('#myTab a').click(function (e) {
            e.preventDefault();
            $(this).tab('show');
        })
        jQuery(document).ready(function () {
            var result = <?php echo $result ?>;
            //var json = S.JSON.parse(result.replace(/^.*{/g,'{').replace(/}.*$/g,'}'));
            var jsonReporter = new jasmine.JsonReporter();
            var i = 1;
            jQuery.each(result, function (key, value) {
                if (i) {
                    $('#myTab a[href="#' + key + '"]').tab('show');
                    i = 0;
                }
                jsonReporter.renderHTML(value, jQuery("#" + key));
            });
        });
    </script>

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


                jQuery("#go_test").on("click", function (e) {
                    e.preventDefault();
                    if (isConnected) {
                        var src = jQuery("#test_src").val();

                        jQuery("#myModal .modal-body").html("正在测试....");
                        $('#myModal').modal('show');
                        socket.emit("remote:task_start", {"task_inject_uri":"<?php echo $task_inject_uri  ?>"})
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


</div>