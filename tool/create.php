<?php include_once('./common/header.php'); ?>

<link rel="stylesheet" href="css/form.css">


<h1>创建一个新任务吧</h1>

<form method="POST" action="handle.php">
	<table class="add-case-table">
		<colgroup>
			<col class="property" />
			<col class="value" />
		</colgroup>

		<?php
			$task_name = '';
			$task_target_uri = '';
			$task_inject_uri = '';
			$modify_tag = '';


			echo('
				<tr>
					<th>产品:</th>
					<td>
						<select name="productline" required>
							<option value="">--请选择产品线--</option>
							<option value="84">基础业务</option>
							<option value="86">商品平台</option>
							<option value="87">业务安全</option>
							<option value="94">开放平台</option>
							<option value="105">商户平台</option>
							<option value="106">SNS</option>
							<option value="118">运营服务</option>
							<option value="206">外部产品线</option>
							<option value="257">UED</option>
							<option value="336">通用产品</option>

						</select>
						<select name="project" required>
							<option value="">--请选择产品--</option>
							<option value="1">我的淘宝</option>
							<option value="2">淘金币</option>
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
					<th>描述:</th>
					<td>
						<textarea type="text" name="description" class="input-box"></textarea>
					</td>
				</tr>
				<tr>
					<th>测试页面:</th>
					<td>
						<input type="url" name="task_target_uri" class="input-box"/>
					</td>
				</tr>
				<tr>
					<th>SVN:</th>
					<td>
						<input type="text" name="svn" class="input-box"/>
					</td>
				</tr>
				<tr>
					<th>定时:</th>
					<td>
						<input type="hidden" name="timer">
						<input type="checkbox" name="timers" value="1" />星期一 
						<input type="checkbox" name="timers" value="2" />星期二 
						<input type="checkbox" name="timers" value="3" />星期三 
						<input type="checkbox" name="timers" value="4" />星期四 
						<input type="checkbox" name="timers" value="5" />星期五 
						<input type="checkbox" name="timers" value="6" />星期六 
						<input type="checkbox" name="timers" value="7" />星期日
							<br/>	
						每天回归的时间点: <input type="text" name="first" value="18:30" size="5" style="width:40px">
						回归频率: <input type="text" name="interval" value="" size="5" style="width:40px">
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
<script>
KISSY.use('sizzle', function(S) {
	var $ = KISSY.all;

	$('form').on('submit', function() {
		var values = S.map($('[name=timers]:checked'), function(timers) {
			return $(timers).val();
		});
		var time = $('[name=timer_time]').val();

		$('[name=timer]').val(values.join(','));
	});
});
</script>