<?php include_once('./common/header.php'); ?>

<div class="sub-nav">
    <a target="_blank" href="http://uitest.taobao.net/tool/record/record.html" class="new-record minibtn"">录制新用例</a>
</div>

<div class="case-list">
    <ul>
        <?php
        include_once('conn_db.php');

        $sql = 'select * from list';
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
                    <a target="_blank" class="case" href="' . $result_item['task_inject_uri'] . '">测试用例</a>
                    <a target="_blank" class="url" href="' . $result_item['task_target_uri'] . '">测试页面</a>

                </div>
            </div>

            <div class="result">用例总数：<span class="total-specs"><em>' . $result_item['total_specs'] . '</em></span> <em>|</em> 失败用例总数：<span
                class="failed-specs"><em>' . $result_item['failed_specs'] . '</em></span>

                <div class="bottom-action">
                    <a target="_self" class="del minibtn" href="handle.php?modify_tag=remove&task_id=' . $result_item['id'] . '">删除</a>
                    <a target="_blank" class="url minibtn" href="apply.php?task_id=' . $result_item['id'] . '">测试</a>
                    <a target="_blank" class="record minibtn" href="http://uitest.taobao.net/tool/record/record.html?id=' . $result_item['id'] . '">录制</a>
                </div>
            </div>

        </li>

                            ');
        }
        ?>


    </ul>


</div>


<?php include_once('./common/footer.php'); ?>