<?php
$db_host = '10.232.35.23';
$user = 'root';
$pwd = '1234';

define('CLIENT_LONG_PASSWORD', 1);
$conn = mysql_connect($db_host, $user, $pwd);

if (!$conn) {
    die('Could not connect: ' . mysql_error());
}

$database = mysql_select_db('uitest', $conn);
?>