<?php include_once('./common/header.php'); ?>
<script src="assets/form.js"></script>
<style>
    #input_test {
        margin: 50px 0 0;
    }

</style>

<div class="container" id="runlocal">

    <div id="input_test" >

      <div class="text"> <textarea id="test_text" ></textarea></div>

        <div clsss="info">
           <p class="setup"></p><button class="btn" type="button " id="run_test">≤‚ ‘</button>
       </div>

    </div>

    <div id="myModal" style="width: 700px" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">°¡</button>
            <h3 id="myModalLabel">≤‚ ‘Ω·π˚</h3>
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