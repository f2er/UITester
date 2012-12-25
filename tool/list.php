<?php include_once('./common/header.php'); ?>

<div class="container" style="width: 920px">
<div class="sub-nav">
     产品线: <select id="productline" name="productline" required>
		<option value="">全部</option>
<!--
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
-->
	</select>

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
            <li id="'.$result_item['id'].'"class="' . $className . '">
            <div class="name"><p><a href="detail.php?id='.$result_item['id'].'">' . $result_item['task_name'] . '</a></p>

                <div class="top-action">
<!--
                    <a target="_blank" class="case" href="' . $result_item['task_inject_uri'] . '">测试用例</a>
                    <a target="_blank" class="url" href="' . $result_item['task_target_uri'] . '">测试页面</a>
-->
					<span class="">创建者: '. $result_item['creator'] . '</span>  &nbsp;&nbsp;&nbsp;
					<span class="">上次测试时间: '. ($result_item['prev_time'] == '0000-00-00 00:00:00' ? '' : $result_item['prev_time']) . '</span>
                </div>
            </div>

            <div class="result">
            <script>
            try{
              var result = '.$result_item['task_result'].';
              if(result){
                for(var  p in result){
                   var fs = result[p].result.failedSpecs;
                   var ts = result[p].result.totalSpecs;
                   if(!fs||!ts){
                     var cl = "error";
                     var msg = "未通过"
                   }else{
                    var cl = "success";
                     var msg = "通过"
                   }
                 document.write("<div class=\"brower_"+cl+" \"><span class=\"name\">"+p+"<span><span class=\"result\">"+msg+"<span><div>")
                }
              }
              }catch(e){}

            </script>
				总数：<span class="total-specs"><em>' . $result_item['total_specs'] . '</em></span> <em>|</em> 失败：<span
                class="failed-specs"><em>' . $result_item['failed_specs'] . '</em></span>
				<a href="result.php?task_id=' . $result_item['id'] .'">查看结果</a>

                <div class="bottom-action">
                    <a class="record minibtn" href="modify.php?id=' . $result_item['id'] . '">修改</a>
                   <!-- <a target="_blank" class="url minibtn" href="apply.php?id=' . $result_item['id'] . '">测试</a>-->
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
<script src="assets/form.js"></script>
<script>

KISSY.ready(function(S) {
	var $ = S.all;
	$('.sub-nav').all('select').on('change', function(ev) {
		ev.preventDefault();

		location.href = '?' + S.param({
			//project : S.all('#project').val(),
			productline : S.all('#productline').val()
		});
	});

	var param = S.unparam(location.search.slice(1));
	S.all('#productline').val(param.productline || '');
	//S.all('#project').val(param.project || '');
});





</script>


</div>
