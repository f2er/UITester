<?php $nav='list'; include_once('./common/header.php'); ?>
<?php

//����
$num = 10;			//�б���, ÿҳ��ʾ������

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
$limit = ' limit '. $start .', '. ($num+1);		//��ȡһ���ж��ǲ�������һҳ


//��ѯ����
$coutSql = 'select count(*) c from list '.$sql;
$query_count_result = mysql_query($coutSql);
$result_count = (mysql_fetch_assoc($query_count_result));		//����ҳ��
$result_count = intval($result_count['c']);

//��ѯ����
$querySql = 'select * from list '.$sql.$sort.$limit;
$query_list_result = mysql_query($querySql);


//��ѯ��Ʒ��
$productlineSql = 'select productline from list group by productline order by productline';
$productline_result = mysql_query($productlineSql);


//Ϊ����URL���ϲ���, ��ѡ���ҵ������ӵ���
$me = isset($_GET['me']) ? 'me&' : '';



?>

<link rel="stylesheet" href="assets/list.css">

<div class="container" id="list">
<div class="sub-nav">
     ��Ʒ��: <select id="productline" name="productline" required>
		<option value="">ȫ��</option>
<?php 
	$productline_num = mysql_num_rows($productline_result);
	for ($idx = 0; $idx < $productline_num; $idx++) {
		$result_item = mysql_fetch_assoc($productline_result);
		echo '<option value="'.$result_item['productline'].'"></option>';
	};
?>
<!--
		<option value="86">��Ʒƽ̨</option>
		<option value="87">ҵ��ȫ</option>
		<option value="94">����ƽ̨</option>
		<option value="105">�̻�ƽ̨</option>
		<option value="106">SNS</option>
		<option value="118">��Ӫ����</option>
		<option value="206">�ⲿ��Ʒ��</option>
		<option value="257">UED</option>
		<option value="336">ͨ�ò�Ʒ</option>
	</select>
	<select id="project" name="project" required>
		<option value="">--��ѡ���Ʒ--</option>
		<option value="1">�ҵ��Ա�</option>
		<option value="2">�Խ��</option>
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
					<span class="">������: '. $result_item['creator'] . '</span>  &nbsp;&nbsp;&nbsp;
					<span class="">�ϴβ���ʱ��: '. ($result_item['prev_time'] == '0000-00-00 00:00:00' ? '' : $result_item['prev_time']) . '</span>
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
                     var msg = "δͨ��"
                   }else{
                    var cl = "label label-success";
                     var msg = "ͨ��"
                   }
                 document.write("<span class=\""+cl+"\"><span class=\"b_name\">"+p+"</span> <span class=\"b_rs\">"+msg+"</span></span>")
                }
              }
              }catch(e){

              }

            </script>



                <div class="bottom-action">
                <a class="btn btn-link" href="result.php?'.$me.'task_id=' . $result_item['id'] .'">��ϸ���</a>
     <!--                <a class="record minibtn" href="modify.php?id=' . $result_item['id'] . '">�޸�</a>
                   <a target="_blank" class="url minibtn" href="apply.php?id=' . $result_item['id'] . '">����</a>
                    <a target="_self" class="del minibtn" href="handle.php?modify_tag=remove&task_id=' . $result_item['id'] . '">ɾ��</a>
                   <a target="_blank" class="record minibtn" href="record/record.html?id=' . $result_item['id'] . '">¼��</a>
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
		echo '<a href="' . $query . 'page='. ($page - 1) .'">��һҳ</a>';
	}
	if($result_num === ($num + 1)) {
		echo '<a href="' . $query . 'page='. ($page + 1) .'">��һҳ</a>';
	}

	echo ' <span>��' . ($page) . 'ҳ</span> <span>��'.(ceil($result_count / $num)).'ҳ</span>';
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