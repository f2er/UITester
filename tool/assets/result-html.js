var renderOne = function (result, el) {
    var r = result;
    var msg = "";
    msg += '<div class="browser">' + r.browser + '</div>';
    var passed = "passed";
    if (r.failedSpecs != 0 || (r.errors && r.errors.length)) {
        passed = "fail";
    }
    msg += '<div class="title ' + passed + '-alert"><span>用例总数:' + r.totalSpecs + ' | 失败用例总数:' + r.failedSpecs + ' | 错误数：' + (r.errors && r.errors.length) + '</span></div>';


    if (r.errors && r.errors.length) {
        msg += '<div class="detail jserrors">';

        for (var i = 0; i < r.errors.length; i++) {
            var e = r.errors[i];

            msg += '<div class="suite">' +
                '<span class="suite-title">js错误：' + e.message + '</span>';


            if (e.stack)msg += '<div class="error-stack">' + e.stack + '</div>';
            msg += '</div>';


        }

        msg += '</div>';
    }


    for (var i = 0; i < r.urls.length; i++) {
        var url = r.urls[i];

        if (!url)return;
        msg += '<div class="suite">' +
            '<p class="suite-url">' + url.url + '</p>';

        if (url.errors) {
            for (var j = 0; j < url.errors.length; j++) {
                var e = url.errors[j];
                msg +=
                    '<span class="suite-title">js错误：' + e.message + '</span>'
                if (e.stack)
                    msg += '<div class="error-stack">' + e.stack + '</div>';

            }
        }
        for (var j = 0; j < url.suites.length; j++) {

            var suite = url.suites[j];

            msg += '<span class="suite-title">' + suite.description + '</span>';
            for (var n = 0; n < suite.specs.length; n++) {
                var spec = suite.specs[n];
                var passed = "passed";
                if (spec.failed == true) {
                    passed = "failed";
                }
                msg += '<div class="spec ' + passed + '">';
                msg += '<a class="spec-title" href="#">' + spec.description + '</a>' +
                    '<div class="detail">';
                for (var m = 0; m < spec.results_.length; m++) {

                    var result = spec.results_[m];
                    for (var p = 0; p < result.items_.length; p++) {
                        var item = result.items_[p];
                        msg += '<p>';
                        msg += 'expect ' + item.actual + ' ' + item.matcherName + ' ' + item.expected;
                        msg += "  <em>" + item.passed_ == true ? item.message : "failed" + "</em>";
                        if (item.trace && +item.trace.stack)  msg += '<div class="error-stack">' + item.trace.stack + '</div>'
                        msg += '</p>';
                    }
                }
                msg += "</div>"
                msg += "</div>"

            }
        }


        msg += '</div>'
        msg += '</div>'

    }

    if (el) el.innerHTML = msg;

    return msg;


}

var renderResult = function (result, el) {


    var msg = "";
    for (var b in result) {
        var r = result[b];
        msg += renderOne(r);


    }
    if (el) el.innerHTML = msg;

    return msg;


}