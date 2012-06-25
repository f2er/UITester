(function () {
    //重置setTimeout,setInterval
    // ajax等异步方法


    $(document).ready(function () {

        var allMutationRecords = [];

        var filterAttr = function(attrs){
            var tempArray = [];
            for(var i=0; i<attrs.length;i++){
                if(uitest.confis.attrs[attrs[i].name]){
                    tempArray.push(attrs[i])
                }
            }
            return tempArray;
        }


        var createTestCase = function (target) {

            var testCase = 'describe("节点属性测试用例",function(){\n';
            var selector = uitest.inner.elToSelector(target);
            var attrs = filterAttr(target.attributes);
            if (attrs.length == 0)return;
            target._addAttr = {};
            target._removeAttr = {};
            target._modifiyAttr = {}

            allMutationRecords.forEach(function (mutation) {
                console.log(mutation)

                if (mutation.type == "attributes" && mutation.target == target) {



                    var oldValue = mutation.oldValue;
                    var newValue = mutation.target.getAttribute(mutation.attributeName)

                    if (oldValue && !target._modifiyAttr[mutation.attributeName]) {
                        target._modifiyAttr[mutation.attributeName] = oldValue;
                    }

                    if (!oldValue && newValue && !target._addAttr[mutation.attributeName]) {
                        target._addAttr[mutation.attributeName] = true;
                    }
                    ;
                }
                console.log(target._addAttr);

            })


            testCase += '  it("' + selector + ' 拥有属性"' + ', function(){\n';



            for (var i = 0; i < attrs.length; i++) {


                var name = attrs[i].name;


                if (!target._addAttr[name]) {
                    var value = target._modifiyAttr[name] || attrs[i].value;

                    testCase += '    expect("'+selector+'").toHaveAttr("' + name + '","' + value + '");\n';
                }


            }
            target._addAttr = {};
            target._removeAttr = {};
            target._modifiyAttr = {}


            //showMsg(123);
            testCase += '  })\n})\n'
            uitest.inner.outterCall("appendCaseCode", [testCase])

        }


        var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;


        var observer = new MutationObserver(function (mutations) {


            if (uitest.configs.caseType == "attr") {

                uitest.inner.hasSelectorChange(mutations);
                allMutationRecords = allMutationRecords.concat(mutations);

            }


        });

        observer.observe(document, {
            attributes:true,


            subtree:true

        });


        //事件类型
        document.body.addEventListener("click", function (e) {

            if (uitest.configs.caseType == "attr") {
                var target = e.target;

                window.setTimeout(function () {
                    createTestCase(target);
                    allMutationRecords = [];
                }, 10)

            }


        },true,true)


    })


})();