<?php include_once('./common/header.php'); ?>
<script src="assets/form.js"></script>
<style>
    #input_test {
        margin: 50px 0 0;
    }

</style>

<div class="container" style="width: 920">

    <div id="input_test" class="input-append" style="text-align: center">
        <div class="alert alert-info">
            需要手动引入<a href="http://http://assets.daily.taobao.net/p/uitest/build/uitest-jquery.js">uitest测试框架</a>，
            或者安装UITester浏览器插件<a href="http://assets.daily.taobao.net/p/uitest/plugin/chrome/src.crx">chrome</a> 
            <a href="http://assets.daily.taobao.net/p/uitest/plugin/ie/ie_plugin/IESetup/Debug/IESetup.msi">ie</a>
        </div>
        <textarea id="test_text" rows="3"></textarea>

        <button class="btn btn-primary " type="button " id="run_test">测试</button>

    </div>

    <div class="result-report">

    </div>


    <script>
        $("#run_test").on("click", function () {
            jasmine._newEnv = true;
            eval($("#test_text").val());
            UT.execute(function (data) {
                var jsonReporter = new jasmine.JsonReporter();
                jsonReporter.renderHTML(data, jQuery(".result-report"));
            })
        })


    </script>



    <?php include_once('./common/footer.php'); ?>


</div>