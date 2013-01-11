<?php include_once('./common/header.php'); ?>
<script src="assets/form.js"></script>
<style>
    #input_test {
        margin: 20px 0 0;
    }
    #run_test{
        float: right;
    }
</style>

<header class="jumbotron subhead" id="overview">
  <div class="container">
    <h1>本地调试工具</h1>
  </div>
</header>

<div id="content" class="container">
<div id="runlocal">

    <div id="input_test" >
      <div><span>请输入测试代码或地址</span><span style="color: #ccc">（需要先安装浏览器插件<a href="http://assets.daily.taobao.net/p/uitest/plugin/chrome/src.rar">chrome</a>，<a href="http://assets.daily.taobao.net/p/uitest/plugin/ie/setup/setup.rar">ie</a>）</span></div>
      <div class="text"> <textarea id="test_text"  spellcheck="false">
          //example
          //测试本地调试导航菜单选中
          UT.open("http://uitest.taobao.net/tool/local-test.php", function(){
                describe("打开页面", function(){
                     it("测试导航选中", function(){
                         expect(".nav .acitve").toHaveAttr("href","http://uitest.taobao.net/tool/local-test.php")
                     })
                 })
          })
      </textarea></div>


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
                try{
                    eval(value);
                    UT.execute(function (data) {
                        var jsonReporter = new jasmine.JsonReporter();
                        jQuery("#myModal .modal-body").html("")
                        jsonReporter.renderHTML(data, jQuery("#myModal .modal-body"));
                        $('#myModal').modal('show');
                    })
                } catch (e){

                    jQuery("#myModal .modal-body").html(e.message)
                }

            }


        })


    </script>





</div>
</div>


<?php include_once('./common/footer.php'); ?>