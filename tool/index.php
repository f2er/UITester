<?php include 'common/header.php' ?>

<style>
    .navbar {
        margin-bottom: 0;
    }
</style>




<div class="jumbotron masthead">
    <style>

        .jumbotron {
            position: relative;
            padding: 40px 0;
            color: white;
            text-align: center;
            text-shadow: 0 1px 3px rgba(0, 0, 0, .4), 0 0 30px rgba(0, 0, 0, .075);
            background: #020031;
            background: -moz-linear-gradient(45deg, #020031 0%, #6D3353 100%);
            background: -webkit-gradient(linear, left bottom, right top, color-stop(0%, #020031), color-stop(100%, #6D3353));
            background: -webkit-linear-gradient(45deg, #020031 0%, #6D3353 100%);
            background: -o-linear-gradient(45deg, #020031 0%, #6D3353 100%);
            background: -ms-linear-gradient(45deg, #020031 0%, #6D3353 100%);
            background: linear-gradient(45deg, #020031 0%, #6D3353 100%);
            filter: progid:DXImageTransform.Microsoft.gradient(startColorstr = '#020031', endColorstr = '#6d3353', GradientType = 1);
            -webkit-box-shadow: inset 0 3px 7px rgba(0, 0, 0, .2), inset 0 -3px 7px rgba(0, 0, 0, .2);
            -moz-box-shadow: inset 0 3px 7px rgba(0, 0, 0, .2), inset 0 -3px 7px rgba(0, 0, 0, .2);
            box-shadow: inset 0 3px 7px rgba(0, 0, 0, .2), inset 0 -3px 7px rgba(0, 0, 0, .2);
        }

        .jumbotron a {
            color: white;
            color: rgba(255, 255, 255, .5);
            -webkit-transition: all .2s ease-in-out;
            -moz-transition: all .2s ease-in-out;
            transition: all .2s ease-in-out;
        }

        .jumbotron .container {
            position: relative;
            z-index: 2;
        }

        .jumbotron p {
            font-size: 24px;
            font-weight: 300;
            line-height: 1.25;
            margin-bottom: 30px;
        }

        .jumbotron::after {
            content: '';
            display: block;
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            background: url(assets/bootstrap/img/bs-docs-masthead-pattern.png) repeat center center;
            opacity: .4;
        }

        .masthead p {
            font-size: 35px;
            font-weight: 200;
            line-height: 1.25;
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
    </style>
    <div class="container">
        <h1>UITest</h1>

        <p>一个高效，快速前端web页面测试平台，可以在真实的浏览器里面测试web页面的样式、功能、javascript</p>

        <p>

        <div class="input-append" style="margin-top: 70px">
            <input class="input-xlarge" placeholder="请输入测试代码的地址" id="test_src" type="text">
            <button class="btn btn-primary " type="button " id="run_test">测试</button>

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
        font-size: 16px;
        line-height: 1.5;
        text-align: left;
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

    <div class="marketing">

        <h1>UITest介绍</h1>

        <div class="row-fluid">
            <div class="span4">

                <h2>UT测试框架</h2>

                <p>UT测试框架是基于javascript和jasmine之上的webpage测试框架。UT使你可以自由操控web页面；使用丰富的断言语句进行测试；
                    强大的异步支持，可以更简单的测试异步功能，加快测试效率</p>
            </div>
            <div class="span4">

                <h2>高效率编写测试用例</h2>

                <p>录制工具帮助你更快更准备的编写测试代码。让编写测试代码成为一件简单轻松的事情</p>
            </div>
            <div class="span4">

                <h2>集成化的在线测试系统</h2>

                <p>回归测试可以时时监控web功能是否正常，并及时报告结果。
                    远程测试，只需要你准备好测试代码的url，就可以立即进行测试，并反馈结果。
                   本地测试，可以帮助你现场调试你的测试代码。</p>
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