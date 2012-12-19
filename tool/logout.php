<?php 

session_start();
require '../auth/AuthBoot.php';
$ArkAuth->processLogout();

?>