<!DOCTYPE HTML>
<html lang="en">
<head>
        <meta charset="gbk">
        <title>UI Tester</title>

<link href="http://uitest.taobao.net/UITester/lib/jasmine.css" rel="stylesheet">
    <script src="http://a.tbcdn.cn/s/kissy/1.2.0/kissy.js"></script>
    <!-- <script src="task.js"></script> -->
</head>
<body>

    <?php
        $task_id = trim($_REQUEST['task_id']);

        if ($task_id === ''){
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

?>


<div style="font-size: 12px; padding: 3px; margin-bottom: 10px; background: yellow; color: red;">注入的地址: <?php echo $iframe_uri ?></div>
<div>
    邮件地址<input type="text" id="J_MailTo" name="to" value="bofei.zq@taobao.com,daolin@taobao.com" size="50" placeholder="请输入邮箱地址">    <br/>
    是否重复执行   <input type="checkbox" name="repeat">
</div>
<div style="margin-bottom: 20px"></div>
<iframe src="<?php echo $iframe_uri ?>" frameborder="0" style="border: 1px solid #000" width="100%" height="400"></iframe>


<script src="../lib/kissy-aio.js"></script>
<script src="http://uitest.taobao.net/UITester/lib/jasmine.js"></script>
<script src="http://uitest.taobao.net/UITester/lib/jasmine-html.js" charset="UTF-8"></script>
<script src="http://uitest.taobao.net/UITester/lib/event-simulate.js"></script>
<script src="record/postmsg.js"></script>
<script src="outerRun.js"></script>
</body>
</html>