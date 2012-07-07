(function () {



    //重置setTimeout,setInterval
    // ajax等异步方法

    var testCases = [];

    var filterAttr = {"id":1,"src":1};
    var filterParent ={"head":1}

    var filterChild ={"iframe":1,"script":1}

    //[{events:[],mutations:[]}]

    var addEvent = function (e) {
        var l = testCases.length == 0 ? testCases.length : testCases.length - 1
        var last = testCases[l];
        if (!last) {

            testCases.push({events:[e]});
        }
        else if (last.mutations) {
            testCases.push({events:[e]})
        }
        else {
            last.events.push(e)
        }
    }
    var addMutations = function (m) {
        var l = testCases.length == 0 ? testCases.length : testCases.length - 1
        var last = testCases[l];
        if (!last) {

            testCases.push({mutations:m});
        }

        else {
            last.mutations = (last.mutations || []).concat(m)
        }

    }
    var clearRecord = function () {

    }


    $(document).ready(function () {
        var start = false;
        var all = document.querySelectorAll("*");



        var actionLock = false;
        var changeEventRecords = [];
        var preEventRecord;
        var mutationRecords = [];

        var allEventRecord = [];
        var allMutationRecords = [];
        var validEvent = function (target, type) {
            var result = false;
            if (target['on' + type])result = true;
            else if (target["_bindEventType"] && target["_bindEventType"][type]) {
                result = true
            }
            else if (type == "change"||type == "textInput") {
                result = true
            }

            return result;
        }

        var getValidEventTarget = function (target, type) {

            while (true) {

                if (validEvent(target, type)) {
                    return target;
                }
                else {
                    target = target.parentNode;
                }
                if (!target || (target == window) || (target.tagName.toLowerCase() === "html")) {
                    break;
                }

            }


        }

        var timer;
        for (var p in uitest.configs.events) {

            (function (type) {
                document.body.addEventListener(type, function (e) {
                    start = true;
                    if (uitest.configs.caseType != "event")return;
                    if (!uitest.configs.events[type])return;
                    var target = getValidEventTarget(e.target, e.type);
                    if (target) {
                        if (e.type == "change"||e.type == "textInput") e.changeValue = e.target.value;


                            addEvent($.extend({}, e));

                    }

                }, true, true)
                window.addEventListener("hashchange", function(){

                    addEvent({
                        type:"hashchange",
                        value:location.hash
                    })
                }, false);


                window.stopPropagationProxy = function (e) {

                    if (uitest.configs.caseType != "event")return;
                    if (!uitest.configs.events[e.type])return;


                    var target = getValidEventTarget(e.target, e.type);


                    if (target) {
                        if (e.type == "change")  e.changeValue = e.target.value;


                        addEvent($.extend({}, e));
                    }
                }


            })(p);

        }

        /*
         window.eventObserver = function(target,type){

         addEvent({target:target, type:type});

         }
         */


//记录变化

        var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
        var createTimer;





        var observer = new MutationObserver(function (mutations) {
            console.log(mutations)
            if (uitest.configs.caseType != "event")return;


            window.setTimeout(function () {
                console.log("testCases",testCases)

                addMutations(mutations);

                if(createTimer){
                    window.clearTimeout(createTimer);
                    createTimer = null;

                }

                createTimer = window.setTimeout(function(){

                    createEventTypeTestCase();

                },500)



            }, 1)





        });

        observer.observe(document, {
            attributes           :true,
            childList            :true,
            characterData        :true,
            subtree              :true,
            attributeOldValue    :true,
            characterDataOldValue:true
        });

        uitest.inner.removeEventTypeTestCase = function () {
            testCases = [];

            uitest.inner.outterCall("hideCreateBtn");

        }



        function  createEventTypeTestCase() {

            for (var i = 0; i < testCases.length; i++) {

                    createTestCase(testCases[i].mutations||[], testCases[i].events||[])


            }
            testCases = [];

        }

        function createTestCase(mutations, allEventRecord) {
            if(mutations.length ==0&&allEventRecord==0){
                return;
            }


            uitest.inner.outterCall("hideCreateBtn");

            //分析最终状态
            //随机数过滤


            /**
             * 异常情况:
             * 多次修改同一个属性
             * 添加多个相同的标签
             * 添加之后立即删除
             *
             */
            var testCase = [];


            uitest.inner.hasSelectorChange(mutations);


            var expectNum = 0;
            var verifys = [];

            var records = [];

            var hasRecords = function (rec) {
                var result = false;
                for (var i = 0; i < records.length; i++) {
                    if (records[i] === rec){
                        result = true;
                        break;
                    };
                }
                return result;
            }
            var hasChildListRecords = function (rec) {

                for (var i = 0; i < records.length; i++) {
                    if (records[i] && rec) {
                        if (records[i].replace(/\d+/g, "") === rec.replace(/\d+/g, ""))return i;
                    }

                }
            }

            var toS = uitest.inner.elToSelector;
            var toSP = uitest.inner.elToSelectorRelativeParent;
            


            var testCase = 'describe("交互动作测试用例",function(){\n';
            var lastActionType ="";
             var targetSelector = "";
            if(allEventRecord.length!==0){
                var lastAction  = allEventRecord[allEventRecord.length-1];

                lastActionType = lastAction.type;
                targetSelector =toS(lastAction.target)
            }


            
          


            testCase += '  it("'+lastActionType+' '+targetSelector+'", function(){\n';


            mutations.forEach(function (mutation) {


                if (mutation.type == "attributes") {
                    if(!mutation.target.parentNode||!mutation.target.ownerDocument){
                        return;
                    }
                    if(filterAttr[mutation.attributeName])return;

                    var oldValue = mutation.oldValue;


                    var selector = uitest.inner.elToSelector(mutation.target)
                    var newValue = $(selector).attr(mutation.attributeName)

                    if (oldValue && !newValue && !/\d+/.test(oldValue)) {


                        var expect = 'expect("' + selector + '").willRemoveAttr("' + mutation.attributeName + '");\n'
                        if (!hasRecords(expect)) {
                            records.push(expect);

                        }

                    }

                    if (oldValue && newValue && !/\d+/.test(newValue)) {


                        var expect = 'expect("' + selector + '").willHaveAttr("' + mutation.attributeName + '","' + newValue + '");\n'
                        if (!hasRecords(expect)) {
                            records.push(expect);


                        }

                    }
                    ;
                }
                if (mutation.type == "characterData") {

                    var target = mutation.target.parentNode;
                    var newValue = target.innerHTML;


                    var selector = uitest.inner.elToSelector(target)

                    newValue=   newValue.replace(/"/ig,'\\"')


                    var expect = 'expect("' + selector + '").willModifyInnerHTML("' + newValue + '");\n';
                    if (!hasRecords(expect)) {
                        records.push(expect);
                    }


                }

                if (mutation.type == "childList") {
                    var tag = mutation.target.tagName.toLowerCase();
                    //难以预测，暂时不支持
                    if(filterParent[tag])return;



                    var addedNodes = mutation.addedNodes;
                    var removedNodes = mutation.removedNodes;
                    //分析


                    var selector = uitest.inner.elToSelector(mutation.target)


                    if (addedNodes.length > 0) {
                        for (var i = 0; i < addedNodes.length; i++) {
                            addedNodes[i]._isJsAdd = true;

                            if(filterChild[addedNodes[i].tagName.toLowerCase()])continue;

                            if (addedNodes[i].ownerDocument) {

                                var se = toSP(addedNodes[i]);
                                if (!se)continue;
                                console.log("willAddChildren", mutation.target, selector, addedNodes[i], se)
                                var expect = 'expect("' + selector + '").willAddChild("' + se + '");\n';
                                var removeExpect = 'expect("' + selector + '").willRemoveChild("' + se + '");\n';

                                var index = hasChildListRecords(removeExpect);

                                if (index === undefined) {

                                    records.push(expect);

                                }


                            }


                        }

                    }
                    if (removedNodes.length > 0) {
                        for (var i = 0; i < removedNodes.length; i++) {


                            var se = toSP(removedNodes[i]);
                            if(se){
                                var expect = 'expect("' + selector + '").willRemoveChild("' + se + '");\n';

                                var addExpect = 'expect("' + selector + '").willAddChild("' + se + '");\n';
                                var index = hasChildListRecords(addExpect);

                                if (index === undefined) {

                                    records.push(expect);

                                }
                            }
                           



                        }


                    }


                }


            });


            for (var i = 0; i < records.length; i++) {
                if (records[i]) {
                    var v = "exp" + i;

                    testCase += '    var ' + v + ' = ' + records[i];
                    verifys.push(v + ".verify();")
                }


            }
            var allEventRecordString = {};

            for (var i = 0; i < allEventRecord.length; i++) {

                console.log("simulate", allEventRecord[i].target)

               if(allEventRecord[i].type === "hashchange"){
                   if (allEventRecordString[allEventRecord[i].value + ":" + allEventRecord[i].type])continue;

                   allEventRecordString[allEventRecord[i].value + ":" + allEventRecord[i].type] = 1;
                   testCase += '    simulate("' + allEventRecord[i].value + '","hashchange");\n';
                   continue;
               }

                var selector = uitest.inner.elToSelector(allEventRecord[i].target);



                if (allEventRecordString[selector + ":" + allEventRecord[i].type])continue;

                allEventRecordString[selector + ":" + allEventRecord[i].type] = 1;

                var keyCode = '';
                if (/^key/.test(allEventRecord[i].type)) {
                    keyCode = ',{keyCode:' + allEventRecord[i].keyCode + ',charCode:' + allEventRecord[i].charCode + '}';
                }

                if (allEventRecord[i].type === "change"||allEventRecord[i].type === "textInput") {
                    var temp = '    $("' + selector + '").val("' + $(selector).val() + '");\n'

                    if (allEventRecordString[temp])continue;
                    allEventRecordString[temp]=1
                    testCase += '    $("' + selector + '").val("' + $(selector).val() + '");\n';
                    testCase += '    simulate("' + selector + '","change"' + keyCode + ');\n';
                }


                else{
                    var temp = '    simulate("' + selector + '","' + allEventRecord[i].type + '"' + keyCode + ');\n'
                    if (allEventRecordString[temp])continue;
                    allEventRecordString[temp]=1
                    testCase += '    simulate("' + selector + '","' + allEventRecord[i].type + '"' + keyCode + ');\n';

                }





            }


            for (var i = 0; i < verifys.length; i++) {
                testCase += '    waitsMatchers(function(){' + verifys[i] + '});\n'
            }


            testCase += '  })\n})'

            uitest.inner.outterCall("appendCaseCode", [testCase]);
            allEventRecordString =[]
            allEventRecord = [];
            allMutationRecords = []

        }


    })


})();