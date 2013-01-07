(function () {
    //重置setTimeout,setInterval
    // ajax等异步方法


    var buildUrl = function () {

        var args = Array.prototype.slice.call(arguments);

        if (args.length < 2) {
            return args[0] || '';
        }

        var uri = args.shift();

        var splitArray = uri.split("#");

        uri = splitArray[0];
        var hash = splitArray[1];


        if (hash) {
            hash = "#" + hash;
        }
        else hash = ""

        uri += uri.indexOf('?') > 0 ? '&' : '?';

        return uri + args.join('&').replace(/&+/g, '&') + hash;

    }
    var build = function (baseUrl, username, password) {
        var result = buildUrl(baseUrl, "inject-type=record&__TEST__");

        if (username && password) {
            result = buildUrl(result, "username=" + username + "&password=" + password)
        }

        return result;
    }

    var unparam = function (str) {
        if (typeof str !== 'string'
            || (str = str.trim()).length === 0) {
            return {};
        }
        var sep = "&";
        var eq = "=";
        var ret = {},
            pairs = str.split(sep),
            pair, key, val,
            i = 0, len = pairs.length;

        for (; i < len; ++i) {
            pair = pairs[i].split(eq);
            key = decodeURIComponent(pair[0]);
            try {
                val = decodeURIComponent(pair[1] || "");
            } catch (e) {

                val = pair[1] || "";
            }


            ret[key] = val;

        }
        return ret;
    };

    window.uitest = {};

    uitest.cmd = {

    }

    uitest.configs = {
        setInterval:false,
        showSelectMark:true,
        caseType:"null",
        preventDefault:true,
        events:{
            // mouse events supported
            click:1,
            dblclick:1,
            mouseover:0,
            mouseout:0,
            mouseenter:0,
            mouseleave:0,
            mousedown:0,
            mouseup:0,
            mousemove:0,
            //key events supported
            keydown:0,
            keyup:0,
            keypress:0,
            /// HTML events supported
            blur:1,
            change:1,
            focus:1,
            resize:0,
            scroll:0,
            select:0,
            textInput:1


        },
        tags:{
            all:{value:1, label:"所有标签"},
            a:{value:1, label:"a"}
        },
        position:{
            offset:{
                value:0,
                select:[0, 0.1, 0.2, 0.5]
            },
            relatedNode:"html"
        },
        styles:{

        },
        attrs:{

            accesskey:1,
            class:1,
            contenteditable:1,
            contextmenu:1,
            dir:1,
            draggable:1,
            dropzone:1,
            hidden:1,
            id:1,
            inert:1,
            itemid:1,
            itemprop:1,
            itemref:1,
            itemscope:1,
            itemtype:1,
            lang:1,
            spellcheck:1,
            style:1,
            tabindex:1,
            title:1,
            translate:1,
            customAttributes:1,


            onabort:1,
            onblur:1,
            oncancel:1,
            oncanplay:1,
            oncanplaythrough:1,
            onchange:1,
            onclick:1,
            onclose:1,
            oncontextmenu:1,
            oncuechange:1,
            ondblclick:1,
            ondrag:1,
            ondragend:1,
            ondragenter:1,
            ondragleave:1,
            ondragover:1,
            ondragstart:1,
            ondrop:1,
            ondurationchange:1,
            onemptied:1,
            onended:1,
            onerror:1,
            onfocus:1,
            oninput:1,
            oninvalid:1,
            onkeydown:1,
            onkeypress:1,
            onkeyup:1,
            onload:1,
            onloadeddata:1,
            onloadedmetadata:1,
            onloadstart:1,
            onmousedown:1,
            onmousemove:1,
            onmouseout:1,
            onmouseover:1,
            onmouseup:1,
            onmousewheel:1,
            onpause:1,
            onplay:1,
            onplaying:1,
            onprogress:1,
            onratechange:1,
            onreset:1,
            onscroll:1,
            onseeked:1,
            onseeking:1,
            onselect:1,
            onshow:1,
            onstalled:1,
            onsubmit:1,
            onsuspend:1,
            ontimeupdate:1,
            onvolumechange:1,
            onwaiting:1,


            href:1,
            target:1,
            download:1,
            ping:1,
            rel:1,
            media:1,
            hreflang:1,
            type:1,
            sizes:1,

            alt:1,
            src:1,
            srcset:1,
            crossorigin:1,
            usemap:1,
            ismap:1,
            width:1,
            height:1,

            async:1,
            defer:1,
            charset:1,

            accept:1,
            autocomplete:1,
            autofocus:1,
            checked:1,
            dirname:1,
            disabled:1,
            form:1,
            formaction:1,
            formenctype:1,
            formmethod:1,
            formnovalidate:1,
            formtarget:1,
            list:1,
            max:1,
            maxlength:1,
            min:1,
            multiple:1,
            name:1,
            pattern:1,
            placeholder:1,
            readonly:1,
            required:1,
            size:1,

            step:1,
            value:1,

            autofocus:1,
            cols:1,
            dirname:1,
            disabled:1,
            form:1,
            maxlength:1,
            placeholder:1,
            readonly:1,
            required:1,
            rows:1,

            label:1,
            selected:1




        }
    }
    uitest.synConfigs = function () {
        uitest.outter.innerCall("setAllConfigs", [uitest.configs])

    }

    uitest.outter = {
        init:function () {
            var host = this;

            this.uatest();
            this.buildStyleConfigs();
            this.codeEditor();

            this.observeCall();
            this.layout();
            // this.initTabs();
            this.caseTypeEvent();


            this.runTestCaseEvent()

            this.showSelectMarkEvent();
            // this.initForm();
            this.openPage();

        },
        openPage:function () {
            var host = this;
            $("#open_page_save").on("click", function () {
                jQuery('#open_page').modal('hide');
                var iframe = $("#iframe-target")[0];
                iframe.src = $("#open_page_url").val();
                var win = iframe.contentWindow;

                var fun = function () {
                    jQuery.getScript('http://uitest.taobao.net/tool/record/core.js', function () {
                        uitest.inner.init();
                    });

                }
                //chrome下setTimeout里window的自定义属性失败
                var complete = false;
                UT._msgReady(win, function () {

                    UT.postmsg.send({
                        target:win,
                        data:{
                            type:"cmd",
                            code:1,
                            source:"(" + fun.toString() + ")();"
                        }
                    })


                }, function () {

                    alert("需要安装插件")


                });

                var src = 'var win = UT.open("' + iframe.src + '",function(){\r\n' +
                    '    describe("测试页面' + iframe.src + '", function(){\r\n' +
                    '       it("你的测试用例"， function(){\r\n' +
                    '           \r\n' +
                    '       })\r\n' +
                    '    })\r\n' +
                    '})\r\n';

                var r = host.appendCaseCode(src);

                r.startLine = r.endLine = r.endLine - 4;
                r.startColumn = r.endColumn = 10;

                host.restoreSelection(r);


            })

            $("#goto_page_save").on("click", function () {
                var iframe = $("#iframe-target")[0];
                iframe.src = $("#goto_page_url").val();
                $('#goto_page').modal('hide');

                var src = 'win.goto("' + iframe.src + '",function(){\r\n' +
                    '    describe("测试页面' + iframe.src + '", function(){\r\n' +
                    '       it("你的测试用例"， function(){\r\n' +
                    '           \r\n' +
                    '       })\r\n' +
                    '    })\r\n' +
                    '})\r\n';

                var r = host.appendCaseCode(src);

                r.startLine = r.endLine = r.endLine - 4;
                r.startColumn = r.endColumn = 10;

                host.restoreSelection(r);


            })


        },
        appendMutations:function (recods) {

            $("#mutations").show();
            var s = '<div style="padding: 0px 30px 0px 10px;margin: 1px" class="alert alert-success"><button type="button" class="close" data-dismiss="alert">×</button>';
            for (var i = 0; i < recods.length; i++) {
                s += '' +
                    '<a href="#" class="cmd_out_createCase" title="生成断言">' + recods[i].desc + '<i class="icon-chevron-right"  ></i>' +
                    '<textarea  style="display: none">' + recods[i].expect + '</textarea></a>' +
                    '';

            }
            s += ' </div>';
            $("#mutations").html($("#mutations").html() + s);

        },
        cmd_out_createCase:function (t) {
            var r = this.appendCaseCode($(t).find("textarea").val());
            var parent = $(t).parent()
            $(t).remove();

            if(parent.find("a").length==0){
                
                parent.remove();
            }

        },
        uatest:function () {
            if (!KISSY.UA.chrome) {
                alert("非chrome浏览器部分功能可能无法使用,请下载最新版本的chrome浏览器")
            }
            if (KISSY.UA.chrome && KISSY.UA.chrome < 19) {
                alert("chthrome浏览器版本过低，部分功能可能无法使用,请下载最新版本的chrome浏览器")
            }

        },
        showSelectMarkEvent:function () {
            var host = this;
            $("#show-select-mark").click(function () {
                if (!uitest.configs.showSelectMark) {
                    $("#show-select-mark").css("color", "red")
                    uitest.configs.showSelectMark = true;

                }
                else {
                    $("#show-select-mark").css("color", "")
                    uitest.configs.showSelectMark = false;
                    host.showMouseoverPanel(
                        "",
                        0,
                        0,
                        -999,
                        -999
                    )
                }

                uitest.synConfigs();
            })

            $(document).mouseover(function () {
                if (host.mouseoverPanel && host.mouseoverPanel.style.display == "block") {
                    host.hideMouseoverPanel();
                }

            })

        },
        showMouseoverPanel:function (selector, width, height, left, top) {

            if (!this.mouseoverPanel) {
                this.mouseoverPanel = $('<div class="mouseover-panel"></div>').get(0);
                $("#test-page").get(0).appendChild(this.mouseoverPanel);
            }
            this.mouseoverPanel.innerHTML = '<div class="selector">' + selector + '</div>';
            this.mouseoverPanel.style.display = "block";
            this.mouseoverPanel.style.position = "absolute";
            this.mouseoverPanel.style.width = width + "px";
            this.mouseoverPanel.style.height = height + "px";
            this.mouseoverPanel.style.left = left + "px";
            this.mouseoverPanel.style.top = top + "px";

        },
        showSelectPanel:function (selector, width, height, left, top) {

            if (!this.selectPanel) {
                this.selectPanel = $('<div class="mouseover-panel"></div>').get(0);
                $("#test-page").get(0).appendChild(this.selectPanel);
            }
            this.selectPanel.innerHTML = '<div class="selector">' + selector + '</div>';
            this.selectPanel.style.display = "block";
            this.selectPanel.style.position = "absolute";
            this.selectPanel.style.width = width + "px";
            this.selectPanel.style.height = height + "px";
            this.selectPanel.style.left = left + "px";
            this.selectPanel.style.top = top + "px";

        },

        hideMouseoverPanel:function () {
            if (this.mouseoverPanel)this.mouseoverPanel.style.display = "none";
        },


        runTestCaseEvent:function () {
            var host = this;
            var run = false;

            $(".run-test").on("click", function (e) {

            })
        },


        buildStyleConfigs:function () {
            var styles = window.getComputedStyle(document.documentElement);

            for (var i = 0; i < styles.length; i++) {
                if (!/^-/.test(styles[i]))uitest.configs.styles[styles[i]] = 1;

            }

        },
        fetchCSS:function (url) {
            var host = this;
            $.get("http://uitest.taobao.net/tool/fetch_css.php", {cssurl:url}, function (data) {
                host.innerCall("appendStyle", [data])
            })
        },


        caseTypeEvent:function () {
            var host = this;

            $(document).on("click", function (e) {
                var t = e.target;
                if (t.className.indexOf("cmd_out") != -1) {
                    host[t.className] && host[t.className](t);
                }
                else if (t.className.indexOf("cmd_simulate") != -1) {
                    host.innerCall("cmd_simulate", [$(t).attr("data-type")])
                }
                else if (t.className.indexOf("cmd") != -1) {
                    host.innerCall(t.className)
                }

            })
        },

        "open_page_save":function () {


        },
        showConfigs:function (type) {
            var changeConfig = $(".change-tools li");
            changeConfig.hide();
            $("#configs-" + type).show();


        },

        layout:function () {
            KISSY.use("node, button, resizable", function (S, Node, Button, Resizable) {
                var r = new Resizable({
                    node:".page",
                    // 指定可拖动的位置
                    handlers:["b"]


                });


            });
        },

        codeEditor:function () {
            var editor = document.getElementById("test-case");
            var source = "";
            var textModel = new WebInspector.TextEditorModel();
            var textEditor = new WebInspector.TextViewer(textModel);
            editor.appendChild(textEditor.element)
            textEditor.readOnly = false;
            textEditor.mimeType = "text/javascript";
            textModel.setText(null, source);
            this.textEditor = textEditor;
            var inner = $(".text-editor-editable");
            inner.on("focus", function () {


            })
            inner.on("blur", function () {

                var selection = window.getSelection();
                var range = selection.getRangeAt(0);

                window._code_range = range;

            })

        },
        getAllTextNode:function (el) {
            var host = this;
            var node = [];
            var child = el.childNodes;
            for (var i = 0; i < child.length; i++) {
                if (child[i].nodeType == 3) {
                    node.push(child[i]);
                }
                else {
                    node = node.concat(host.getAllTextNode(child[i]));
                }
            }
            return node;

        },
        DOMRangeToRange:function (range) {

            var line = $(range.startContainer).closest(".webkit-line-content");
            if (!line[0])return;
            var startLine = 1;
            var allLine = $(".webkit-line-content");
            allLine.each(function (index, value) {
                if ($(value).is(line)) {
                    startLine = index;
                }
            })

            var startColumn = 0;
            var childNodes = this.getAllTextNode(line[0]);
            console.log("childNodes", childNodes)
            for (var i = 0; i < childNodes.length; i++) {

                if (childNodes[i] == range.startContainer) {
                    startColumn += range.startOffset;
                    break;
                }
                else if (childNodes[i].nodeType == 3) {
                    startColumn += childNodes[i].nodeValue.length;
                }
            }
            var r = new WebInspector.TextRange(startLine, startColumn, startLine, startColumn);

            return r

        },


        insertCode:function (src) {
            var inner = $(".text-editor-editable");
            inner.focus();
            var selection = window.getSelection();
            var range = selection.getRangeAt(0);
            if (range) {

                range.insertNode(document.createTextNode(src));
            }

        },
        restoreSelection:function (r) {
            this.textEditor._mainPanel._restoreSelection(r);
        },
        insertCaseCode:function (src) {
            var host = this;
            var inner = $(".text-editor-editable");
            inner.focus();
            console.log("rel", this.textEditor._mainPanel._getSelection());
            if (window._code_range) {


                var r = this.DOMRangeToRange(window._code_range);
                console.log("setTest in", r)
                /*  var space = "";
                 for(var i =0;i< r.startColumn;i++){
                 space += " ";
                 }
                 var srcArray = src.split("\r\n");
                 for(var i = 0;i<srcArray.length;i++){
                 srcArray[i]=space+srcArray[i]
                 }
                 src = srcArray.concat("\r\n");
                 */
                var r = this.textEditor.textModel.setText(r, src);
                r.startColumn = r.endColumn;
                r.startLine = r.endLine;

                console.log("setTest after", r)

                this.textEditor._mainPanel._restoreSelection(r);
                return r;
            }
        },
        appendCaseCode:function (src) {



            //   this.codeTabs.switchTo(0);
            var r = this.textEditor.textModel.appendText(src)
            var lines = $(".webkit-line-content");
            var lastLines = lines[lines.length - 1];
            lastLines.scrollIntoView();
            return r;


        },

        observeCall:function () {
            var host = this;
            UT.postmsg.bind(function (data) {

                if (data.funName && data.args) {
                    host[data.funName] && host[data.funName].apply(host, data.args)

                }
            })
        },
        innerCall:function (funName, args) {
            args = args || [];

            UT.postmsg.send({
                target:$("#iframe-target")[0].contentWindow,
                data:{funName:funName, args:args}
            })
        },
        setAllConfigs:function (configs) {
            uitest.configs = configs;

        }



    }

    uitest.inner = {
        init:function () {

            var host = this;
            this.initProxy();
            this.observeCall();
            this.selectorChangeEvent();
            this.beforeunloadWarning = false;
            this.canObserverMutation = false;
            jQuery(window).on("beforeunload", function () {
                if (host.beforeunloadWarning) {
                    return '';
                }
                else {
                    host.beforeunloadWarning = true;
                }
            })

            this.initMouseoverPanel();
            this.observerMutation();


        },
        observerMutation:function () {
            var host = this;

            var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
            var createTimer;

            var observer = new MutationObserver(function (mutations) {
                if (!host.canObserverMutation)return;
                console.log(mutations)
                var records = [];
                var toSP = uitest.inner.elToSelectorRelativeParent;
                mutations.forEach(function (mutation) {
                    if (mutation.type == "attributes") {
                        //被删除
                        if (!mutation.target.parentNode || !mutation.target.ownerDocument) {
                            return;
                        }
                        var oldValue = mutation.oldValue;
                        var selector = uitest.inner.elToSelector(mutation.target);
                        var newValue = $(selector).attr(mutation.attributeName);
                        if (!newValue) {
                            var expect = 'expect("' + selector + '").not.toHaveAttr("' + mutation.attributeName + '");\n'
                            records.push({
                                desc:selector + "元素删除了属性" + mutation.attributeName,
                                target:selector,
                                expect:expect,
                                value:mutation.attributeName
                            });
                        }
                        if (newValue) {
                            var expect = 'expect("' + selector + '").toHaveAttr("' + mutation.attributeName + '","' + newValue + '");\n'
                            records.push({
                                desc:selector + "元素将属性" + mutation.attributeName + "的值修改为" + newValue,
                                target:selector,
                                expect:expect,
                                value:mutation.attributeName
                            });
                        }
                    }
                    if (mutation.type == "characterData") {
                        var target = mutation.target.parentNode;
                        var newValue = target.innerHTML;
                        var selector = uitest.inner.elToSelector(target)
                        newValue = newValue.replace(/"/ig, '\\"')
                        var expect = 'expect("' + selector + '").toHaveHtml("' + newValue + '");\n';
                        records.push({
                            desc:selector + "元素innerHTML被修改为" + newValue,
                            target:selector,
                            expect:expect,
                            value:newValue
                        });
                    }

                    if (mutation.type == "childList") {
                        var tag = mutation.target.tagName.toLowerCase();
                        //难以预测，暂时不支持
                        var addedNodes = mutation.addedNodes;
                        var removedNodes = mutation.removedNodes;
                        //分析
                        var selector = uitest.inner.elToSelector(mutation.target);
                        for (var i = 0; i < addedNodes.length; i++) {
                            if (!addedNodes[i] || !addedNodes[i].tagName)continue;
                            if (addedNodes[i].ownerDocument) {
                                var se = toSP(addedNodes[i]);
                                if (!se)continue;
                                var expect = 'expect("' + selector + '").toHaveChild("' + se + '");\r\n';
                                records.push({
                                    desc:selector + "元素增加了一个子元素" + se,
                                    target:selector,
                                    expect:expect,
                                    value:se
                                });
                            }
                        }
                        for (var i = 0; i < removedNodes.length; i++) {
                            var se = toSP(removedNodes[i]);
                            if (se) {
                                var expect = 'expect("' + selector + '").not.toHaveChild("' + se + '");\r\n';
                                records.push({
                                    desc:selector + "元素删除了一个子元素" + se,
                                    target:selector,
                                    expect:expect,
                                    value:se
                                });
                            }
                        }
                    }


                });
                console.log(mutations)
                uitest.inner.outterCall("appendMutations", [records]);
            });

            observer.observe(document, {
                attributes:true,
                childList:true,
                characterData:true,
                subtree:true,
                attributeOldValue:true,
                characterDataOldValue:true
            });
        },
        cmd_simulate:function (type) {
            var host = this;
            if (host.selectTarget) {
                this.canObserverMutation = true;
                jasmine.simulate(host.selectTarget, type);
            } else {
                alert("请选择元素")
            }

        },
        cmd_toExist:function () {
            var host = this;
            if (host.selectTarget) {
                var src = 'expect("' + host.elToSelector(host.selectTarget) + '").toExist();\r\n';
                host.outterCall("insertCaseCode", [src])

            } else {
                alert("请选择元素")
            }
        },
        cmd_atPosition:function () {
            var host = this;
            if (host.selectTarget) {

                var testCase = '';
                var selector = uitest.inner.elToSelector(host.selectTarget);
                var offset = $(selector).offset();


                testCase += 'expect("' + selector + '").atPosition("' + (offset.left) + ', ' + (offset.top) + '","html");\r\n';

                host.outterCall("insertCaseCode", [testCase])

            } else {
                alert("请选择元素")
            }
        },
        cmd_toHaveComputedStyle:function () {
            var host = this;
            var filterStyles = function (styles) {
                var tempArray = [];
                for (var p in  styles) {
                    if (uitest.configs.styles[p]) {
                        tempArray.push(styles[p])
                    }
                }
                return tempArray;
            }

            var mergeCSSRules = function (CSSRules, target) {
                var merged = {};
                if (!CSSRules)CSSRules = [];

                for (var i = 0; i < CSSRules.length; i++) {
                    var s = CSSRules[i].style;
                    for (var j = 0; j < s.length; j++) {
                        var sname = s.getPropertyShorthand(s[j]) || s[j]

                        if (uitest.configs.styles[sname]) {
                            merged[sname] = $(target).css(sname);
                        }

                    }
                }
                return merged;

            }
            if (host.selectTarget) {


                var target = host.selectTarget;
                var selector = uitest.inner.elToSelector(host.selectTarget);

                var styles = mergeCSSRules(window.getMatchedCSSRules(target), target)
                if (Object.getOwnPropertyNames(styles).length == 0) {

                    uitest.inner.outterCall("insertCaseCode", ["//" + selector + " 没有定义样式\r\n"])

                    return;
                }
                //window.getMatchedCSSRules
                // mergeCSSRules(window.getMatchedCSSRules(target))


                var testCase = '';

                var expects = []


                for (var p in  styles) {


                    var name = p;
                    var value = styles[p];
                    if (value) {
                        expects.push('    expect("' + selector + '").toHaveComputedStyle("' + name + '","' + value + '");\r\n');
                    }

                }
                if (expects.length == 0) {
                    uitest.inner.outterCall("insertCaseCode", ["//" + selector + " 没有定义样式"])
                    return;
                }

                for (var i = 0; i < expects.length; i++) {
                    testCase += expects[i];
                }


                //所有事件都要停止，避免影响测试结果，
                // 包括hover的处理


                //showMsg(123);

                uitest.inner.outterCall("insertCaseCode", [testCase])


            } else {
                alert("请选择元素")
            }
        },
        cmd_toHaveValue:function () {
            var host = this;
            if (host.selectTarget) {

                var testCase = '';
                var selector = uitest.inner.elToSelector(host.selectTarget);


                testCase += 'expect("' + selector + '").toHaveValue("' + $(host.selectTarget).val() + '");\r\n';

                host.outterCall("insertCaseCode", [testCase])

            } else {
                alert("请选择元素")
            }
        },
        cmd_toHaveText:function () {
            var host = this;
            if (host.selectTarget) {

                var testCase = '';
                var selector = uitest.inner.elToSelector(host.selectTarget);


                testCase += 'expect("' + selector + '").toHaveText("' + $(host.selectTarget).text() + '");\r\n';

                host.outterCall("insertCaseCode", [testCase])

            } else {
                alert("请选择元素")
            }
        },
        cmd_toHaveAttr:function () {
            var host = this;
            if (host.selectTarget) {

                var testCase = '';
                var selector = uitest.inner.elToSelector(host.selectTarget);
                var attrs = $(host.selectTarget)[0].attributes;


                var testCase = '';


                for (var i = 0; i < attrs.length; i++) {


                    var name = attrs[i].name;
                    var value = attrs[i].value;
                    testCase += 'expect("' + selector + '").toHaveAttr("' + name + '","' + value + '");\r\n';
                }


                host.outterCall("insertCaseCode", [testCase])

            } else {
                alert("请选择元素")
            }
        },
        cmd_toHaveClass:function () {
            var host = this;
            if (host.selectTarget) {

                var testCase = '';
                var selector = uitest.inner.elToSelector(host.selectTarget);

                var
                    trimmedClasses = host.selectTarget.className,
                    classes = trimmedClasses ? trimmedClasses.split(/\s+/) : [],
                    i = 0,
                    len = classes.length;
                if (len == 0) {
                    uitest.inner.outterCall("insertCaseCode", ["//" + selector + " 没有定义class\r\n"])
                    return;
                }
                var testCase = '';
                for (; i < len; i++) {
                    testCase += 'expect("' + selector + '").toHaveClass("' + classes[i] + '");\r\n';
                }


                host.outterCall("insertCaseCode", [testCase])

            } else {
                alert("请选择元素")
            }
        },
        cmd_toBeVisible:function () {
            var host = this;
            if (host.selectTarget) {

                var testCase = '';
                var selector = uitest.inner.elToSelector(host.selectTarget);


                testCase += 'expect("' + selector + '").toBeVisible();\r\n';


                host.outterCall("insertCaseCode", [testCase])

            } else {
                alert("请选择元素")
            }
        },
        cmd_toBeHidden:function () {
            var host = this;
            if (host.selectTarget) {

                var testCase = '';
                var selector = uitest.inner.elToSelector(host.selectTarget);


                testCase += 'expect("' + selector + '").toBeHidden();\r\n';


                host.outterCall("insertCaseCode", [testCase])

            } else {
                alert("请选择元素")
            }
        },
        cmd_toBeChecked:function () {
            var host = this;
            if (host.selectTarget) {

                var testCase = '';
                var selector = uitest.inner.elToSelector(host.selectTarget);


                testCase += 'expect("' + selector + '").toBeChecked();\r\n';


                host.outterCall("insertCaseCode", [testCase])

            } else {
                alert("请选择元素")
            }
        },
        setBeforeunloadWarning:function () {
            this.beforeunloadWarning = false;
        },
        initProxy:function () {
            var host = this;
            var fireEventCallback;
            var setInterval = window.setInterval;


            window.setInterval = function () {
                var args = arguments;
                var arrays = []
                for (var i = 0; i < args.length; i++) {
                    arrays.push(args[i]);
                }

                var old = args[0];
                var fun = function () {
                    window._setIntervalRun = true;
                    if (uitest.configs.caseType == "event" && !uitest.configs.setInterval) {

                    }
                    else {
                        old.apply(window, arguments);
                    }


                }
                arrays[0] = fun;
                setInterval.apply(window, arrays);
            }


            $(document).ready(function () {

            })


            var realAdd = window.Node.prototype.addEventListener;
            window.Node.prototype.addEventListener = function () {

                var host = this;
                var arrays = [];
                for (var i = 0; i < arguments.length; i++) {
                    arrays.push(arguments[i]);
                }


                if (arrays[3]) {

                    realAdd.apply(this, arrays)
                }
                else {

                    host["_bindEventType"] = host["_bindEventType"] || {}


                    host["_bindEventType"][arrays[0]] = 1;
                    var type = arrays[0]
                    var oldFun = arrays[1];
                    if (oldFun) {
                        var newFun = function () {


                            window.eventObserver && window.eventObserver.apply(host, arguments)
                            if (!(uitest.configs.events[type] === 0 && uitest.configs.caseType == "event"))  oldFun.apply(host, arguments)
                        }
                        arrays[1] = newFun;
                    }


                    realAdd.apply(this, arrays)
                }

            };
            $(document).ready(function () {
                host.nodeAddEvent()
                var all = document.querySelectorAll("*");
                //事件
                for (var i = 0; i < all.length; i++) {
                    for (var p in uitest.configs.events) {
                        (function (type, target) {
                            var oldFun = target["on" + type]
                            if (oldFun) {
                                var newFun = function () {


                                    if (!(!uitest.configs.events[type] === 0 && uitest.configs.caseType == "event")) {
                                        window.eventObserver && window.eventObserver(target, type)
                                        oldFun.apply(target, arguments)
                                    }
                                }
                                target["on" + type] = newFun;
                            }
                        })(p, all[i]);

                    }
                }

                //添加elToSelector
                for (var j = 0; j < all.length; j++) {
                    var t = all[j];
                    t._elToSelector = host.elToSelector(t);
                    $(t).data("_elToSelector", host.elToSelector(t))

                    $(t).data("_elToSelectorRelativeParent", host.elToSelectorRelativeParent(t))

                }


            })
            var removeChild = window.Node.prototype.removeChild;
            window.Node.prototype.removeChild = function (el) {


                el._elToSelector = host.elToSelector(el);
                return  removeChild.apply(this, arguments)
            }

            var stopPropagation = window.Event.prototype.stopPropagation;

            window.Event.prototype.stopPropagation = function () {

                window.stopPropagationProxy && window.stopPropagationProxy(this);
                stopPropagation.apply(this, arguments);
            }


            //附上跳转
            $(document).ready(function () {
                document.body.addEventListener("click", function (e) {
                    var target = e.target;
                    if (uitest.configs.caseType && (uitest.configs.caseType !== "null")) {
                        if (target.tagName.toLowerCase() == "a" || $(target).parent("a")[0]) {
                            if (!/^#/.test(target.getAttribute("href"))) {
                                e.preventDefault()
                            }
                            ;
                        }
                    }
                    // e.halt();

                }, true, true)
            })


        },
        initMouseoverPanel:function () {
            var host = this;
            window.setTimeout(function () {
                document.addEventListener("mouseover", function (e) {
                    var target = e.target;

                    if (uitest.configs.showSelectMark) {

                        host.outterCall("showMouseoverPanel", [
                            host.elToSelector(target),
                            $(target).width(),
                            $(target).height(),
                            $(target).offset().left - $(document.body).scrollLeft(),
                            $(target).offset().top - $(document.body).scrollTop()
                        ]
                        )
                    }
                }, true, true)

                document.addEventListener("mouseleave", function (e) {
                    host.outterCall("showMouseoverPanel", [
                        "",
                        0,
                        0,
                        -999,
                        -999
                    ]
                    )
                }, true, true)
            }, 10)

            this.initSelectPanel();
        },
        initSelectPanel:function () {
            var host = this;
            window.setTimeout(function () {
                document.addEventListener("click", function (e) {
                    var target = e.target;
                    host.selectTarget = target;
                    host.outterCall("showSelectPanel", [
                        host.elToSelector(target),
                        $(target).width(),
                        $(target).height(),
                        $(target).offset().left - $(document.body).scrollLeft(),
                        $(target).offset().top - $(document.body).scrollTop()
                    ])
                }, true, true)
            }, 10)
        },

        createEventTestCase:function () {

        },
        runTestCase:function (src) {
            var old = uitest.configs.caseType
            uitest.configs.caseType = "test"
            var host = this;
            eval(src);
            (function () {
                var jasmineEnv = jasmine.getEnv();
                jasmineEnv.updateInterval = 1000;

                /*  var htmlReporter = new jasmine.HtmlReporter();

                 jasmineEnv.addReporter(htmlReporter);

                 jasmineEnv.specFilter = function (spec) {
                 return htmlReporter.specFilter(spec);
                 };
                 */
                var htmlReporter = new jasmine.JsonReporter(function (json) {
                    uitest.configs.caseType = old;

                    host.outterCall("showResult", [json]);
                });

                jasmineEnv.addReporter(htmlReporter);


                jasmineEnv.execute();


            })();


        },
        setConfig:function (key, value) {
            uitest.configs[key] = value;
        },
        supportConfig:function (name, key, value) {

            uitest.configs[name][key] = value;

        },
        setAllConfigs:function (configs) {
            uitest.configs = configs;
            if (configs.caseType == "style") {
                this.fetchCSS();

            }


        },
        _getHasClassParent:function (node) {
            var parent = el.parentNode;

        },

        elToSelector:function (el) {


            if (!el)return "";


            var selector = "";
            if (el == document) {
                return "html"
            }

            if (!el.tagName)return "";

            if (el.tagName.toLowerCase() === "body") {
                return "body"
            }
            if (el.tagName.toLowerCase() === "html") {
                return "html"
            }
            if (el.tagName.toLowerCase() === "head") {
                return "head"
            }

            var id = el.getAttribute("id");

            if (id && !/\d/.test(id) && el._break !== "id") {


                selector += "#" + id;
                return selector;
            }

            var className = $.trim(el.getAttribute("class"))


            if (className) {
                var avClass = [];
                el._appendClass = el._appendClass || "";
                for (var i = 0; i < el.classList.length; i++) {
                    if ($.trim(el.classList[i]) && !/\d/.test(el.classList[i]) && (el._appendClass.indexOf(el.classList[i]) === -1)) {
                        avClass.push(el.classList[i]);
                    }
                }

                if (avClass.length > 0) {
                    selector = "." + avClass.join(".");
                }
                else {
                    selector = el.tagName.toLowerCase();
                }


            }
            else {
                selector = el.tagName.toLowerCase();
            }


            //可能已经被删除
            if (!el.ownerDocument) {
                return $(el).data("_elToSelector") || selector
            }


            var old;
            var p = el;

            while (true) {
                p = p.parentNode;

                if (!p || !p.tagName)break;
                var l = $(selector, p).length;

                if (l == 1) {
                    old = p;
                } else {
                    break;
                }


                if (p.tagName.toLowerCase() === "body") {
                    break;
                }
            }


            if (!old) {
                old = el.parentNode || el._parentNode;
                var c = $(old).children(el.tagName.toLowerCase());
                for (var i = 0; i < c.length; i++) {
                    if (c[i] == el) {
                        break;
                    }
                }

                selector = uitest.inner.elToSelector(old) + ">" + el.tagName.toLowerCase() + ":nth-of-type(" + (i + 1) + ")";

            }

            else {
                if (old.tagName.toLowerCase() == "body") {
                    selector = selector
                }
                else {
                    selector = uitest.inner.elToSelector(old) + " " + selector;

                }
            }


            return selector;


        },
        elToSelectorRelativeParent:function (el) {

            if (!el)return "";

            var selector = "";
            if (!el.tagName)return "";
            if (el.tagName.toLowerCase() === "body") {
                return "body"
            }
            if (el.tagName.toLowerCase() === "html") {
                return "html"
            }
            if (el.tagName.toLowerCase() === "head") {
                return "head"
            }
            var id = el.getAttribute("id");
            if (id && !/\d/.test(id) && el._break !== "id") {
                selector += "#" + id;
                return selector;
            }
            var className = el.getAttribute("class");

            if (className) {
                var avClass = [];
                el._appendClass = el._appendClass || "";
                for (var i = 0; i < el.classList.length; i++) {
                    if (!/\d/.test(el.classList[i]) && (el._appendClass.indexOf(el.classList[i]) === -1)) {
                        avClass.push(el.classList[i]);
                    }
                }

                selector = "." + avClass.join(".");

            }
            else if (!el.ownerDocument) {
                selector = $(el).data("_elToSelectorRelativeParent") || selector
            }
            else {

                var c = $(el.parentNode).children(el.tagName.toLowerCase())
                for (var i = 0; i < c.length; i++) {
                    if (c[i] == el) {
                        break;
                    }
                }

                selector = el.tagName.toLowerCase() + ":nth-of-type(" + (i + 1) + ")";
            }


            return selector;


        },
        selectorChangeEvent:function () {
            var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;


            var observer = new MutationObserver(function (mutations) {

                if (uitest.configs.caseType == "null") {
                    uitest.inner.hasSelectorChange(mutations);
                }


            });

            observer.observe(document, {
                attributes:true,


                subtree:true

            });

        },
        nodeAddEvent:function () {
            var host = this;
            var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;


            var observer = new MutationObserver(function (mutations) {
                mutations.forEach(function (mutation) {
                    var addedNodes = mutation.addedNodes;
                    var removedNodes = mutation.removedNodes;
                    if (addedNodes.length > 0) {
                        for (var i = 0; i < addedNodes.length; i++) {
                            $(addedNodes[i]).data("_elToSelector", host.elToSelector(addedNodes[i]))

                            $(addedNodes[i]).data("_elToSelectorRelativeParent", host.elToSelectorRelativeParent(addedNodes[i]))
                        }

                    }

                })


            });

            observer.observe(document, {
                childList:true,
                subtree:true

            });


        },

        hasSelectorChange:function (mutations) {
            for (var i = 0; i < mutations.length; i++) {

                if (mutations[i].type == "attributes" && (mutations[i].attributeName === "id")) {


                    mutations[i].target._break = "id";
                }
                else if (mutations[i].type == "attributes" && (mutations[i].attributeName === "class")) {
                    var oldValue = mutations[i].oldValue || "";
                    var oldClassList = [];
                    var appendClass = [];
                    if (oldValue) {
                        oldClasList = oldValue.split(" ");
                    }
                    for (var j = 0; j < mutations[i].target.classList.length; j++) {
                        if (oldValue.indexOf(mutations[i].target.classList[j]) == -1) {
                            appendClass.push(mutations[i].target.classList[j])
                        }
                    }

                    mutations[i].target._appendClass = appendClass.join(" ");


                }


            }

        },
        synOutterConfigs:function () {
            this.outterCall("setAllConfigs", [uitest.configs])
        },
        fetchCSS:function () {
            var links = document.querySelectorAll("link");
            for (var i = 0; i < links.length; i++) {
                if (links[i].rel == "stylesheet") {
                    this.outterCall("fetchCSS", [links[i].href])
                }

            }

        },
        appendStyle:function (data) {
            $("head").append("<style>" + data + "</style>");
        },
        observeCall:function () {
            var host = this;

            UT.postmsg.bind(function (data) {


                if (data.funName && data.args) {
                    host[data.funName] && host[data.funName].apply(host, data.args)

                }
            })
        },
        outterCall:function (funName, args) {

            args = args || [];
            UT.postmsg.send({
                target:parent,
                data:{funName:funName, args:args}
            })
        }
    }


})();