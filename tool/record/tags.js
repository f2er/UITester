(function () {
    //重置setTimeout,setInterval
    // ajax等异步方法

    $(document).ready(function () {

        var createTestCase = function (target) {
            var testCase = 'describe("测试标签是否存在",function(){\n';
            var selector = uitest.inner.elToSelector(target);
            testCase += '  it("' + selector + '"' + ', function(){\n';
            testCase += '    expect("' + selector + '").toExist();\n';
            testCase += '  })\n})\n'
            uitest.inner.outterCall("appendCaseCode", [testCase])

        }


        //事件类型
        document.body.addEventListener("click", function (e) {
            if (uitest.configs.caseType == "tags") {
                var target = e.target;
                window.setTimeout(function () {
                    createTestCase(target);
                }, 0)
            }
        },true,true)

    })


})();