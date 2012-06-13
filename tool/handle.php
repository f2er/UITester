
<?php
    // include databse connector
    include_once('conn_db.php');

    $modify_tag = $_REQUEST['modify_tag'];
    $task_id = $_REQUEST['task_id'];
    $task_name = trim($_REQUEST['task_name']);
    $task_target_uri = trim($_REQUEST['task_target_uri']);
    $task_inject_uri = 'case/'.$task_id.'.js';
    $task_inject_script = $_REQUEST['task_script'];
    file_put_contents('../'.$task_inject_uri, $task_inject_script);

    //最终保存的位置
    $task_inject_uri = 'http://uitest.taobao.net/UITester/'.$task_inject_uri;

    // modify current record
    if ($modify_tag === 'modify'){
        $sql = '
            UPDATE list SET
            task_name= "' . $task_name . '",
            task_target_uri= "' . $task_target_uri . '",
            task_inject_uri= "' . $task_inject_uri. '"
            WHERE id = ' . $task_id;

    }

    // remove record
    else if ($modify_tag === 'remove'){
        $sql = '
            DELETE FROM `list`
            WHERE id = ' . $task_id;

    }

    // add for new record
    else {
        $sql = '
            INSERT INTO list (
                task_name,
                task_target_uri,
                task_inject_uri
            ) VALUES (
                "' . $task_name . '" ,
                "' . $task_target_uri . '",
                "' . $task_inject_uri . '"
            );
        ';

    }

    $result = mysql_query($sql);
    $output = '<p>操作' . ($result === true ? '成功' : '失败') . '，<a href="list.php">返回</a> 列表页</p>';

    print_r('已执行 sql: ' . $sql);
    print_r($output);

    if ($result === false){
        print_r('查询出错信息 [' . mysql_errno() . ']: ' . mysql_error());
    }

?>