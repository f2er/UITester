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
            font-size: 40px;
            font-weight: 200;
            line-height: 1.25;
        }

        .masthead {
            padding: 70px 0 80px;
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

        <p>һ����Ч������ǰ��webҳ�����ƽ̨����������ʵ��������������webҳ�����ʽ�����ܡ�javascript</p>

        <p>

        <div class="input-append">
            <input class="input-xlarge" placeholder="��������Դ���ĵ�ַ" id="test_src" type="text">
            <button class="btn btn-primary " type="button " id="run_test">����</button>

        </div>
        </p>
        <ul class="masthead-links">
            <li>
                <a href="https://github.com/taobao-sns-fed/UITester/wiki">����</a>
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
<div class="container">

    <div class="marketing">

        <h1>UITest����</h1>

        <div class="row-fluid">
            <div class="span4">

                <h2>UT���Կ��</h2>

                <p>UT���Կ���ǻ���javascript��jasmine֮�ϵ�webpage���Կ�ܡ�UTʹ��������ɲٿ�webҳ�棻ʹ�÷ḻ�Ķ��������в��ԣ�
                    ǿ����첽֧�֣����Ը��򵥵Ĳ����첽���ܣ��ӿ����Ч��</p>
            </div>
            <div class="span4">

                <h2>��Ч�ʱ�д��������</h2>

                <p>¼�ƹ��߰���������׼���ı�д���Դ��롣�ñ�д���Դ����Ϊһ�������ɵ�����</p>
            </div>
            <div class="span4">

                <h2>���ɻ������߲���ϵͳ</h2>

                <p>�ع���Կ���ʱʱ���web�����Ƿ�����������ʱ��������
                    Զ�̲��ԣ�ֻ��Ҫ��׼���ò��Դ����url���Ϳ����������в��ԣ������������
                   ���ز��ԣ����԰������ֳ�������Ĳ��Դ��롣</p>
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
    <p> �Ա�ǰ�˲��Լ���С�� 2012</p>
    <br>
    <br>
    <br>

</footer>

<div class="container" style="display: none">


    <div class="summery">
        <p>UITester��һ���Զ�����ǰ��UI����ƽ̨.</p>

        <p>UITester�����������Ա�ҳ�棬ͨ��¼�ƹ��߿��ٱ༭���޸Ĳ���������������������������Զ��ع����</p>
    </div>
    <div class="step-step">
        <div class="s">
            <h3>��װ:</h3>

            <p>��������������Զ�����<a href="http://uitest.taobao.net/proxy.pac">http://uitest.taobao.net/proxy.pac</a></p>
        </div>
        <div class="s">
            <h3>¼��:</h3>

            <p>������������ʹ���ֶ���д��UITester�ṩ��רҵ��¼�ƹ��ߣ�������������ı�д���޸�</p>
        </div>
        <div class="s">
            <h3>����:</h3>

            <p>UITester�ṩ��һ��ר�ŵ�ui���Կ��<a href="https://github.com/taobao-sns-fed/UITester">uitest</a>,���ʺϻ���HTMLҳ���UI����
            </p>
        </div>


    </div>
    <div class="nav">
        <a href="record/record.html">¼���²�������</a>
        <a href="tool/list.php">�鿴���в�������</a>

    </div>

</div>

</div>

<!-- Modal -->
<div id="myModal" style="width: 700px" class="modal hide fade" tabindex="-1" role="dialog"
     aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">��</button>
        <h3 id="myModalLabel">���Խ��</h3>
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
                    var passed = "δͨ��"
                }
                else {

                    var passed = "ͨ��"
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

                    jQuery("#myModal .modal-body").html("���ڲ���....");
                    $('#myModal').modal('show');
                    socket.emit("remote:task_start", {"task_inject_uri":src})
                }
                else {
                    alert("δ�ܳɹ�����")
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