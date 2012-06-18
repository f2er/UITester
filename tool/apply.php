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
$iframe_uri .= (strpos($iframe_uri, '?') !== false) ? '&' : '?';

$iframe_uri .= 'inject-taskid=' . $result_item['id'];
$iframe_uri .= '&__TEST__';
echo '<script>var taskInfo = {id:' . $result_item['id'] . '}</script>'

?>


<div class="run-case-nav">

    <input type="checkbox" id="run-auto"/><a class="run-auto">定时执行</a><span class="gray">(当前窗口不能关闭)</span>

           <span class="run-auto-set" style="display:none;">

               间隔时间：<select id="long-time">
               <option value="1">1小时</option>
               <option value="6">6小时</option>
               <option value="12">12小时</option>
               <option value="24">24小时</option>
           </select>

            邮件地址：<input type="text" id="J_MailTo" name="to" placeholder="请输入邮箱地址"/>
               <span class="gray">(当用例不通过时，会即时通过邮件通知您)</span>
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


<?php include_once('./common/footer.php'); ?>