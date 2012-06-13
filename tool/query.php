<?php
        $task_id = trim($_REQUEST['task_id']);

        if ($task_id !== ''){
                $task = queryTask($task_id);

                if ($task) {
                        echo ('
{
        "id" : "' . $task["id"] . '",
        "task_name" : "'. $task["task_name"] . '",
        "task_target_uri" : "'. $task["task_target_uri"] . '",
        "task_inject_uri" : "'. $task["task_inject_uri"] . '"
}
');

                        exit;
                }

                echo '{}';
        }




function queryTask($task_id) {

        include_once('conn_db.php');

        $sql = 'select * from list where id = ' . $task_id;
        $taskResult = mysql_query($sql);

        if (mysql_num_rows($taskResult) > 0){
                $result_item = mysql_fetch_assoc($taskResult);
                return $result_item;
        }
}

?>