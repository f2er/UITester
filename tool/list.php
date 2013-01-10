<?php $nav='list'; include_once('./common/header.php'); ?>
<?php

//配置
$num = 10;			//列表区, 每页显示的数量

include_once('conn_db.php');

$sql = ' where 1=1 ';
if ($_GET['productline']) {
	$sql = $sql.' and productline = '.$_GET['productline'];
}
if ($_GET['project']) {
	$sql = $sql.' and project = '.$_GET['project'];
}
if (isset($_GET['me'])) {
	$sql = $sql.' and creator = "'.$userName.'"';
}
$page = isset($_GET['page']) ? intval($_GET['page']) : 1;
$start = $page < 1 ? 0 : ($page*$num-$num);
$sort = ' order by createtime desc';
$limit = ' limit '. $start .', '. ($num+1);		//多取一个判断是不是有下一页


//查询总数
$coutSql = 'select count(*) c from list '.$sql;
$query_count_result = mysql_query($coutSql);
$result_count = (mysql_fetch_assoc($query_count_result));		//见分页处
$result_count = intval($result_count['c']);

//查询数据
$querySql = 'select * from list '.$sql.$sort.$limit;
$query_list_result = mysql_query($querySql);


//查询产品线
$productlineSql = 'select productline from list group by productline order by productline';
$productline_result = mysql_query($productlineSql);


//为了在URL加上参数, 以选中我的用例子导航
$me = isset($_GET['me']) ? 'me&' : '';



?>

<link rel="stylesheet" href="assets/list.css">

<div class="container" id="list">
<div class="sub-nav">
     产品线: <select id="productline" name="productline" required>
		<option value="">全部</option>
<?php 
	$productline_num = mysql_num_rows($productline_result);
	for ($idx = 0; $idx < $productline_num; $idx++) {
		$result_item = mysql_fetch_assoc($productline_result);
		echo '<option value="'.$result_item['productline'].'"></option>';
	};
?>
<!--
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
<style>
    .brower_error,.brower_success{
       display: inline-block;
    }
</style>
<div class="case-list">
    <ul>
        <?php

		$result_num = mysql_num_rows($query_list_result);

        for ($idx = 0; $idx < min($result_num, $num); $idx++) {
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

            if($result_item['task_result']==""){
                $result_item['task_result'] = '';
            }




            echo('
            <li id="'.$result_item['id'].'"class="' . $className . '">
            <div class="name"><p><a  href="result.php?task_id=' . $result_item['id'] .'">' . $result_item['task_name'] . '</a></p>

                <div class="top-action">
					<span class="">创建者: '. $result_item['creator'] . '</span>  &nbsp;&nbsp;&nbsp;
					<span class="">上次测试时间: '. ($result_item['prev_time'] == '0000-00-00 00:00:00' ? '' : $result_item['prev_time']) . '</span>
                </div>
            </div>

            <div class="result">
            <script>
            try{
              var result ='.$result_item['browser_result'].';
              if(result){
                for(var  p in result){

                   if(!result[p]){
                     var cl = "label label-important";
                     var msg = "未通过"
                   }else{
                    var cl = "label label-success";
                     var msg = "通过"
                   }
                 document.write("<span class=\""+cl+"\"><span class=\"b_name\">"+p+"</span> <span class=\"b_rs\">"+msg+"</span></span>")
                }
              }
              }catch(e){

              }

            </script>



                <div class="bottom-action">
                <a class="btn btn-link" href="result.php?'.$me.'task_id=' . $result_item['id'] .'">详细结果</a>
     <!--                <a class="record minibtn" href="modify.php?id=' . $result_item['id'] . '">修改</a>
                   <a target="_blank" class="url minibtn" href="apply.php?id=' . $result_item['id'] . '">测试</a>
                    <a target="_self" class="del minibtn" href="handle.php?modify_tag=remove&task_id=' . $result_item['id'] . '">删除</a>
                   <a target="_blank" class="record minibtn" href="record/record.html?id=' . $result_item['id'] . '">录制</a>
-->
                </div>
            </div>

        </li>

                            ');
        }
        ?>


    </ul>

	<p class="pagination">
<?php

	$query = $_GET['productline'] ? '?productline='.$_GET['productline'].'&' : '?';

	if($start !== 0) {
		echo '<a href="' . $query . 'page='. ($page - 1) .'">上一页</a>';
	}
	if($result_num === ($num + 1)) {
		echo '<a href="' . $query . 'page='. ($page + 1) .'">下一页</a>';
	}

	echo ' <span>第' . ($page) . '页</span> <span>共'.(ceil($result_count / $num)).'页</span>';
?>

	</p>


</div>




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
<?php include_once('./common/footer.php'); ?>