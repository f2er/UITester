(function () {
    //重置setTimeout,setInterval
    // ajax等异步方法

    $(document).ready(function () {

        var createTestCase = function (target) {

            var testCase = 'describe("测试标签位置",function(){\n';
            var selector = uitest.inner.elToSelector(target);
            var offset = $(selector).offset();
            var r =  $(uitest.configs.position.relatedNode).offset();
            


            testCase += '  it("' + selector + '"' + ', function(){\n';
            testCase += '    expect("' + selector + '").atPosition(' + (offset.left-r.left) + ', ' + (offset.top-r.top) + ', '+uitest.configs.position.offset.value+', "'+uitest.configs.position.relatedNode+'");\n';

            //showMsg(123);
            testCase += '  })\n})\n'

            uitest.inner.outterCall("appendCaseCode", [testCase])

        }

        //事件类型
        document.body.addEventListener("click", function (e) {

            if (uitest.configs.caseType == "position") {
                var target = e.target;
                var selector = uitest.inner.elToSelector(e.target);
                createTestCase(target);
            }
            
            if(uitest.configs.caseType=="select-related-node"){
                var selector = uitest.inner.elToSelector(e.target);
                uitest.configs.position.relatedNode = selector;

                uitest.inner.outterCall("setSelectRelatedNode",[selector])
                uitest.configs.caseType = "position";
                uitest.inner.outterCall("setAllConfigs",[uitest.configs])
                
            }


        },true,true)


    })


})();