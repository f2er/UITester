<?php include_once('./common/header.php'); ?>
    <style>
        .nav{
            text-align:center;
        }
        .nav a{
            display: inline-block;
            padding: 10px 20px;
            color:
                #BED7E1;
            text-shadow: -1px -1px 0
            rgba(0, 0, 0, 0.25);
            font-size: 12px;
            background:#50B7D1;
            background: -moz-linear-gradient(
                #50B7D1,
                #286DA3);
            background: -webkit-linear-gradient(
                #50B7D1,
                #286DA3);
            -ms-filter: "progid:DXImageTransform.Microsoft.gradient(startColorstr='#50b7d1',endColorstr='#286da3')";
            border: 1px solid
            #51A0B3;
            border-radius: 4px;
            box-shadow: 0 1px 4px
            rgba(0, 0, 0, 0.3);
            -webkit-font-smoothing: antialiased;
            color:
                white;
            font-size: 16px;
            font-weight:bold;
            font-family:tahoma;
            margin:10px;
        }
        #content{
            text-align:center;
        }
        .step-step{
            margin: 25px 0 12px 0;
            padding: 15px 30px;
            font-size: 14px;
            color:
                #333;
            border: 1px solid
            #EEE;
            border-radius: 4px;
            box-shadow: 0 1px 1px
            #777;
            overflow:hidden;;
        }
        .step-step .s{
            float:left;
            width:28%;
            text-align:left;
            margin:23px;
        }
        .step-step .s h3{
            font-family: Palatino,Georgia,"Times New Roman",serif;
            font-size: 20px;
            font-weight: normal;
            color:
                black;
        }
        .step-step .s p{
            margin:5px 0px;
            color:#999;
        }
        .step-step .s  a{
            color:#999;
        }
    </style>
    <div class="summery">


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
            <p>UITester提供了一套专门的ui测试框架<a href="https://github.com/taobao-sns-fed/UITester">uitest</a>,更适合基于HTML页面的UI测试</p>
        </div>


    </div>
    <div class="nav">
        <a href="http://uitest.taobao.net/tool/record/record.html">录制新测试用例</a>
        <a href="http://uitest.taobao.net/tool/list.php">查看已有测试用例</a>

    </div>

</div>
<?php include_once('./common/footer.php'); ?>