<?php
$cssurl = trim($_REQUEST['cssurl']);
$ret = file_get_contents($cssurl);

echo($ret);

?>