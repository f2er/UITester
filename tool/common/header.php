<?php
//session_start();
//require '../auth/AuthBoot.php';
//$user = $ArkAuth->getAppUser();
//$userName = mb_convert_encoding($user['DisplayName'], 'GBK', 'UTF-8');

?>

<!doctype html>
<meta charset="gbk">
<title>���������б�</title>
<link rel="stylesheet" href="css/bootstrap.css" />
<link rel="stylesheet" href="css/common.css" />




<div class="navbar navbar-inverse">
  <div class="navbar-inner">
	<div class="container">
	  <div class="login-info">hello: <a href="#"><?php echo print_r($userName); ?></a>  <a charset="utf8" class="logout" href="https://ark.taobao.org:4430/arkserver/Login.aspx?cmd=logout&app=http://uitest.taobao.net/&redirectURL=http://uitest.taobao.net/tool/list.php">�˳�</a></div>
	  <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
		<span class="icon-bar"></span>
		<span class="icon-bar"></span>
		<span class="icon-bar"></span>
	  </a>
	  <a class="brand" href="list.php">UITester</a>
	  <div class="nav-collapse collapse">
		<ul class="nav">
		  <li class="active"><a href="list.php">�鿴����</a></li>
		  <li><a href="record/record.html?">¼������</a></li>
		  <li><a href="https://github.com/taobao-sns-fed/uitest/">���Կ��</a></li>
		</ul>
	  </div><!--/.nav-collapse -->
	</div>
  </div>
</div>

<div class="container">
