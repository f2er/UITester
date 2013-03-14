<?php
session_start();
require '../auth/AuthBoot.php';
$user = $ArkAuth->getAppUser();
$userName = $user['DisplayName'];
//$userName = '道璘';
?>

<!doctype html>
<html>
<head>
<meta charset="utf8">
<title>测试用例列表</title>
<link rel="stylesheet" href="assets/bootstrap/css/bootstrap.css" />
<link rel="stylesheet" href="assets/bootstrap/css/bootstrap-responsive.min.css">
<link rel="stylesheet" href="assets/header.css">
<link rel="stylesheet" href="assets/common.css" />


<link href="http://assets.daily.taobao.net/p/uitest/build/uitest.css" rel="stylesheet">
    <script  src="assets/result-html.js"></script>
<script charset="utf-8" src="http://assets.daily.taobao.net/p/uitest/build/uitest.js"></script>
<!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
<!--[if lt IE 9]>
<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
<![endif]-->
<script src="assets/bootstrap/js/bootstrap.min.js"></script>
</head>
<div class="navbar navbar-inverse">
  <div class="navbar-inner">
	<div class="container">
	  <div class="login-info">hello: <a href="/tool/list.php?me"><?php echo $userName; ?></a>  <a charset="utf8" class="logout" href="logout.php">退出</a></div>
	  <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
		<span class="icon-bar"></span>
		<span class="icon-bar"></span>
		<span class="icon-bar"></span>
	  </a>
	  <a class="brand" href="index.php" <?php if($nav==='index')echo 'style="color:#FFF"' ?>>UITest</a>
	  <div class="nav-collapse collapse">
		<ul class="nav">
		  		  <li <?php if($nav==='me' || isset($_GET['me']))echo 'class="active"' ?>><a href="list.php?me">我的用例</a></li>
		  <li <?php if($nav==='list' && !isset($_GET['me']))echo 'class="active"' ?>><a href="list.php">全部用例</a></li>
          <li <?php if($nav==='create')echo 'class="active"' ?>><a href="/tool/create.php">创建用例</a></li>
            <li <?php if($nav==='local-test')echo 'class="active"' ?>><a target="_blank" href="/tool/local-test.php">本地调试</a></li>

		  <li <?php if($nav==='record')echo 'class="active"' ?>><a target="_blank" href="record/record.html?">录制工具</a></li>
		  <li <?php if($nav==='help')echo 'class="active"' ?>><a target="_blank" href="http://taobao-sns-fed.github.com/UITester/">帮助</a></li>
            <li><a target="_blank" href="https://github.com/taobao-sns-fed/UITester/issues">建议</a></li>
		</ul>
	  </div><!--/.nav-collapse -->
	</div>
  </div>
</div>


