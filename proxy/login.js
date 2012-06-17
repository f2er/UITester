//<script src="http://a.tbcdn.cn/s/kissy/1.2.0/kissy-min.js"></script>
//<script src="http://uitest.taobao.net/UITester/proxy/login.js"></script>[daolin@v035023.sqa.cm4 proxy]$ cat login.js
//** ***/
//window.open('https://login.taobao.com/member/login.jhtml?&redirectURL=' + encodeURIComponent(url), '_top')
document.write('auto login ....')

//
var redirect_url = location.href;
var TPL_username = task.username;
var TPL_password = task.password;

var obj = {
//      "ua":"Mx0xMjczHTo7NR0xMjczHTEzMjsdMTI3Mx01NTukpA==|rTcdEBCk|rTUdEBCk|rTExHa0QnbOzu7g2Hh6VlpKflByzm5aYm5YcmpaXHpeTl5iTuh6VlpKflBycnbOXlTy6k5GfupOas6CrhD2ds7O7GzCKGzKBGzKBnxyzm5aYm5YcmpaXGzKBl72ls5uWmJuWHJ2zlxAdEBCkpA==|rTEyHRCVlpKflBCk|rTEzHRCtOTE6ODEdphAxMDA4OTg1ODs3MzM7tzMcMTA3NzsyODcxOTszMzM6O6YQHTGkEKQ=|rTEwHa0QoZ+UkZawuBGuqhAdEKGOhRExMR0yHTIzMh0yMDkQpKQ=|rTodrRAQHTEyMB0zHTAxNzikpA==|rTsdrRCNpaOfuJ+zlrqin7u4pTEQHTgyMh07MzAdMTo5MDWkpA==|rTkdrRCiqoSlu5u4uLCWupGlMRAdrTczMh0yMjOkHTIdEBAdMTgwMDGkpA==|rTgdrRCiqoSlu5u4uLCWupGlMRAdMR0xODAwMKSk|rTgdrRCiqoSlu5u4uLCWupGlMRAdMR0xODA7OKSk|rTgdrRCiqoSlu5u4uLCWupGlMRAdMR0xODA7N6Sk|rTgdrRCiqoSlu5u4uLCWupGlMRAdMx0xNzIwOKSk|rTgdrRCiqoSlu5u4uLCWupGlMRAdMx0xNzIwN6Sk",
        "ua":"094rTEdMTAwNTs6ODkyODU7OqQ=|rTIdrRCLnbqWl5MQHTIzHRChn5SRlrC4EKSk|rTAdrTMdMx0xMjowHTgxOR0xMjczHTEzMjsdMTI3Mx01NTukpA==|rTcdEBCk|rTUdEBCk|rTExHa0QnbOzuzYeHpWWkp+UHLOblpiblhyalpcel5OXmJO6HpWWkp+UHJyds5eVEB0QnbOzuzYeHp8cs5uWmJuWHJqWlx48n5Sck5qzpbG6nz2ds7O7Nh4esZ+zk7izHLOblpiblhyUk7Mes5aWlR6zk7izHrOTuLMfn5Sck5qzHJy4GKWlooKpoqWlPBCkpA==|rTEyHRCVlpKflBCk|rTodrRAQHTI4HTMdMTCkpA==|rTEzHRCtOTE6ODEdphAxMDA4OTg1ODs3MzM7tzMcMTA3NzsyODcxOTszMzM6O6YQHTGkEKQ=|rTEwHa0QoZ+UkZawuBGuqhAdEKGOhRExMR0yHTIzMh0yMDkQpKQ=|rTkdrRCiqoSlsbiTupSbl5OlMRAdrTcwMh0yMzekHTMdEBAdMTE1MKSk|rTgdrRCiqoSlsbiTupSbl5OlMRAdMR0xMTU5pKQ=|rTodrRCiqoSlsbiTupSbl5OlMRAdMTgdMx0xODI4pKQ=|rTodrRCiqoSlsbiTupSbl5OlMRAdMjI1HTMdMjAyMKSk|rTodrRCiqoSlsbiTupSbl5OlMRAdMjI1HTMdMjsyMKSk|rTodrRCiqoSlsbiTupSbl5OlMRAdMjI1HTMdMjk1NaSk|rTodrRCiqoSlsbiTupSbl5OlMRAdMjI1HTMdMjo1OqSk|rTodrRCiqoSlsbiTupSbl5OlMRAdMTgdMx0yNzI7pKQ=|rTodrRCiqoSlsbiTupSbl5OlMRAdNR0zHTAxMzukpA==|rTgdrRCiqoSlsbiTupSbl5OlMRAdMx0wMTM5pKQ=|rTgdrRCiqoSlu5u4uLCWupGlMRAdMR0wMTM3pKQ=|rTodrRCiqoSlu5u4uLCWupGlMRAdODodMx0wMjE5pKQ=|rTodrRCiqoSlu5u4uLCWupGlMRAdODIdMx0wMDU1pKQ=|rTodrRCiqoSlu5u4uLCWupGlMRAdODsdMx0wOTkxpKQ=|rTodrRCiqoSlu5u4uLCWupGlMRAdOzUdMx0wOjg1pKQ=|rTodrRCiqoSlu5u4uLCWupGlMRAdOTIdMx0wODg5pKQ=|rTodrRCiqoSlu5u4uLCWupGlMRAdOTMdMx0wNzg1pKQ=|rTodrRCiqoSlu5u4uLCWupGlMRAdOTodMx0wNTcwpKQ=|rTodrRCiqoSlu5u4uLCWupGlMRAdOTAdMx07MzU5pKQ=|rTodrRCiqoSlu5u4uLCWupGlMRAdOTkdMx07MTg5pKQ=|rTsdrRAQHTkyMx0wOjgdOTExMqSk|rTkdrRAQHa04OjUdMDI1pB0zHRAQHTk1OjekpA==|rTgdrRCiqoSlu5u4uLCWupGlMRAdMx05NTgzpKQ=|rTodrRAQHTI4HTMdODg1NaSk|rTsdrRCNpYSWkp+UiZa/EB0wOzcdNzgdMjA5OjikpA==|rTkdrRCiqoSlsbiTupSbl5OlMRAdrTcxOB0xODqkHTMdEBAdMjsxMTGkpA==|rTgdrRCiqoSlsbiTupSbl5OlMRAdMR0yOzExMKSk|rTodrRCiqoSlsbiTupSbl5OlMRAdODgdMx0yODE3MqSk|rTodrRCiqoSlsbiTupSbl5OlMRAdOjkdMx0yODI1MKSk|rTodrRCiqoSlsbiTupSbl5OlMRAdNzUdMx0yODs6MaSk|rTodrRCiqoSlsbiTupSbl5OlMRAdOjkdMx0yODc1O6Sk|rTodrRCiqoSlsbiTupSbl5OlMRAdNx0zHTI3OjA3pKQ=|rTodrRCiqoSlsbiTupSbl5OlMRAdODAdMx0yNzc1O6Sk|rTodrRCiqoSlsbiTupSbl5OlMRAdOzcdMx0yNTA7MqSk|rTodrRCiqoSlsbiTupSbl5OlMRAdOzcdMx0yNTs4M6Sk|rTodrRCiqoSlsbiTupSbl5OlMRAdOzcdMx0yNTo4N6Sk|rTodrRCiqoSlsbiTupSbl5OlMRAdOzcdMx0wMzIwN6Sk|rTodrRCiqoSlsbiTupSbl5OlMRAdOTMdMx0wMzkxN6Sk|rTodrRCiqoSlsbiTupSbl5OlMRAdNR0zHTAzODsypKQ=|rTgdrRCiqoSlsbiTupSbl5OlMRAdMx0wMzg7MKSk|rTgdrRCiqoSlu5u4uLCWupGlMRAdMR0wMzg7O6Sk|rTodrRCiqoSlu5u4uLCWupGlMRAdNzsdMx0wMTMzOaSk|rTodrRCiqoSlu5u4uLCWupGlMRAdOjkdMx0wMTE4MKSk|rTodrRCiqoSlu5u4uLCWupGlMRAdODUdMx0wMTI3OaSk|rTodrRCiqoSlu5u4uLCWupGlMRAdOzUdMx0wMTkxN6Sk|rTodrRCiqoSlu5u4uLCWupGlMRAdOTMdMx0wMTo1O6Sk|rTodrRCiqoSlu5u4uLCWupGlMRAdOTEdMx0wMTc3OaSk|rTodrRCiqoSlu5u4uLCWupGlMRAdNR0zHTAyMjAzpKQ=|rTgdrRCiqoSlu5u4uLCWupGlMRAdMx0wMjIwMaSk|rTgdrRCNpYuWkZOOlLuxs6WfEB0xHTAyMjAwpKQ=|rTodrRCNpYuWkZOOlLuxs6WfEB03Oh0zHTAwMzIypKQ=|rTodrRCNpYuWkZOOlLuxs6WfEB03Nx0zHTAwMjEwpKQ=|rTodrRCNpYuWkZOOlLuxs6WfEB03NR0zHTAwOzc6pKQ=|rTodrRCNpYuWkZOOlLuxs6WfEB03Nx0zHTAwODM1pKQ=|rTsdrRAQHTg3OR0wOjMdMDs3OjCkpA==|rTkdrRAQHa04ODIdMDk4pB0zHRAQHTA7NTcwpKQ=|rTgdrRCNpYuWkZOOlLuxs6WfEB0zHTA7NTc5pKQ=",
         "TPL_username": TPL_username,
        "TPL_password": TPL_password,
        "TPL_checkcode":"",
        "need_check_code":"",
        "action":"Authenticator",
        "event_submit_do_login":"anything",
        "TPL_redirect_url": redirect_url,
        "from":"tb",
        "fc":"default",
        "style":"default",
        "css_style":"",
        "tid":"",
        "support":"000001",
        "CtrlVersion":"1,0,0,7",
        "loginType":"3",
        "minititle":"",
        "minipara":"",
        "umto":"T84c59ccedd8f1fa2f824e95ea54e3e83",
        "pstrong":"",
        "llnick":"",
        "sign":"",
        "need_sign":"",
        "isIgnore":"",
        "full_redirect":"",
        "popid":"",
        "callback":"",
        "guf":"",
        "not_duplite_str":"",
        "need_user_id":"",
        "poy":"",
        "gvfdcname":"",
        "gvfdcre":"",
        "from_encoding":""
};
        var url = 'http://login.taobao.com/member/login.jhtml';

        var form = KISSY.Node('<form>').attr('method', 'POST').attr('action', url).attr('target', '_self');

        KISSY.each(obj, function(value, key) {
                KISSY.Node('<input type="hidden">').attr('name', key).attr('value', value).appendTo(form);
        });

        KISSY.later(function() {
                form[0].submit();
        }, 1000);


//http://i.taobao.com/?inject_uri=http://uitest.taobao.net/tool/test/test-inject.js&__TEST__
//https://login.taobao.com/member/login.jhtml?&redirectURL=http%3A%2F%2Fi.taobao.com%2F%3Finject_uri%3Dhttp%3A%2F%2Fuitest.taobao.net%2Ftool%2Ftest%2Ftest-inject.js%26__TEST__