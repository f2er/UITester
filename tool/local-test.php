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
            <strong>���Է�ʽ</strong>
            <p> 1.��Ҫ�ֶ�����<a href="http://http://assets.daily.taobao.net/p/uitest/build/uitest-jquery.js">uitest���Կ��</a>��
                ���߰�װUITester��������<a href="http://assets.daily.taobao.net/p/uitest/plugin/chrome/src.crx">chrome</a>
                <a href="http://assets.daily.taobao.net/p/uitest/plugin/ie/ie_plugin/IESetup/Debug/IESetup.msi">ie</a>
            </p>
            <p>2.��������ı������������Ĳ���Դ����ַ</p>

        </div>
        <textarea id="test_text" rows="6"  style="width: 500px"></textarea><br>

        <button class="btn" type="button " id="run_test">����</button>

    </div>

    <div class="result-report">

    </div>


    <script>
        $("#run_test").on("click", function () {
            jasmine._newEnv = true;
            UT.configs.windowType = "window";
            var value = $.trim($("#test_text").val());
            if(value&&value.match(/^http:\/\//)){
                $.getScript(value, function(){
                    UT.execute(function (data) {
                        var jsonReporter = new jasmine.JsonReporter();
                        jsonReporter.renderHTML(data, jQuery(".result-report"));
                    })
                })
            }
            else{
                eval(value);
                UT.execute(function (data) {
                    var jsonReporter = new jasmine.JsonReporter();
                    jsonReporter.renderHTML(data, jQuery(".result-report"));
                })
            }


        })


    </script>



    <?php include_once('./common/footer.php'); ?>


</div>