<?php include_once('./common/header.php'); ?>
<script src="assets/form.js"></script>
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

    if ($task_id !== '') {

        include_once('conn_db.php');

        $sql = 'select * from list where id = ' . $task_id;
        $taskResult = mysql_query($sql);

        if (mysql_num_rows($taskResult) > 0) {
            $result_item = mysql_fetch_assoc($taskResult);
            $task_name = $result_item['task_name'];
            $task_inject_uri = $result_item['task_inject_uri'];
            $creator = $result_item['creator'];
            $createtime = $result_item['createtime'];
            $result = $result_item['task_result'];

            //���ݿ�����UTF8, ת��ΪGBK, ����ҳ����ʾ
            $result = mb_convert_encoding($result, 'GBK', 'UTF-8');


            $modify_tag = 'modify';
        }
    }
    ?>
    <div class="page-header">
        <h2><?php echo $result_item['task_name'] ?></h2>
    </div>

    <div id="detail-info">
        <ul>
            <li>��Ʒ��: <span id="productline" data-id="<?php echo $productline ?>"></span>
            <li>������: <span><?php echo $creator  ?></span>
            <li>����������ַ: <?php echo $task_inject_uri  ?>
            <li>�ع�ʱ��: <span id="weeks" data-id="<?php echo $week  ?>"></span>
            <li>�ع�Ƶ��: <?php echo $duration / 60  ?>Сʱ
            <li>����ʱ��: <?php echo $createtime  ?>
        </ul>
    </div>

    <ul class="nav nav-tabs" id="myTab">
        <li class="active"><a href="#chrome">chrome</a></li>
        <li><a href="#ie9">IE9</a></li>
        <li><a href="#ie8">IE8</a></li>
        <li><a href="#ie7">IE7</a></li>
        <li><a href="#ie6">IE6</a></li>
    </ul>

    <div class="tab-content">
        <div class="tab-pane active" id="home"></div>
        <div class="tab-pane" id="ie9"></div>
        <div class="tab-pane" id="ie8"></div>
        <div class="tab-pane" id="ie7"></div>
        <div class="tab-pane" id="ie6"></div>
    </div>


    <script>
        jQuery(function () {
            jQuery('#myTab a:last').tab('show');
        })
    </script>


    <div id="output" class="result-report"></div>

    <?php include_once('./common/footer.php'); ?>


    <script src="http://a.tbcdn.cn/s/kissy/1.2.0/kissy-min.js"></script>
    <script>

        jQuery(document).ready(function () {

            var result = <?php echo $result ?>;
            //var json = S.JSON.parse(result.replace(/^.*{/g,'{').replace(/}.*$/g,'}'));

            var jsonReporter = new jasmine.JsonReporter();
            jQuery.each(result, function (value, key) {

                jsonReporter.renderHTML(value, jQuery("#"+key));
            });
        });

    </script>


</div>