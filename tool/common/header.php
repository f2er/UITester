<?php
session_start();
require '../auth/AuthBoot.php';
$user = $ArkAuth->getAppUser();
$userName = mb_convert_encoding($user['DisplayName'], 'GBK', 'UTF-8');
?>

<!doctype html>
<meta charset="gbk">
<title>测试用例列表</title>
<link rel="stylesheet" href="assets/bootstrap/css/bootstrap.css" />
<link rel="stylesheet" href="assets/bootstrap/css/bootstrap-responsive.min.css">
<link rel="stylesheet" href="assets/common.css" />
<script charset="utf-8" src="http://assets.daily.taobao.net/p/uitest/build/uitest.js"></script>
<link href="http://assets.daily.taobao.net/p/uitest/build/uitest.css" rel="stylesheet">
<!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
<!--[if lt IE 9]>
<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
<![endif]-->
<script src="assets/bootstrap/js/bootstrap.min.js"></script>

<div class="navbar navbar-inverse">
  <div class="navbar-inner">
	<div class="container">
	  <div class="login-info">hello: <a href="#"><?php echo $userName; ?></a>  <a charset="utf8" class="logout" href="logout.php">退出</a></div>
	  <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
		<span class="icon-bar"></span>
		<span class="icon-bar"></span>
		<span class="icon-bar"></span>
	  </a>
	  <a class="brand" href="index.php">UITester</a>
	  <div class="nav-collapse collapse">
		<ul class="nav">
		  <li class="active"><a href="list.php">查看用例</a></li>
		  <li><a href="record/record.html?">录制用例</a></li>
		  <li><a href="https://github.com/taobao-sns-fed/uitest/">测试框架</a></li>
		</ul>
	  </div><!--/.nav-collapse -->
	</div>
  </div>
</div>


