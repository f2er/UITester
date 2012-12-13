<?php include_once('./common/header.php'); ?>

<div class="sub-nav">
     <select id="productline" name="productline" required>
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
	<select id="project" name="project" required>
		<option value="">--请选择产品--</option>
		<option value="1">我的淘宝</option>
		<option value="2">淘金币</option>
	</select>
	<a class="url" style="float:right" href="create.php">新增页面</a>
</div>

<div class="case-list">
    <ul>
        <?php
        include_once('conn_db.php');

        $sql = 'select * from list where 1=1 ';
		if ($_GET['productline']) {
			$sql = $sql.' and productline = '.$_GET['productline'];
		}
		if ($_GET['project']) {
			$sql = $sql.' and project = '.$_GET['project'];
		}
        $query_list_result = mysql_query($sql);

        $result_num = mysql_num_rows($query_list_result);

        for ($idx = 0; $idx < $result_num; $idx++) {
            $result_item = mysql_fetch_assoc($query_list_result);
            $className = "";
            if ($result_item['total_specs'] == 0) {
                $className = "";
            }
            else if ($result_item['total_specs'] != 0 && $result_item['failed_specs'] == 0) {
                $className = "passed";
            }
            else {
                $className = "failed";
            }


            echo('
                                <li class="' . $className . '">
            <div class="name"><p><span>' . $result_item['task_name'] . '</span></p>

                <div class="top-action">
<!--
                    <a target="_blank" class="case" href="' . $result_item['task_inject_uri'] . '">测试用例</a>
                    <a target="_blank" class="url" href="' . $result_item['task_target_uri'] . '">测试页面</a>
-->
					<span class="">创建者: '. $result_item['creator'] . '</span>  &nbsp;&nbsp;&nbsp;
					<span class="">上次测试时间: 2012.09.27 15:00</span>
                </div>
            </div>

            <div class="result">
				总数：<span class="total-specs"><em>' . $result_item['total_specs'] . '</em></span> <em>|</em> 失败：<span
                class="failed-specs"><em>' . $result_item['failed_specs'] . '</em></span>
				<a href="result.php?task_id=' . $result_item['id'] .'">查看结果</a>

                <div class="bottom-action">
                    <a class="record minibtn" href="modify.php?task_id=' . $result_item['id'] . '">修改</a>
                    <a target="_blank" class="url minibtn" href="apply.php?task_id=' . $result_item['id'] . '">测试</a>
                    <a target="_self" class="del minibtn" href="handle.php?modify_tag=remove&task_id=' . $result_item['id'] . '">删除</a>
<!--                    <a target="_blank" class="record minibtn" href="record/record.html?id=' . $result_item['id'] . '">录制</a>
-->
                </div>
            </div>

        </li>

                            ');
        }
        ?>


    </ul>


</div>


<?php include_once('./common/footer.php'); ?>

<script src="http://a.tbcdn.cn/s/kissy/1.2.0/kissy-min.js"></script>
<script>
KISSY.ready(function(S) {
	var $ = S.all;
	$('.sub-nav').all('select').on('change', function(ev) {
		ev.preventDefault();


		location.href = '?' + S.param({
			productline : S.all('#productline').val(),
			project : S.all('#project').val()
		});
	});


	var param = S.unparam(location.search.slice(1));
	S.all('#productline').val(param.productline || '');
	S.all('#project').val(param.project || '');
});
</script>
