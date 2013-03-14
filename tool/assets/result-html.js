var renderResult = function (result, el) {


    var msg = "";
    for (var b in result) {
        var r = result[b];
        msg += '<div class="browser">' + r.browser + '</div>';
        var passed = "passed";
        if (r.failedSpecs != 0 || (r.errors && r.errors.length)) {
            passed = "failed";
        }
        msg += '<div class="title ' + passed + '"><span>用例总数:' + r.totalSpecs + ' | 失败用例总数:' + r.failedSpecs + ' | 错误数：' + (r.errors && r.errors.length) + '</span></div>';


        if (r.errors && r.errors.length) {
            msg += '<div class="detail jserrors">';


            r.errors.forEach(function (e) {
                msg += '<div class="suite">' +
                    '<span class="suite-title">js错误：' + e.message + '</span>' +
                    '<div class="error-stack">' + e.stack + '</div>' +
                    '</div>';


            })
            msg += '</div>';
        }
        msg += '<div class="detail">';
        for (var i = 0; i < r.urls.length; i++) {
            var url = r.urls[i];
            if (!url)return;
            msg += '<div class="suite">' +
                '<span class="suite-title">' + url.url + '</span>';

            if (url.errors) {
                for (var j = 0; j < url.errors.length; j++) {

                    msg +=
                        '<span class="suite-title">js错误：' + e.message + '</span>' +
                            '<div class="error-stack">' + e.stack + '</div>';
                }
            }
            for (var j = 0; j < urls.suites.length; i++) {

                var suite = url.suites.length;

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

                    spec.results_.forEach(function (result) {
                        result.items_.forEach(function (item) {
                            msg += '<p>';
                            msg += 'expect ' + item.actual + ' ' + item.matcherName + ' ' + item.expected + ' ' + item.passed_ == true ? item.message : "failed";
                            msg += '<div class="error-stack">${item.trace.stack}</div>'
                            msg += '</p>';


                        })

                    })
                    msg += "</div>"
                    msg += "</div>"

                }
            }

            msg += '</div>'
            msg += '</div>'
            msg += '</div>'

        }


    }
    if (el) el.innerHTML = msg;

    return msg;


}
