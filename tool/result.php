<?php include_once('./common/header.php'); ?>

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

<div class="container" style="width: 920px">




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
		$task_inject_uri = $result_item['task_inject_uri'];
		$creator = $result_item['creator'];
		$createtime = $result_item['createtime'];
		$result = $result_item['task_result'];

		//数据库中是UTF8, 转换为GBK, 用于页面显示
		$result = mb_convert_encoding($result, 'GBK', 'UTF-8');



		$modify_tag = 'modify';
	}
}
?>

<div id="result">
	<h3><?php echo $result_item['task_name'] ?> 的测试结果</h3>
</div>

<br/>
<pre id="output" class="result-report"></div>
	
<?php include_once('./common/footer.php'); ?>


<script src="http://a.tbcdn.cn/s/kissy/1.2.0/kissy-min.js"></script>
<script>

KISSY.ready(function(S) {

	var result = <?php echo $result ?>;
	//var json = S.JSON.parse(result.replace(/^.*{/g,'{').replace(/}.*$/g,'}'));

	var jsonReporter = new jasmine.JsonReporter();
	S.each(result, function(value, key) {
		jsonReporter.renderHTML(value, S.DOM.get("#output"));
	});
});

</script>


</div>