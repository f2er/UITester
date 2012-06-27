<?php include_once('./common/header.php'); ?>

<?php
$task_id = trim($_REQUEST['task_id']);

if ($task_id === '') {
    echo('未指定参数 task_id');
    exit;
}

include_once('conn_db.php');

$sql = 'select * from list where id = ' . $task_id;

$query_result = mysql_query($sql);
$result_item = mysql_fetch_assoc($query_result);

$iframe_uri = $result_item['task_target_uri'];
$iframe_uri .= 'inject-taskid=' . $result_item['id'];

echo '<script>var taskInfo = {id:' . $result_item['id'] . ';target_uri:"'.$iframe_uri.'"}</script>'

?>


<div class="run-case-nav">

    <input type="checkbox" id="run-auto"/><a class="run-auto">定时执行</a>

           <span class="run-auto-set" style="display:none;">

               间隔时间：<select id="long-time">
               <option value="1">1分钟</option>
               <option value="2">2分钟</option>
               <option value="5">5分钟</option>
               <option value="10">10分钟</option>
               <option value="30">30分钟</option>

               <option value="60">1小时</option>
               <option value="120">2小时</option>
               <option value="3600">6小时</option>
               <option value="72000">12小时</option>
               <option value="144000">24小时</option>
           </select>

            邮件地址：<input type="text" id="J_MailTo" name="to" placeholder="请输入邮箱地址"/>
               <span class="gray">(定时测试时，请不要关闭些页面，当用例不通过时，会即时通过邮件通知您)</span>
</span>

</div>
<div class="run-case">


    <div id="run-result">正在测试......</div>

    <iframe id="run-iframe" src="<?php echo $iframe_uri ?>" frameborder="0" width="100%"
        ></iframe>


    <script src="http://uitest.taobao.net/lib/kissy-aio.js"></script>
    <script src="http://uitest.taobao.net/lib/jquery-1.7.2.min.js"></script>
    <script src="http://uitest.taobao.net/lib/jasmine.js"></script>
    <script src="http://uitest.taobao.net/lib/jasmine-html.js" charset="UTF-8"></script>
    <script src="http://uitest.taobao.net/lib/event-simulate.js"></script>
    <script src="http://uitest.taobao.net/tool/record/postmsg.js"></script>
    <script src="http://uitest.taobao.net/tool/js/outerRun.js"></script>
    <link rel="stylesheet" type="text/css" href="http://uitest.taobao.net/lib/jasmine.css">


</div>
<script>
    var buildUrl = function () {

        var args = Array.prototype.slice.call(arguments);

        if (args.length < 2) {
            return args[0] || '';
        }

        var uri = args.shift();

        var splitArray = uri.split("#");

        uri =splitArray[0];
        var hash = splitArray[1];



        if (hash) {
            hash = "#" + hash;
        }
        else hash = ""

        uri += uri.indexOf('?') > 0 ? '&' : '?';

        return uri + args.join('&').replace(/&+/g, '&') + hash;

    }

    $("#run-iframe").attr("src",buildUrl(taskInfo.target_uri,"__TEST__=true","inject-taskid="+taskInfo.id))
</script>

<?php include_once('./common/footer.php'); ?>