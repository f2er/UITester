<?php include_once('./common/header.php'); ?>
<script src="assets/form.js"></script>
<style>
    #input_test {
        margin: 50px 0 0;
    }

</style>

<div class="container" style="width: 920">

    <div id="input_test"  style="text-align: center">
        <div class="alert alert-info" style="margin: auto;text-align: left;width: 500px">
            <strong>���Է�ʽ</strong>
           <p> 1.��Ҫ�ֶ�����<a href="http://http://assets.daily.taobao.net/p/uitest/build/uitest-jquery.js">uitest���Կ��</a>��
            ���߰�װUITester��������<a href="http://assets.daily.taobao.net/p/uitest/plugin/chrome/src.crx">chrome</a>
            <a href="http://assets.daily.taobao.net/p/uitest/plugin/ie/ie_plugin/IESetup/Debug/IESetup.msi">ie</a>
            </p>
            <p>2.��������ı������������Ĳ��Դ���</p>

        </div>
        <textarea id="test_text" rows="100"  style="width: 500px"></textarea>

        <button class=""btn  btn-large btn-primary  " type="button " id="run_test">����</button>

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