<?php $nav='index'; include 'common/header.php' ?>

<div class="jumbotron masthead">
    <style>

        

        .masthead p {
            font-size: 35px;
            font-weight: 200;
            line-height: 1.25;
            font-family: "ya";
        }

        .masthead {
            padding: 80px 0 80px;
            margin-bottom: 0;
            color: white;
        }

        .masthead h1 {
            font-size: 120px;
            line-height: 1;
            letter-spacing: -2px;
        }

        .masthead-links {
            margin: 0;
            list-style: none;
        }

        .masthead-links li {
            display: inline;
            padding: 0 10px;
            color: rgba(255, 255, 255, .25);
        }
        .masthead .btn {
            padding: 19px 24px;
            font-size: 24px;
            font-weight: 200;
            color: white;
            border: 0;
            -webkit-border-radius: 6px;
            -moz-border-radius: 6px;
            border-radius: 6px;
            -webkit-box-shadow: inset 0 1px 0 rgba(255, 255, 255, .1), 0 1px 5px rgba(0, 0, 0, .25);
            -moz-box-shadow: inset 0 1px 0 rgba(255,255,255,.1), 0 1px 5px rgba(0,0,0,.25);
            box-shadow: inset 0 1px 0 rgba(255, 255, 255, .1), 0 1px 5px rgba(0, 0, 0, .25);
            -webkit-transition: none;
            -moz-transition: none;
            transition: none;
        }
        .masthead .btn:hover {
            -webkit-box-shadow: inset 0 1px 0 rgba(255, 255, 255, .1), 0 1px 5px rgba(0, 0, 0, .25);
            -moz-box-shadow: inset 0 1px 0 rgba(255,255,255,.1), 0 1px 5px rgba(0,0,0,.25);
            box-shadow: inset 0 1px 0 rgba(255, 255, 255, .1), 0 1px 5px rgba(0, 0, 0, .25);
        }
    </style>
    <div class="container">
        <h1>UITest</h1>

        <p>一个自动化前端UI测试平台，让测试web页面的样式、功能和javascript简单而高效</p>

        <p>

        <div class="input-append" style="margin-top: 70px">
        <a href="https://github.com/taobao-sns-fed/UITester/wiki" class="btn btn-primary btn-large" >学习使用</a>

        </div>
        </p>
        <ul class="masthead-links">
            <li>
                <a href="https://github.com/taobao-sns-fed/UITester/wiki">Examples</a>
            </li>
            <li>
                <a href="https://github.com/taobao-sns-fed/UITester/">GitHub</a>
            </li>
            <li>
                <a href="https://github.com/taobao-sns-fed/UITester/wiki">wiki</a>
            </li>

            <li>
                Version 2.0.0
            </li>
        </ul>
    </div>
</div>
<style>
    .bs-docs-social {
        padding: 15px 0;
        text-align: center;
        background-color: whiteSmoke;
        border-top: 1px solid white;
        border-bottom: 1px solid #DDD;
    }
    .bs-docs-social-buttons {
        margin-left: 0;
        margin-bottom: 0;
        padding-left: 0;
        list-style: none;
    }
    .bs-docs-social-buttons li {
        display: inline-block;
        padding: 5px 8px;
        line-height: 1;
    }
    .marketing {
        text-align: center;
        color: #5A5A5A;
    }
    .marketing h1 {
        margin: 60px 0 10px;
        font-size: 60px;
        font-weight: 200;
        line-height: 1;
        letter-spacing: -1px;
    }
    .marketing h2 {
        font-weight: 200;
        margin-bottom: 5px;
    }
    .marketing p {
        font-size: 14px;
        line-height: 1.5;
        text-align: left;
        font-family: "ya";
    }
</style>
<div class="bs-docs-social">
    <div class="container">
        <ul class="bs-docs-social-buttons">
            <li>
                <iframe class="github-btn" src="http://ghbtns.com/github-btn.html?user=tb-sns-fed&amp;repo=UITester&amp;type=watch&amp;count=true" allowtransparency="true" frameborder="0" scrolling="0" width="100px" height="20px"></iframe>
            </li>
            <li>
                <iframe class="github-btn" src="http://ghbtns.com/github-btn.html?user=tb-sns-fed&amp;repo=UITester&amp;type=fork&amp;count=true" allowtransparency="true" frameborder="0" scrolling="0" width="102px" height="20px"></iframe>
            </li>


        </ul>
    </div>
</div>
<div style="margin-bottom: 70px" class="container">

    <div class="marketing" style="margin-top: 60px; ">



        <div class="row-fluid">
            <div class="span4">

                <h2>UT测试框架</h2>

                <p>UT测试框架是基于javascript和jasmine之上的web UI测试框架。</p>
                 <p>UT使你可以自由操控web页面；使用丰富的断言语句进行测试</p>
                <p>强大的异步支持，可以更简单的测试异步功能，加快测试效率</p>
            </div>
            <div class="span4">

                <h2>高效率编写测试用例</h2>

                <p>录制工具帮助你更快更准备的编写测试代码。</p>
                <p>抓取元素，自动生成断言</p>
                <p>模拟事件，记录变化</p>
                <p>让编写测试代码成为一件简单轻松的事情</p>
            </div>
            <div class="span4">

                <h2>集成化的在线测试系统</h2>

                <p>回归测试可以时时监控web功能是否正常</p>
                <p>及时旺旺通知报告结果</p>
                 <p>本地调试工具，可以帮助你现场调试你的测试代码。</p>
            </div>
        </div>



    </div>

</div>

<footer>
    <br>
    <br>

    <style>
        footer {
            background-color: whiteSmoke;
        }

        footer p {
            text-align: center;
        }


    </style>
    <p> 淘宝前端测试技术小组 2012</p>
    <br>
    <br>
    <br>

</footer>

<div class="container" style="display: none">


    <div class="summery">
        <p>UITester是一个自动化的前端UI测试平台.</p>

        <p>UITester适用于所有淘宝页面，通过录制工具快速编辑和修改测试用例，并能在所有浏览器中自动回归测试</p>
    </div>
    <div class="step-step">
        <div class="s">
            <h3>安装:</h3>

            <p>在浏览器中配置自动代理<a href="http://uitest.taobao.net/proxy.pac">http://uitest.taobao.net/proxy.pac</a></p>
        </div>
        <div class="s">
            <h3>录制:</h3>

            <p>测试用例不再使用手动编写。UITester提供的专业的录制工具，快速完成用例的编写和修改</p>
        </div>
        <div class="s">
            <h3>测试:</h3>

            <p>UITester提供了一套专门的ui测试框架<a href="https://github.com/taobao-sns-fed/UITester">uitest</a>,更适合基于HTML页面的UI测试
            </p>
        </div>


    </div>
    <div class="nav">
        <a href="record/record.html">录制新测试用例</a>
        <a href="tool/list.php">查看已有测试用例</a>

    </div>

</div>

</div>

<!-- Modal -->
<div id="myModal" style="width: 700px" class="modal hide fade" tabindex="-1" role="dialog"
     aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
        <h3 id="myModalLabel">测试结果</h3>
    </div>
    <div class="modal-body result-report" id="m-result-report">

    </div>
    <div class="modal-footer">
        <button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>

    </div>
</div>


<script>
    (function () {
        var renderResult = function (el, result) {
            var c = $(el);
            var jsonReporter = new jasmine.JsonReporter();
            var navHtml = '<ul class="nav nav-tabs" >'
            var bodyHtml = '<div class="tab-content result-report">'
            for (var p in result) {
                if (result[p].reports.failedSpecs !== 0 || result[p].reports.errors.length !== 0) {
                    var passed = "未通过"
                }
                else {

                    var passed = "通过"
                }

                var name = p.replace(/\./g, "_")

                navHtml += '<li class=""><a href="#' + name + '">' + p + passed + '</a></li>'
                bodyHtml += '<div class="tab-pane " id="' + name + '"></div>'

            }
            navHtml += "</ul>";
            bodyHtml += "</div>";
            c.html(navHtml + bodyHtml);


            var i = 1;
            jQuery.each(result, function (key, value) {
                var name = key.replace(/\./g, "_")
                if (i) {
                    $('.nav-tabs a[href="#' + name + '"]', c[0]).tab('show');
                    i = 0;
                }

                jsonReporter.renderHTML(value, jQuery("#" + name));
            });


            $('.nav-tabs a', c[0]).click(function (e) {
                e.preventDefault();
                $(this).tab('show');
            })


        }
        var isConnected = false;
        var http_host = location.host || "localhost";
        var url = 'http://' + http_host + ":3030" + "/socket.io/socket.io.js"


        jQuery.getScript(url, function () {

            var socket = io.connect('http://' + http_host + ":3030");

            if (!window.console) {
                window.console = {
                    log:function () {
                    },
                    info:function () {
                    },
                    debug:function () {
                    }
                }
            }


            jQuery("#run_test").on("click", function () {
                if (isConnected) {
                    var src = jQuery("#test_src").val();

                    jQuery("#myModal .modal-body").html("正在测试....");
                    $('#myModal').modal('show');
                    socket.emit("remote:task_start", {"task_inject_uri":src})
                }
                else {
                    alert("未能成功连接")
                }

            })

            socket.on("connect", function () {
                console.info("connect");
                if (isConnected)return;
                isConnected = true;
                var jsonReporter = new jasmine.JsonReporter();
                $('#myModal').modal({show:false})
                socket.on("remote:task_finish", function (data) {
                    $('#myModal').modal('show');

                    renderResult("#m-result-report", data.task_result)
                })


                // Send task report to server through Socket.IO
                // by trigger method of emit of socket object
                // socket.emit('console:task_finish', jasmineData);
            })


        })


    })();
</script>
</body>
</html>