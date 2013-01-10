<?php $nav='list'; include_once('./common/header.php'); ?>
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

    #detail-info {
        border: solid 1px #CCC;
        padding: 10px;
        border-radius: 4px;
        background-color: #FAFAFA;
        margin: 30px 0;

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
        $prev_time = $result_item['prev_time'] == '0000-00-00 00:00:00' ? '' : $result_item['prev_time'];
    }
}
?>
<div style="margin: 10px 0;">
    <span style="line-height: 20px; font-size: 24.5px;font-weight: bold"><?php echo $result_item['task_name'] ?></span>

    <div style="float: right">


        <a id="go_local_test" class="btn btn-small" href="#" rel="tooltip" data-placement="top"
           data-original-title="在当前的浏览器窗口运行测试用例,需要安装浏览器插件<a href='http://assets.daily.taobao.net/p/uitest/plugin/chrome/src.rar'>chrome</a><a href='http://assets.daily.taobao.net/p/uitest/plugin/ie/setup/setup.rar'>ie</a>">本地测试</a>
        <a id="go_test" target="_blank" class="btn btn-small" href="#" rel="tooltip" data-placement="top"
           data-original-title="通过后台浏览器运行测试用例">远程测试</a>
<?php if($creator === $userName) { ?>
        <a class="btn btn-small" href="modify.php?id=<?php echo $result_item['id'] ?>">修改</a>
        <a target="_self" class="btn btn-small"
           href="handle.php?modify_tag=remove&task_id=<?php echo $result_item['id'] ?>">删除</a>
<?php } ?>
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
        <li>上次回归时间:<?php echo $prev_time ?></li>
    </ul>
</div>

<div>


    <div id="result-report">

    </div>
    <!-- Modal -->
    <div id="myModal" style="width: 700px" class="modal hide fade" tabindex="-1" role="dialog"
         aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            <h3 id="myModalLabel">测试结果</h3>
        </div>
        <div class="modal-body " id="m-result-report">

        </div>
        <div class="modal-footer">
            <button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>

        </div>
    </div>
    <?php include_once('./common/footer.php'); ?>
    <script>

        var random = 1;
        var renderResult = function (el, result) {
            random++;
            var c = $(el);
            var jsonReporter = new jasmine.JsonReporter();
            var navHtml = '<ul class="nav nav-tabs" >'
            var bodyHtml = '<div class="tab-content result-report">'
            for (var p in result) {
                if (result[p].reports.failedSpecs !== 0 || result[p].reports.errors.length !== 0) {
                    var passed = "未通过"
                }
                else {

                    var passed = "通过"
                }

                var name = p.replace(/\./g, "_") + random

                navHtml += '<li class=""><a href="#' + name + '">' + p + passed + '</a></li>'
                bodyHtml += '<div class="tab-pane " id="' + name + '"></div>'

            }
            navHtml += "</ul>";
            bodyHtml += "</div>";
            c.html(navHtml + bodyHtml);


            var i = 1;
            jQuery.each(result, function (key, value) {
                var name = key.replace(/\./g, "_") + random;
                if (i) {
                    $('.nav-tabs a[href="#' + name + '"]', c[0]).tab('show');
                    i = 0;
                }

                jsonReporter.renderHTML(value, jQuery("#" + name));
            });


            $('.nav-tabs a', c[0]).click(function (e) {
                e.preventDefault();
                $(this).tab('show');
            })


        }


        jQuery(document).ready(function () {
            var result = <?php echo $result ?>;
            renderResult("#result-report", result);
        });
    </script>

    <script>
        (function () {
            $("#go_local_test").tooltip({
                html:true
            })
            $("#go_test").tooltip({
                html:true
            })
            jQuery("#go_local_test").on("click", function (e) {
                e.preventDefault();
                jasmine._newEnv = true;
                var isLoad = false;
                jQuery.getScript("<?php echo $task_inject_uri  ?>", function () {
                    isLoad = true;
                    UT.execute(function (data) {
                        var jsonReporter = new jasmine.JsonReporter();
                        jsonReporter.renderHTML(data, jQuery("#m-result-report"));
                    })
                })
                setTimeout(function(){
                    if(!isLoad)alert("js未能加载成功")

                },1000*5)

            })
        })();
        (function () {
            var isConnected = false;
            var socket;
            var http_host = location.host || "localhost";
            var url = 'http://' + http_host + ":3030" + "/socket.io/socket.io.js"

            $('#myModal').modal({show:false})

            jQuery("#go_test").on("click", function (e) {
                e.preventDefault();
                $('#myModal').modal('show');
                if (isConnected) {

                    jQuery("#myModal .modal-body").html("正在测试....");

                    socket.emit("remote:task_start", {"task_inject_uri":"<?php echo $task_inject_uri  ?>"})

                }
                else {
                    jQuery.getScript(url, function () {

                        socket = io.connect('http://' + http_host + ":3030");


                        socket.on("connect", function () {


                            isConnected = true;
                            jQuery("#myModal .modal-body").html("正在测试....");

                            socket.emit("remote:task_start", {"task_inject_uri":"<?php echo $task_inject_uri  ?>"})


                            socket.on("remote:task_finish", function (data) {
                                jQuery("#myModal .modal-body").html("正在测试....");
                                renderResult("#m-result-report", data.task_result)

                            })


                            // Send task report to server through Socket.IO
                            // by trigger method of emit of socket object
                            // socket.emit('console:task_finish', jasmineData);
                        })


                    })
                }


            })


        })();
    </script>


</div>