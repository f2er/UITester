<?php
//phpinfo();
//echo 'Cookie: '.$_SERVER['HTTP_COOKIE'];

//$script = 'http://'.$_SERVER["HTTP_X_FORWARDED_SERVER"].'/UITester/tool/loader.js';
$url = 'http://' . $_SERVER["HTTP_X_FORWARDED_HOST"] . $_SERVER["PATH_INFO"] . '?' . $_SERVER["QUERY_STRING"];
//准备数据

$allheaders = getallheaders();
$allheaders['Accept-Encoding'] = '';
$allheaders['Host'] = $allheaders['X-Forwarded-Host'];
foreach ($allheaders as $name => $value) {
    $headers = $headers . "$name: $value\r\n";
}
$type = $_GET['inject-type'];
//抓取css
if ($type == "css") {
    $cssurl = $_GET['cssurl'];
    $ret = file_get_contents($url, false, stream_context_create(array(
        'http' => array(
            'method' => "GET",
            'header' => $headers,
        )
    )));
    return $ret;

}


$ret = file_get_contents($url, false, stream_context_create(array(
    'http' => array(
        'method' => "GET",
        'header' => $headers,
    )
)));


if (!isset($type)) {
    $type = 'run';
}
$taskid = $_GET['inject-taskid'];
if (isset($taskid)) {
    $task = queryTask($taskid);
    $usename = $task['username'];
    $password = $task['password'];
}
else {
    $usename = $_GET['username'];
    $password = $_GET['password'];
}
if (strpos($ret, '检测到您已经登录的淘宝账号') != false) {
    echo "<script>var username='" . $usename . "'; var password = '" . $password . "';</script>";
    $type = 'login';
}
$placeholder = $ret;

//渲染模板
$templateURL = 'inject-' . $type . '.php';
include($templateURL);


function queryTask($task_id)
{

    include_once('../tool/conn_db.php');

    $sql = 'select * from list where id = ' . $task_id;
    $taskResult = mysql_query($sql);

    if (mysql_num_rows($taskResult) > 0) {
        $result_item = mysql_fetch_assoc($taskResult);
        return $result_item;
    }
}

?>