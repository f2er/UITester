<?php include_once('./common/header.php'); ?>
<script src="assets/form.js"></script>
<style>
    #input_test {
        margin: 50px 0 0;
    }

</style>

<div class="container" style="width: 920">

    <div id="input_test"  style="text-align: center">
        <div class="alert alert-info" style="margin: 10px auto;padding:8px;text-align: left;width: 500px; ">
            <strong>测试方式</strong>
            <p> 1.需要手动引入<a href="http://http://assets.daily.taobao.net/p/uitest/build/uitest-jquery.js">uitest测试框架</a>，
                或者安装UITester浏览器插件<a href="http://assets.daily.taobao.net/p/uitest/plugin/chrome/src.crx">chrome</a>
                <a href="http://assets.daily.taobao.net/p/uitest/plugin/ie/ie_plugin/IESetup/Debug/IESetup.msi">ie</a>
            </p>
            <p>2.设置浏览器允许窗口打开</p>
            <p>3.在下面的文本框架中输入你的测试源码或地址</p>

        </div>
        <textarea id="test_text" rows="6"  style="width: 500px"></textarea><br>

        <button class="btn" type="button " id="run_test">测试</button>

    </div>

    <div id="myModal" style="width: 700px" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            <h3 id="myModalLabel">测试结果</h3>
        </div>
        <div class="modal-body result-report">

        </div>
        <div class="modal-footer">
            <button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>

        </div>
    </div>


    <script>
        $('#myModal').modal({show:false})
        $("#run_test").on("click", function () {
            jasmine._newEnv = true;
            UT.configs.windowType = "window";
            var value = $.trim($("#test_text").val());
            if(value&&value.match(/^http:\/\//)){
                $.getScript(value, function(){
                    UT.execute(function (data) {
                        var jsonReporter = new jasmine.JsonReporter();
                        jQuery("#myModal .modal-body").html("")
                        jsonReporter.renderHTML(data, jQuery("#myModal .modal-body"));
                        $('#myModal').modal('show');
                    })
                })
            }
            else{
                eval(value);
                UT.execute(function (data) {
                    var jsonReporter = new jasmine.JsonReporter();
                    jQuery("#myModal .modal-body").html("")
                    jsonReporter.renderHTML(data, jQuery("#myModal .modal-body"));
                    $('#myModal').modal('show');
                })
            }


        })


    </script>



    <?php include_once('./common/footer.php'); ?>


</div>