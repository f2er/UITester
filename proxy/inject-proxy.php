<?php
        //phpinfo();
        //echo 'Cookie: '.$_SERVER['HTTP_COOKIE'];

        //$script = 'http://'.$_SERVER["HTTP_X_FORWARDED_SERVER"].'/UITester/tool/loader.js';
        $url = 'http://'.$_SERVER["HTTP_X_FORWARDED_HOST"].$_SERVER["PATH_INFO"].'?'.$_SERVER["QUERY_STRING"];

        $allheaders = getallheaders();
        $allheaders['Accept-Encoding'] = '';
        $allheaders['Host'] = $allheaders['X-Forwarded-Host'];
        foreach ($allheaders as $name => $value) {
                $headers = $headers."$name: $value\r\n";
        }
        //echo $headers;
        //echo $url."\r\n".curl($url);
        $ret = file_get_contents($url, false, stream_context_create(array(
                'http'=>array(
                        'method'=>"GET",
                        'header'=>$headers,
                )
        )));

        //准备数据
        $type = $_GET['inject-type'];
        if (!isset($type)) {
                $type = 'run';
        }
        if(strpos($ret, '/apps/login/static/logo.png') != false) {
                $type = 'login';
        }
        $taskid = $_GET['inject-taskid'];
		if (isset($taskid)) {
	        $task = queryTask($taskid);
		}
        $placeholder = $ret;

        //渲染模板
        $templateURL = 'inject-'.$type.'.php';
        include($templateURL);


function queryTask($task_id) {

        include_once('../tool/conn_db.php');

        $sql = 'select * from list where id = ' . $task_id;
        $taskResult = mysql_query($sql);

        if (mysql_num_rows($taskResult) > 0){
                $result_item = mysql_fetch_assoc($taskResult);
                return $result_item;
        }
}

?>