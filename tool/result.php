<?php include_once('./common/header.php'); ?>

<link rel="stylesheet" href="css/form.css">
<style>
.other {
	position: absolute;
	top: 70px;
	right: 161px;
	font-size: 14px;
	line-height: 2.5;
	border: 1px solid #eee;
	padding: 10px;
	min-width: 200px;
}

</style>

<h1>查看结果</h1>




<?php
$task_name = '';
$task_target_uri = '';
$task_inject_uri = '';
$modify_tag = '';

$task_id = trim($_REQUEST['task_id']);

if ($task_id !== ''){

	include_once('conn_db.php');

	$sql = 'select * from list where id = ' . $task_id;
	$taskResult = mysql_query($sql);

	if (mysql_num_rows($taskResult) > 0){
		$result_item = mysql_fetch_assoc($taskResult);
		$task_name = $result_item['task_name'];
		$task_target_uri = $result_item['task_target_uri'];
		$description = $result_item['description'];
		$timer = $result_item['timer'];
		$task_inject_uri = $result_item['task_inject_uri'];
		$svn = $result_item['svn'];
		$description = $result_item['description'];
		$url = $result_item['url'];
		$creator = $result_item['creator'];
		$createtime = $result_item['createtime'];
		$result = $result_item['result'];
		$productline = $result_item['productline'];
		$project = $result_item['project'];

		$modify_tag = 'modify';
	}
}
?>

<div id="result">
	<p>任务名称:    <?php echo $result_item['task_name'] ?></p>
	<p>任务结果:    <br/><br/></p>
<?php 
	if($result) {
		echo $result;
	} else {
		echo '没有结果';
	}
?>
</div>
	
<?php include_once('./common/footer.php'); ?>


<script src="http://a.tbcdn.cn/s/kissy/1.2.0/kissy-min.js"></script>
<script>
KISSY.ready(function(S) {
	var $ = S.all;
	$('.J_ViewResult').on('click', function(ev) {
		ev.preventDefault();

		if(S.trim($('#result').html()) !== '') {
			$('#result').toggle();
		} else {
			$('#result').html('没有结果');
		}
	});
});
</script>