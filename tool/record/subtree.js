(function () {
    //重置setTimeout,setInterval
    // ajax等异步方法

  $(document).ready(function(){
      var createTestCase = function (target) {
          var testCase = 'describe("属性测试用例",function(){\n';
          var selector = uitest.inner.elToSelector(target);
          var html = target.innerHTML;
          testCase += '  it("' + selector + ' to be exist"' + ', function(){\n';
          testCase += '    expect("' + selector + '").toHaveSameSubTree("'+html+'");\n';
          testCase += '  })\n})\n'
          uitest.inner.outterCall("appendCaseCode", [testCase])

      }


      //事件类型
      $(document).on("click", function (e) {
          if (uitest.configs.caseType == "subtree") {
              var target = e.target;
              window.setTimeout(function () {
                  createTestCase(target);
              }, 0)
          }
      })


  })

 
})();