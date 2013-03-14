var renderResult = function (resultJSON,el) {





        var template =
            '<div class="browser">${browser} ${version}</div>' +

                '<div class="title {{if reports.failedSpecs !== 0|| reports.errors.length !== 0}}fail-alert{{else}}passed-alert{{/if}}"><span>用例总数:${reports.totalSpecs} | 失败用例总数:${reports.failedSpecs}| js错误数：${reports.errors.length}</span></div>' +
                '<div class="detail jserrors">' +
                '{{each(index,error) reports.errors}}' +
                '<div class="suite">' +
                '<span class="suite-title">js错误：${error.message}</span>' +
                '<div class="error-stack">${error.stack}</div>' +
                '</div>'+
                '{{/each}}' +
                '</div>'+
                '<div class="detail">{{each(index,suite) reports.suites}}' +
                '<div class="suite">' +
                '<span class="suite-title">${suite.description}</span>' +
                '{{each(index, spec) suite.specs}}' +
                '<div class="spec {{if spec.failed == true}}failed{{else}}passed{{/if}}">' +
                '<a class="spec-title" href="#">${spec.description}</a>' +
                '<div class="detail">' +
                '{{each(index, result) spec.results_}}' +
                '{{each(index, item) result.items_}}' +
                '<p>' +
                'expect ${item.actual} ${item.matcherName} ' +
                '{{if item.expected !== ""}}${item.expected}{{/if}}' +
                '{{if item.passed_ == true}}' +
                '\t: ${item.message}{{else}}\t: Failed.' +
                '<div class="error-stack">${item.trace.stack}</div>' +
                '{{/if}}' +
                '</p>' +
                '{{/each}}' +
                '{{/each}}' +
                '</div>' +
                '</div>' +
                '{{/each}}' +
                '</div>' +
                '{{/each}}' +
                '</div>';

        return  jQuery.tmpl(template,resultJSON).appendTo(el);


    }

