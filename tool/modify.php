<?php include_once('./common/header.php'); ?>

<link rel="stylesheet" href="assets/form.css">
<style>
#info {
	float: right;
	font-size: 14px;
	line-height: 2.5;
	border: 1px solid #eee;
	padding: 10px 10px 10px 30px;
	min-width: 200px;
}
</style>

<header class="jumbotron subhead" id="overview">
  <div class="container">
    <h1>修改测试用例</h1>
  </div>
</header>

<div id="content" class="container">



<?php
$task_name = '';
$task_target_uri = '';
$task_inject_uri = '';
$modify_tag = '';

$task_id = trim($_GET['id']);

if ($task_id !== ''){

	include_once('conn_db.php');

	$sql = 'select * from list where id = ' . $task_id;
	$taskResult = mysql_query($sql);

	if (mysql_num_rows($taskResult) > 0){
		$result_item = mysql_fetch_assoc($taskResult);
		$task_name = $result_item['task_name'];
		$week = $result_item['week'];
		$duration = $result_item['duration'];
		$start_time = $result_item['start_time'];
		$task_inject_uri = $result_item['task_inject_uri'];
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


<div id="info">
	<ul>
		<li>任务id: <?php echo $task_id  ?>
		<li>产品线: <span id="productline" data-id="<?php echo $productline ?>"></span>
		<li>创建人: <?php echo $creator  ?>
		<li>创建时间: <?php echo $createtime  ?>
	</ul>
</div>


<form method="POST" action="handle.php">
	<table class="add-case-table">
		<colgroup>
			<col class="property" />
			<col class="value" />
		</colgroup>
<?php

			echo('
				<tr>
					<th>名称</th>
					<td>
						<input type="text" name="task_name" class="input-box" value="' . $task_name . '" />
					</td>
				</tr>
				<tr>
					<th>测试用例地址</th>
					<td>
						<input type="text" name="task_inject_uri" class="input-box" value="' . $task_inject_uri . '" />
					</td>
				</tr>
				<tr>
					<th>定时</th>
					<td>
						<input type="hidden" name="week" value="' . $week . '" />
						<input type="checkbox" name="timers" value="1" />星期一 
						<input type="checkbox" name="timers" value="2" />星期二 
						<input type="checkbox" name="timers" value="3" />星期三 
						<input type="checkbox" name="timers" value="4" />星期四 
						<input type="checkbox" name="timers" value="5" />星期五 
						<input type="checkbox" name="timers" value="6" />星期六 
						<input type="checkbox" name="timers" value="0" />星期日
							<br/><br/>	
						每天回归的时间点: <input type="text" name="start" value="' . $start . '" size="5" placeholder="mm:ss" style="width:40px"> &nbsp;&nbsp;
						间隔时间: <select class="duration" name="duration" data-value="'.$duration.'">
							<option value="30">0.5</option>
							<option value="60">1</option>
							<option value="120">2</option>
							<option value="240">4</option>
							<option value="480">8</option>
							<option value="720">12</option>
						</select>小时
					</td>
				</tr>
				<tr>
					<td colspan="2">
						<input type="hidden" name="modify_tag" value="' . $modify_tag . '" />
						<input type="hidden" name="task_id" value="' . $task_id . '" />
						<input type="submit" value="保存" />
					</td>
				</tr>
			');
		?>
	</table>
</form>

<br/>
<hr>
<br/>

<?php include_once('./common/footer.php'); ?>


<script src="http://a.tbcdn.cn/s/kissy/1.2.0/kissy-min.js"></script>
<script src="assets/form.js"></script>
<script>

KISSY.use('sizzle', function(S) {
	var $ = S.all;

	var productline = productline;

	var values = $('[name=week]').val().split(',');
	$('[name=timers]').each(function(timers) {
		if(S.indexOf(timers.val(), values) > -1) {
			timers.attr('checked', true);
		} else {
			timers.attr('checked', false);
		}
	});
	$('[name=duration]').val($('[name=duration]').attr('data-value'));

	$('form').on('submit', function() {
		var values = S.map($('[name=timers]:checked'), function(timers) {
			return $(timers).val();
		});

		$('[name=week]').val(values.join(','));
	});
});
</script>


</div>
