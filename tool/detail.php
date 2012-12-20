<?php include_once('./common/header.php'); ?>

<link rel="stylesheet" href="assets/form.css">
<script src="assets/form.js"></script>
<style>
#info {
	float: right;
	font-size: 14px;
	line-height: 2.5;
	border: 1px solid #eee;
	padding: 10px 10px 10px 30px;
	min-width: 200px;
}
#detail-info {
	margin-left: 40px;
}

</style>


<div class="container">

<h1>任务详情</h1>


<?php
$task_name = '';
$task_target_uri = '';
$task_inject_uri = '';
$modify_tag = '';

$task_id = trim($_REQUEST['id']);

if ($task_id !== ''){

	include_once('conn_db.php');

	$sql = 'select * from list where id = ' . $task_id;
	$taskResult = mysql_query($sql);

	if (mysql_num_rows($taskResult) > 0){
		$result_item = mysql_fetch_assoc($taskResult);
		$task_name = $result_item['task_name'];
		$task_target_uri = $result_item['task_target_uri'];
		$description = $result_item['description'];
		$week = $result_item['week'];
		$duration = $result_item['duration'];
		$start_time = $result_item['start_time'];
		$interval = $result_item['interval'];
		$task_inject_uri = $result_item['task_inject_uri'];
		$svn = $result_item['svn'];
		$description = $result_item['description'];
		$url = $result_item['url'];
		$creator = $result_item['creator'];
		$createtime = $result_item['createtime'];
		$result = $result_item['result'];
		$productline = $result_item['productline'];
		$project = $result_item['project'];

		$start = substr($start_time, 11, 5);

		$modify_tag = 'modify';
	}
}

?>


<h2><?php echo $task_name ?></h2>
<p><?php echo $description ?></p>
<div id="detail-info">
	<ul>
		<li>产品线: <span id="productline" data-id="<?php echo $productline ?>"></span>
		<li>创建人: <?php echo $creator  ?>
		<li>测试页面: <?php echo $task_target_uri  ?>
		<li>测试用例地址: <?php echo $svn  ?>
		<li>回归时间: <span id="weeks" data-id="<?php echo $week  ?>"></span>
		<li>启动时间: <?php echo $start_time  ?>
		<li>回归频率: <?php echo $duration / 60  ?>小时
		<li>创建时间: <?php echo $createtime  ?>
	</ul>
</div>


<?php include_once('./common/footer.php'); ?>


<script src="http://a.tbcdn.cn/s/kissy/1.2.0/kissy-min.js"></script>

</div>
