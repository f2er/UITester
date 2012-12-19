<?php include_once('./common/header.php'); ?>

<link rel="stylesheet" href="assets/form.css">


<div class="container">

<h1>创建新任务</h1>

<form method="POST" action="handle.php">
	<table class="add-case-table">
		<colgroup>
			<col class="property" />
			<col class="value" />
		</colgroup>

		<?php
			$task_name = '';
			$task_inject_uri = '';
			$modify_tag = '';


			echo('
				<tr>
					<th>产品:</th>
					<td>
						<select id="productline" name="productline" required value="">
							<option value="" selected="selected">全部</option>
						</select>
					</td>
				</tr>
				<tr>
					<th>名称:</th>
					<td>
						<input type="text" name="task_name" class="input-box" required/>
					</td>
				</tr>
				<tr>
					<th>脚本地址:</th>
					<td>
						<input type="text" name="task_inject_uri" class="input-box"/>
					</td>
				</tr>
				<tr>
					<th>定时:</th>
					<td>
						<input type="hidden" name="week">
						<input type="checkbox" name="timers" value="1" />星期一 
						<input type="checkbox" name="timers" value="2" />星期二 
						<input type="checkbox" name="timers" value="3" />星期三 
						<input type="checkbox" name="timers" value="4" />星期四 
						<input type="checkbox" name="timers" value="5" />星期五 
						<input type="checkbox" name="timers" value="6" />星期六 
						<input type="checkbox" name="timers" value="7" />星期日
							<br/><br/>	
						每天回归的时间点: <input class="duration" type="text" name="start" value="" size="5" style="width:40px" placeholder="HH:mm">

						回归频率: <select class="duration" name="duration">
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

<?php include_once('./common/footer.php'); ?>

<script src="http://a.tbcdn.cn/s/kissy/1.2.0/kissy-min.js"></script>
<script src="assets/form.js"></script>
<script>

KISSY.use('sizzle', function(S) {
	var $ = KISSY.all;

	$('form').on('submit', function() {
		var values = S.map($('[name=timers]:checked'), function(timers) {
			return $(timers).val();
		});

		$('[name=week]').val(values.join(','));
	});
});
</script>


</div>