<?php
// include databse connector
include_once('conn_db.php');


$task_id = $_REQUEST['task_id'];

$failed_specs = trim($_REQUEST['failed_specs']);
$total_specs = trim($_REQUEST['total_specs']);

// modify current record

$sql = "UPDATE `list` SET `failed_specs`=".$failed_specs.",`total_specs`="+$total_specs+" WHERE id=".$task_id;


$result = mysql_query($sql);
$resultString  = $result === true ? "200" : "404";
echo $sql;
echo $result;
echo ('{"code" : ' . $resultString . '}');





?>
