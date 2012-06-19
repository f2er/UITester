/*
 json2.js
 2011-10-19

 Public Domain.

 NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

 See http://www.JSON.org/js.html


 This code should be minified before deployment.
 See http://javascript.crockford.com/jsmin.html

 USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
 NOT CONTROL.


 This file creates a global JSON object containing two methods: stringify
 and parse.

 JSON.stringify(value, replacer, space)
 value       any JavaScript value, usually an object or array.

 replacer    an optional parameter that determines how object
 values are stringified for objects. It can be a
 function or an array of strings.

 space       an optional parameter that specifies the indentation
 of nested structures. If it is omitted, the text will
 be packed without extra whitespace. If it is a number,
 it will specify the number of spaces to indent at each
 level. If it is a string (such as '\t' or '&nbsp;'),
 it contains the characters used to indent at each level.

 This method produces a JSON text from a JavaScript value.

 When an object value is found, if the object contains a toJSON
 method, its toJSON method will be called and the result will be
 stringified. A toJSON method does not serialize: it returns the
 value represented by the name/value pair that should be serialized,
 or undefined if nothing should be serialized. The toJSON method
 will be passed the key associated with the value, and this will be
 bound to the value

 For example, this would serialize Dates as ISO strings.

 Date.prototype.toJSON = function (key) {
 function f(n) {
 // Format integers to have at least two digits.
 return n < 10 ? '0' + n : n;
 }

 return this.getUTCFullYear()   + '-' +
 f(this.getUTCMonth() + 1) + '-' +
 f(this.getUTCDate())      + 'T' +
 f(this.getUTCHours())     + ':' +
 f(this.getUTCMinutes())   + ':' +
 f(this.getUTCSeconds())   + 'Z';
 };

 You can provide an optional replacer method. It will be passed the
 key and value of each member, with this bound to the containing
 object. The value that is returned from your method will be
 serialized. If your method returns undefined, then the member will
 be excluded from the serialization.

 If the replacer parameter is an array of strings, then it will be
 used to select the members to be serialized. It filters the results
 such that only members with keys listed in the replacer array are
 stringified.

 Values that do not have JSON representations, such as undefined or
 functions, will not be serialized. Such values in objects will be
 dropped; in arrays they will be replaced with null. You can use
 a replacer function to replace those with JSON values.
 JSON.stringify(undefined) returns undefined.

 The optional space parameter produces a stringification of the
 value that is filled with line breaks and indentation to make it
 easier to read.

 If the space parameter is a non-empty string, then that string will
 be used for indentation. If the space parameter is a number, then
 the indentation will be that many spaces.

 Example:

 text = JSON.stringify(['e', {pluribus: 'unum'}]);
 // text is '["e",{"pluribus":"unum"}]'


 text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
 // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

 text = JSON.stringify([new Date()], function (key, value) {
 return this[key] instanceof Date ?
 'Date(' + this[key] + ')' : value;
 });
 // text is '["Date(---current time---)"]'


 JSON.parse(text, reviver)
 This method parses a JSON text to produce an object or array.
 It can throw a SyntaxError exception.

 The optional reviver parameter is a function that can filter and
 transform the results. It receives each of the keys and values,
 and its return value is used instead of the original value.
 If it returns what it received, then the structure is not modified.
 If it returns undefined then the member is deleted.

 Example:

 // Parse the text. Values that look like ISO date strings will
 // be converted to Date objects.

 myData = JSON.parse(text, function (key, value) {
 var a;
 if (typeof value === 'string') {
 a =
 /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
 if (a) {
 return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
 +a[5], +a[6]));
 }
 }
 return value;
 });

 myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
 var d;
 if (typeof value === 'string' &&
 value.slice(0, 5) === 'Date(' &&
 value.slice(-1) === ')') {
 d = new Date(value.slice(5, -1));
 if (d) {
 return d;
 }
 }
 return value;
 });


 This is a reference implementation. You are free to copy, modify, or
 redistribute.
 */

/*jslint evil: true, regexp: true */

/*members "", "\b", "\t", "\n", "\f", "\r", "\"", JSON, "\\", apply,
 call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
 getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
 lastIndex, length, parse, prototype, push, replace, slice, stringify,
 test, toJSON, toString, valueOf
 */


// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

var JSON;
if (!JSON) {
    JSON = {};
}

(function () {
    'use strict';

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function (key) {

            return isFinite(this.valueOf())
                ? this.getUTCFullYear() + '-' +
                f(this.getUTCMonth() + 1) + '-' +
                f(this.getUTCDate()) + 'T' +
                f(this.getUTCHours()) + ':' +
                f(this.getUTCMinutes()) + ':' +
                f(this.getUTCSeconds()) + 'Z'
                : null;
        };

        String.prototype.toJSON =
            Number.prototype.toJSON =
                Boolean.prototype.toJSON = function (key) {
                    return this.valueOf();
                };
    }

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = {    // table of character substitutions
            '\b':'\\b',
            '\t':'\\t',
            '\n':'\\n',
            '\f':'\\f',
            '\r':'\\r',
            '"' :'\\"',
            '\\':'\\\\'
        },
        rep;


    function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c === 'string'
                ? c
                : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + string + '"';
    }


    function str(key, holder) {

// Produce a string from holder[key].

        var i, // The loop counter.
            k, // The member key.
            v, // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

        if (value && typeof value === 'object' &&
            typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

// What happens next depends on the value's type.

        switch (typeof value) {
            case 'string':
                return quote(value);

            case 'number':

// JSON numbers must be finite. Encode non-finite numbers as null.

                return isFinite(value) ? String(value) : 'null';

            case 'boolean':
            case 'null':

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce 'null'. The case is included here in
// the remote chance that this gets fixed someday.

                return String(value);

// If the type is 'object', we might be dealing with an object or an array or
// null.

            case 'object':

// Due to a specification blunder in ECMAScript, typeof null is 'object',
// so watch out for that case.

                if (!value) {
                    return 'null';
                }

// Make an array to hold the partial results of stringifying this object value.

                gap += indent;
                partial = [];

// Is the value an array?

                if (Object.prototype.toString.apply(value) === '[object Array]') {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                    length = value.length;
                    for (i = 0; i < length; i += 1) {
                        partial[i] = str(i, value) || 'null';
                    }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                    v = partial.length === 0
                        ? '[]'
                        : gap
                        ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']'
                        : '[' + partial.join(',') + ']';
                    gap = mind;
                    return v;
                }

// If the replacer is an array, use it to select the members to be stringified.

                if (rep && typeof rep === 'object') {
                    length = rep.length;
                    for (i = 0; i < length; i += 1) {
                        if (typeof rep[i] === 'string') {
                            k = rep[i];
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ': ' : ':') + v);
                            }
                        }
                    }
                } else {

// Otherwise, iterate through all of the keys in the object.

                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ': ' : ':') + v);
                            }
                        }
                    }
                }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

                v = partial.length === 0
                    ? '{}'
                    : gap
                    ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}'
                    : '{' + partial.join(',') + '}';
                gap = mind;
                return v;
        }
    }

// If the JSON object does not yet have a stringify method, give it one.

    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

            var i;
            gap = '';
            indent = '';

// If the space parameter is a number, make an indent string containing that
// many spaces.

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }

// If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === 'string') {
                indent = space;
            }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                (typeof replacer !== 'object' ||
                    typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }

// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.

            return str('', {'':value});
        };
    }


// If the JSON object does not yet have a parse method, give it one.

    if (typeof JSON.parse !== 'function') {
        JSON.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with '()' and 'new'
// because they can cause invocation, and '=' because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
// replace all simple value tokens with ']' characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or ']' or
// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

            if (/^[\],:{}\s]*$/
                .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
                .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

                j = eval('(' + text + ')');

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

                return typeof reviver === 'function'
                    ? walk({'':j}, '')
                    : j;
            }

// If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError('JSON.parse');
        };
    }
}());
(function () {
    //重置setTimeout,setInterval
    // ajax等异步方法


    var buildUrl = function () {

        var args = Array.prototype.slice.call(arguments);

        if (args.length < 2) {
            return args[0] || '';
        }

        var uri = args.shift();

        uri = uri.split("#")[0];
        var hash = uri.split("#")[1];
        if (hash) {
            hash = "#" + hash;
        }
        else hash = ""

        uri += uri.indexOf('?') > 0 ? '&' : '?';

        return uri + args.join('&').replace(/&+/g, '&') + hash;

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
    uitest.jsonPath = function (obj, expr, arg) {
        var P = {
            resultType:arg && arg.resultType || "VALUE",
            result    :[],
            normalize :function (expr) {
                var subx = [];
                return expr.replace(/[\['](\??\(.*?\))[\]']/g, function ($0, $1) {
                    return "[#" + (subx.push($1) - 1) + "]";
                })
                    .replace(/'?\.'?|\['?/g, ";")
                    .replace(/;;;|;;/g, ";..;")
                    .replace(/;$|'?\]|'$/g, "")
                    .replace(/#([0-9]+)/g, function ($0, $1) {
                        return subx[$1];
                    });
            },
            asPath    :function (path) {
                var x = path.split(";"), p = "$";
                for (var i = 1, n = x.length; i < n; i++)
                    p += /^[0-9*]+$/.test(x[i]) ? ("[" + x[i] + "]") : ("['" + x[i] + "']");
                return p;
            },
            store     :function (p, v) {
                if (p) P.result[P.result.length] = P.resultType == "PATH" ? P.asPath(p) : v;
                return !!p;
            },
            trace     :function (expr, val, path) {
                if (expr) {
                    var x = expr.split(";"), loc = x.shift();
                    x = x.join(";");
                    if (val && val.hasOwnProperty(loc))
                        P.trace(x, val[loc], path + ";" + loc);
                    else if (loc === "*")
                        P.walk(loc, x, val, path, function (m, l, x, v, p) {
                            P.trace(m + ";" + x, v, p);
                        });
                    else if (loc === "..") {
                        P.trace(x, val, path);
                        P.walk(loc, x, val, path, function (m, l, x, v, p) {
                            typeof v[m] === "object" && P.trace("..;" + x, v[m], p + ";" + m);
                        });
                    }
                    else if (/,/.test(loc)) { // [name1,name2,...]
                        for (var s = loc.split(/'?,'?/), i = 0, n = s.length; i < n; i++)
                            P.trace(s[i] + ";" + x, val, path);
                    }
                    else if (/^\(.*?\)$/.test(loc)) // [(expr)]
                        P.trace(P.eval(loc, val, path.substr(path.lastIndexOf(";") + 1)) + ";" + x, val, path);
                    else if (/^\?\(.*?\)$/.test(loc)) // [?(expr)]
                        P.walk(loc, x, val, path, function (m, l, x, v, p) {
                            if (P.eval(l.replace(/^\?\((.*?)\)$/, "$1"), v[m], m)) P.trace(m + ";" + x, v, p);
                        });
                    else if (/^(-?[0-9]*):(-?[0-9]*):?([0-9]*)$/.test(loc)) // [start:end:step]  phyton slice syntax
                        P.slice(loc, x, val, path);
                }
                else
                    P.store(path, val);
            },
            walk      :function (loc, expr, val, path, f) {
                if (val instanceof Array) {
                    for (var i = 0, n = val.length; i < n; i++)
                        if (i in val)
                            f(i, loc, expr, val, path);
                }
                else if (typeof val === "object") {
                    for (var m in val)
                        if (val.hasOwnProperty(m))
                            f(m, loc, expr, val, path);
                }
            },
            slice     :function (loc, expr, val, path) {
                if (val instanceof Array) {
                    var len = val.length, start = 0, end = len, step = 1;
                    loc.replace(/^(-?[0-9]*):(-?[0-9]*):?(-?[0-9]*)$/g, function ($0, $1, $2, $3) {
                        start = parseInt($1 || start);
                        end = parseInt($2 || end);
                        step = parseInt($3 || step);
                    });
                    start = (start < 0) ? Math.max(0, start + len) : Math.min(len, start);
                    end = (end < 0) ? Math.max(0, end + len) : Math.min(len, end);
                    for (var i = start; i < end; i += step)
                        P.trace(i + ";" + expr, val, path);
                }
            },
            eval      :function (x, _v, _vname) {
                try {
                    return $ && _v && eval(x.replace(/@/g, "_v"));
                }
                catch (e) {
                    throw new SyntaxError("jsonPath: " + e.message + ": " + x.replace(/@/g, "_v").replace(/\^/g, "_a"));
                }
            }
        };

        var $ = obj;
        if (expr && obj && (P.resultType == "VALUE" || P.resultType == "PATH")) {
            P.trace(P.normalize(expr).replace(/^\$;/, ""), obj, "$");
            return P.result.length ? P.result : false;
        }
    }

    uitest.configs = {
        showSelectMark:false,
        caseType      :"null",
        events        :{
            // mouse events supported
            click     :1,
            dblclick  :1,
            mouseover :1,
            mouseout  :1,
            mouseenter:1,
            mouseleave:1,
            mousedown :1,
            mouseup   :1,
            mousemove :1,
            //key events supported
            keydown   :1,
            keyup     :1,
            keypress  :1,
            /// HTML events supported
            blur      :1,
            change    :1,
            focus     :1,
            resize    :1,
            scroll    :1,
            select    :1


        },
        tags          :{
            all:{value:1, label:"所有标签"},
            a  :{value:1, label:"a"}
        },
        position      :{
            offset     :{
                value :0,
                select:[0, 0.1, 0.2, 0.5]
            },
            relatedNode:"html"
        },
        attrs         :{
            "globalAttributes":{
                accesskey       :1,
                class           :1,
                contenteditable :1,
                contextmenu     :1,
                dir             :1,
                draggable       :1,
                dropzone        :1,
                hidden          :1,
                id              :1,
                inert           :1,
                itemid          :1,
                itemprop        :1,
                itemref         :1,
                itemscope       :1,
                itemtype        :1,
                lang            :1,
                spellcheck      :1,
                style           :1,
                tabindex        :1,
                title           :1,
                translate       :1,
                customAttributes:1


            },
            "eventAttributes" :{
                onabort         :1,
                onblur          :1,
                oncancel        :1,
                oncanplay       :1,
                oncanplaythrough:1,
                onchange        :1,
                onclick         :1,
                onclose         :1,
                oncontextmenu   :1,
                oncuechange     :1,
                ondblclick      :1,
                ondrag          :1,
                ondragend       :1,
                ondragenter     :1,
                ondragleave     :1,
                ondragover      :1,
                ondragstart     :1,
                ondrop          :1,
                ondurationchange:1,
                onemptied       :1,
                onended         :1,
                onerror         :1,
                onfocus         :1,
                oninput         :1,
                oninvalid       :1,
                onkeydown       :1,
                onkeypress      :1,
                onkeyup         :1,
                onload          :1,
                onloadeddata    :1,
                onloadedmetadata:1,
                onloadstart     :1,
                onmousedown     :1,
                onmousemove     :1,
                onmouseout      :1,
                onmouseover     :1,
                onmouseup       :1,
                onmousewheel    :1,
                onpause         :1,
                onplay          :1,
                onplaying       :1,
                onprogress      :1,
                onratechange    :1,
                onreset         :1,
                onscroll        :1,
                onseeked        :1,
                onseeking       :1,
                onselect        :1,
                onshow          :1,
                onstalled       :1,
                onsubmit        :1,
                onsuspend       :1,
                ontimeupdate    :1,
                onvolumechange  :1,
                onwaiting       :1

            },

            a       :{
                href    :1,
                target  :1,
                download:1,
                ping    :1,
                rel     :1,
                media   :1,
                hreflang:1,
                type    :1
            },
            link    :{
                href    :1,
                rel     :1,
                media   :1,
                hreflang:1,
                type    :1,
                sizes   :1
            },
            img     :{
                alt        :1,
                src        :1,
                srcset     :1,
                crossorigin:1,
                usemap     :1,
                ismap      :1,
                width      :1,
                height     :1
            },
            script  :{
                src    :1,
                async  :1,
                defer  :1,
                type   :1,
                charset:1
            },
            input   :{
                accept        :1,
                alt           :1,
                autocomplete  :1,
                autofocus     :1,
                checked       :1,
                dirname       :1,
                disabled      :1,
                form          :1,
                formaction    :1,
                formenctype   :1,
                formmethod    :1,
                formnovalidate:1,
                formtarget    :1,
                height        :1,
                list          :1,
                max           :1,
                maxlength     :1,
                min           :1,
                multiple      :1,
                name          :1,
                pattern       :1,
                placeholder   :1,
                readonly      :1,
                required      :1,
                size          :1,
                src           :1,
                step          :1,
                type          :1,
                value         :1,
                width         :1
            },
            textarea:{
                autofocus  :1,
                cols       :1,
                dirname    :1,
                disabled   :1,
                form       :1,
                maxlength  :1,
                name       :1,
                placeholder:1,
                readonly   :1,
                required   :1,
                rows       :1,
                wrap       :1
            },
            select  :{
                autofocus:1,
                disabled :1,
                form     :1,
                multiple :1,
                name     :1,
                required :1,
                size     :1
            },
            options :{
                disabled:1,
                label   :1,
                selected:1,
                value   :1

            }

        }
    }
    uitest.synConfigs = function () {
        uitest.outter.innerCall("setAllConfigs", [uitest.configs])

    }

    uitest.outter = {
        init               :function () {
            var host = this;
            this.codeEditor();
            this.initPage();
            this.observeCall();
            this.layout();
            this.initTabs();
            this.caseTypeEvent();
            this.tagsConfigsView();
            this.positionConfigsView();
            //this.centerConfigsView();
            //this.styleConfigsView();
            this.innerHTMLConfigsView();
            //this.subTreeConfigsView();
            this.attrConfigsView();
            this.eventConfigsView();
            this.runTestCaseEvent()
            this.createEventTest();
            this.showSelectMarkEvent();
            // this.initForm();
        },
        uatest:function(){

        },
        showSelectMarkEvent:function () {
            $("#show-select-mark").click(function () {
                if (!uitest.configs.showSelectMark) {
                    $("#show-select-mark").css("color", "red")
                    uitest.configs.showSelectMark = true;

                }
                else {
                    $("#show-select-mark").css("color", "")
                    uitest.configs.showSelectMark = false;
                }

                uitest.synConfigs();
            })

        },
        showMouseoverPanel :function (selector, width, height, left, top) {
            console.log("123")
            if (!this.mouseoverPanel) {
                this.mouseoverPanel = $('<div class="mouseover-panel"></div>').get(0);
                $("#test-page").get(0).appendChild(this.mouseoverPanel);
            }
            this.mouseoverPanel.innerHTML = '<div class="selector">' + selector + '</div>';
            this.mouseoverPanel.style.position = "absolute";
            this.mouseoverPanel.style.width = width + "px";
            this.mouseoverPanel.style.height = height + "px";
            this.mouseoverPanel.style.left = left + "px";
            this.mouseoverPanel.style.top = top + "px";

        },

        initPage:function () {
            var host = this;

            // http://uitest.taobao.net/UITester/tool/query.php?task_id=7

            var build = function (baseUrl, username, password) {
                var result = buildUrl(task_target_url_el.value, "inject-type=record&__TEST__");

                if (username && password) {
                    result = buildUrl(result, "username=" + username + "&password=" + password)
                }
                console.log(result)
                return result;
            }

            var idEl = $("#task_id")[0];
            var nameEl = $("#task_name")[0];
            var task_target_url_el = $("#task_target_uri")[0];
            var iframe = $("#iframe-target")[0];
            var usernameEl = $("#username")[0];
            var passwordEl = $("#password")[0];

            var id = unparam(location.search.slice(1)).id;

            if (id) {

                $.getJSON("http://uitest.taobao.net/tool/query.php?t=" + new Date().getTime(),
                    {task_id:id},

                    function (result) {
                        idEl.value = result.id;
                        usernameEl.value = result.username;
                        passwordEl.value = result.password
                        nameEl.value = result.task_name;
                        task_target_url_el.value = result.task_target_uri;
                        host.innerCall("setBeforeunloadWarning")

                        iframe.src = build(task_target_url_el.value, usernameEl.value, passwordEl.value);
                        console.log(iframe.src)
                        $.ajax({
                            url     :buildUrl(result.task_inject_uri, "t=" + new Date().getTime()),
                            dataType:"text",
                            success :function (txt) {
                                console.log(txt);
                                host.textEditor.textModel.setText(null, txt)
                            }
                        })


                    })

            }


            var host = this;
            $(".show-login").click(function () {
                var t = $(".login-info")[0];

                if (t.style.display === "none") {
                    t.style.display = "inline"
                }
                else {
                    t.style.display = "none"
                }
            })

            $("#save-test").on("click", function () {
                host.innerCall("setBeforeunloadWarning")
                $("#task_script")[0].value = host.textEditor.textModel.text;
                $('#save-form')[0].submit();
            })

            $("#reload").on("click", function () {
                host.innerCall("setBeforeunloadWarning")
                $(iframe).unbind("load");
                iframe.src = build(task_target_url_el.value, usernameEl.value, passwordEl.value);
            })


            $(iframe).on("load", function () {
                uitest.synConfigs();
            })


        },

        initTabs            :function () {
            this.codeTabs = new KISSY.Tabs('.tabs', {
                // aria:false 默认 true，支持 aria
                switchTo   :0,
                triggerType:"click"
            });
        },
        showResult          :function (result) {
            this.codeTabs.switchTo(1);
            var div = this.codeTabs.panels[1];

            var jsonReporter = new jasmine.JsonReporter;

            KISSY.use("template", function (S, Template) {
                div.innerHTML = "<div class='result-report'>" + jsonReporter.renderHTML(result);
                +"</div>"
            });


        },
        runTestCaseEvent    :function () {
            var host = this;
            var run = false;

            $(".run-test").on("click", function (e) {
                run = true;
                host.innerCall("setBeforeunloadWarning")
                var iframe = $("#iframe-target")[0];

                $(iframe).on("load", function () {
                    if (run) {
                        run = false;
                        window.setTimeout(function () {
                            host.innerCall("runTestCase", [host.textEditor.textModel.text])
                        }, 2000)
                    }

                })
                iframe.src = iframe.src;
            })
        },
        showCreateBtn       :function () {
            if (!this.actionMask) {
                this.actionMask = $('<div class="action-mask"></div>')[0];
                $("#test-page")[0].appendChild(this.actionMask)
            }
            this.actionMask.style.display = "block";
            $(".has-test-case")[0].style.display = "inline-block"
        },
        hideCreateBtn       :function () {
            $(".has-test-case")[0].style.display = "none"
            this.actionMask.style.display = "none";
        },
        createEventTest     :function () {
            var host = this;
            $(".create-test").on("click", function () {
                host.innerCall("createEventTypeTestCase")
            })
            $(".cancel-test").on("click", function () {
                host.innerCall("removeEventTypeTestCase")
            })
        },
        eventConfigsView    :function () {
            var host = this;
            var configs = $(".configs")[0];
            var html = '<li class="cfg-item hide"><h3 class="tag" title="通过监听事件引起的ui变化，来测试交互响应是不否正常" data-type="event">事件<a class="status">记录</a></h3><ul>';

            for (var p in uitest.configs.events) {
                var checked = "checked";
                if (!uitest.configs.events[p]) {
                    checked = ""
                }

                html += ' <li><label><input value="' + p + '"  type="checkbox" ' + checked + ' />' + p + '</label></li>'
            }
            html += '</ul></li>';
            var e = $(html)[0];

            configs.appendChild(e);
            var inputs = $("input", e);
            inputs.each(function (input) {
                $(input).on("change", function (e) {
                        var t = e.target;
                        if (t.checked) {
                            uitest.configs.events[t.value] = 1
                            host.innerCall("supportConfig", ["events", t.value, 1])
                        }
                        else {
                            uitest.configs.events[t.value] = 0
                            host.innerCall("supportConfig", ["events", t.value, 0]);
                        }


                    }
                )

            })


        },
        tagsConfigsView     :function () {
            var host = this;
            var configs = document.querySelector(".configs");
            var tools = document.querySelector(".change-tools");
            var html = '<li class="cfg-item hide"><h3 class="event" title="通过测试标签是否存在，来测试页面布局是否完整" data-type="tags">标签</h3></li>';


            var e = $(html)[0];
            configs.appendChild(e);
            /*
             var configHtml = '<li id="configs-tags" style="display:none"><label>标签：<select>'
             //  configHtml += '<optgroup label="242">'
             for (var p in uitest.configs.tags) {
             configHtml += '<option value="'+p+'">'+uitest.configs.tags[p].label+'</option>'
             }
             // configHtml += '</optgroup>'
             configHtml += '</select></label></li>';

             tools.appendChild($(configHtml)[0])


             */


        },
        positionConfigsView :function () {
            var host = this;
            var configs = $(".configs")[0];
            var tools = document.querySelector(".change-tools");
            var html = '<li class="cfg-item hide"><h3 class="" title="通过测试标签位置，来测试页面布局位置是否正常" data-type="position">位置<a class="status">记录</a></h3></li>';

            var e = $(html)[0];

            configs.appendChild(e);
            //offset

            var offsetHTML = '<li style="display:none" id="configs-position">' +
                '<label>偏移量：<select>' +
                '{{#each offset.select as value index}}' +
                '<option value="{{value}}">{{value}}</option>' +
                '{{/each}}' +
                '</select></label>' +
                '<laber>相对于：<input id="related-node" type="text"  value="{{relatedNode}}"/><a href="#" id="select-related-node">选择</a></laber>' +
                '' +
                '</li>'


            offsetHTML = KISSY.Template(offsetHTML).render(uitest.configs.position);

            console.log(offsetHTML)


            var tag = $(offsetHTML)[0];

            tools.appendChild(tag);
            $("select", tag).change(function (e) {
                uitest.configs.position.offset.value = $("select", tag).val();

                host.innerCall("setAllConfigs", [uitest.configs])

            })


            $("#select-related-node").click(function () {
                uitest.configs.caseType = "select-related-node";
                $("#select-related-node").css("color", "red");

                uitest.synConfigs()


            })


        },
        setSelectRelatedNode:function (selector) {
            uitest.configs.position.relatedNode = selector;
            $("#related-node").val(selector);
            $("#select-related-node").css("color", "");

            //  uitest.synConfigs()

        },

        centerConfigsView   :function () {


        },
        styleConfigsView    :function () {


        },
        innerHTMLConfigsView:function () {
            var host = this;
            var configs = $(".configs")[0];
            var tools = document.querySelector(".change-tools");
            var html = '<li class="cfg-item hide"><h3 class="" title="能过测试标签的innerHTML或者value属性，来测试页面内容是否正确" data-type="innerhtml">内容<a class="status">记录</a></h3></li>';

            var e = $(html)[0];

            configs.appendChild(e);

        },
        subTreeConfigsView  :function () {

        },
        attrConfigsView     :function () {
            var host = this;
            var configs = $(".configs")[0];
            var html = '<li class="cfg-item hide"><h3 class="event" title="标签属性测试" data-type="attr">属性<a class="status">记录</a></h3><ul>' +
                '{{#each attrs as bValue bKey}}' +
                '<li class="{{bKey}}"><label><input   type="checkbox" checked /> {{bKey}}</label><ul>' +
                '{{#each bValue as value key}}' +
                '<li class="attr {{key}}"><label><input value="{{value}}" name="uitest.configs.{{bKey}}.{{key}}" type="checkbox" checked/>{{key}}</label></li>' +
                '{{/each}}' +
                '</ul>' +
                '{{/each}}' +
                '</ul></li>';

            KISSY.use("template", function (S, Template) {
                html = Template(html).render(uitest.configs);
                var e = $(html)[0];

                configs.appendChild(e);

            });


        },
        caseTypeEvent       :function () {
            var host = this;
            $(".configs").on("click", function (e) {

                var target = e.target;
                if (e.target.tagName.toLowerCase() !== "h3")   return;


                if ($(target).hasClass("active")) {

                    host.innerCall("setConfig", ["caseType", "null"])
                    $(target).removeClass("active");
                    return;
                }
                else {
                    var all = $("h3", ".configs");
                    for (var i = 0; i < all.length; i++) {
                        $(all[i]).removeClass("active");
                    }

                    $(target).addClass('active');
                    caseTest = $(target).attr("data-type");


                    uitest.configs.caseType = caseTest;
                    host.showConfigs(caseTest);
                    host.innerCall("setAllConfigs", [ uitest.configs])

                }

            })

            $(".configs").delegate("click", ".status", function (e) {
                e.halt();
                var target = $(e.target).parent("li")
                $(target).toggleClass("hide")


            })

        },
        showConfigs         :function (type) {
            var changeConfig = $(".change-tools li");
            changeConfig.hide();
            $("#configs-" + type).show();


        },

        layout:function () {
            KISSY.use("node, button, resizable", function (S, Node, Button, Resizable) {
                var r = new Resizable({
                    node    :".page",
                    // 指定可拖动的位置
                    handlers:["b"]


                });
                var r = new Resizable({
                    node    :".sub",
                    // 指定可拖动的位置
                    handlers:["r"]


                });


            });
        },

        codeEditor    :function () {
            var editor = document.getElementById("test-case");
            var source = "";
            var textModel = new WebInspector.TextEditorModel();
            var textEditor = new WebInspector.TextViewer(textModel);
            editor.appendChild(textEditor.element)
            textEditor.readOnly = false;
            textEditor.mimeType = "text/javascript";
            textModel.setText(null, source);
            this.textEditor = textEditor

        },
        appendCaseCode:function (src) {
            this.codeTabs.switchTo(0);

            this.textEditor.textModel.appendText(src)
            var lines = $(".webkit-line-content");
            var lastLines = lines[lines.length - 1];
            lastLines.scrollIntoView()

        },
        synConfigs    :function () {

        },
        observeCall   :function () {
            var host = this;
            postmsg.bind(function (data) {

                if (data.funName && data.args) {
                    host[data.funName] && host[data.funName].apply(host, data.args)

                }
            })
        },
        innerCall     :function (funName, args) {
            args = args || [];
            console.log("innerCall", funName, args)
            postmsg.send({
                target:$("#iframe-target")[0].contentWindow,
                data  :{funName:funName, args:args}
            })
        },
        setAllConfigs :function (configs) {
            uitest.configs = configs;

        }



    }

    uitest.inner = {
        init:function () {

            var host = this;
            this.initProxy();
            this.observeCall();
            this.selectorChangeEvent();
            this.beforeunloadWarning = true;
            window.onbeforeunload = function () {
                if (host.beforeunloadWarning) {
                    return '';
                }
                else {
                    host.beforeunloadWarning = true;
                }
            }
            this.initMouseoverPanel();


        },

        setBeforeunloadWarning:function () {
            this.beforeunloadWarning = false;
        },
        initProxy             :function () {
            var host = this;
            var realAdd = window.Node.prototype.addEventListener;
            window.Node.prototype.addEventListener = function () {
                if (arguments[3]) {
                    realAdd.apply(this, arguments)
                }
                else {
                    this._bindEventType = this._bindEventType || {};
                    this._bindEventType[arguments[0]] = 1;

                    console.log(this, this._elToSelector)
                    realAdd.apply(this, arguments)
                }

            };
            var removeChild = window.Node.prototype.removeChild;
            window.Node.prototype.removeChild = function (el) {
                console.log("remove", el)
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
                $(document).on("click", function (e) {
                    var target = e.target;
                    if (uitest.configs.caseType && (uitest.configs.caseType !== "null")) {
                        if (target.tagName.toLowerCase() == "a" || $(target).parent("a")[0]) {

                            if (!/^#/.test(target.href)) {
                                console.log("preventDefault")
                                e.preventDefault()
                            }
                            ;
                        }

                    }


                    // e.halt();

                })
            })


        },
        initMouseoverPanel    :function () {
            var host = this;
            window.setTimeout(function () {
                $(document).on("mouseover", function (e) {
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


                })

                $(document).on("mouseleave", function (e) {
                    console.log(345)

                    host.outterCall("showMouseoverPanel", [
                        "",
                        0,
                        0,
                        -999,
                        -999
                    ]
                    )


                })
            }, 10)
        },

        createEventTestCase:function () {

        },
        runTestCase        :function (src) {
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
                    console.log(json)
                    host.outterCall("showResult", [json]);
                });

                jasmineEnv.addReporter(htmlReporter);


                jasmineEnv.execute();


            })();


        },
        setConfig          :function (key, value) {
            uitest.configs[key] = value;
        },
        supportConfig      :function (name, key, value) {
            console.log(arguments)
            uitest.configs[name][key] = value;
            console.log(uitest.configs[name][key])
        },
        setAllConfigs      :function (configs) {
            uitest.configs = configs;
            console.log(uitest.configs)
        },
        _getHasClassParent :function (node) {
            var parent = el.parentNode;

        },

        elToSelector              :function (el) {
            if (!el)return;
            var selector = "";
            if (el == document) {
                return "html"
            }
            if (el.tagName.toLowerCase() === "body") {
                return "body"
            }
            if (el.tagName.toLowerCase() === "html") {
                return "html"
            }
            if (el.tagName.toLowerCase() === "head") {
                return "head"
            }

            if (el.id && !/\d/.test(el.id) && el._break !== "id") {
                selector += "#" + el.id;
                return selector;
            }
            if (el.className && !/\d/.test(el.className) && el._break !== "class") {

                selector = "." + el.classList[0];

            }
            else {
                selector = el.tagName.toLowerCase();
            }

            //可能已经被删除
            if (!el.parentNode) {

                return el._elToSelector || selector;
            }


            var old;
            var p = el;

            while (true) {
                p = p.parentNode;
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
                old = el.parentNode;
                var c = $(selector, old);
                for (var i = 0; i < c.length; i++) {
                    if (c[i] == el) {
                        break;
                    }
                }

                selector = this.elToSelector(old) + " " + selector + ":nth-of-type(" + (i + 1) + ")";

            }

            else {
                if (old.tagName.toLowerCase() == "body") {
                    selector = selector
                }
                else {
                    selector = this.elToSelector(old) + " " + selector;

                }
            }


            return selector;


        },
        elToSelectorRelativeParent:function (el) {
            if (!el)return;
            var selector = "";
            if (el.tagName.toLowerCase() === "body") {
                return "body"
            }
            if (el.tagName.toLowerCase() === "html") {
                return "html"
            }
            if (el.tagName.toLowerCase() === "head") {
                return "head"
            }

            if (el.id && !/\d/.test(el.id) && el._break !== "id") {
                selector += "#" + el.id;
                return selector;
            }
            if (el.className && !/\d/.test(el.className) && el._break !== "class") {

                selector = "." + el.classList[0];

            }
            else {
                selector = el.tagName.toLowerCase();
            }

            return selector;


        },
        selectorChangeEvent       :function () {
            var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;


            var observer = new MutationObserver(function (mutations) {


                uitest.inner.hasSelectorChange(mutations);


            });

            observer.observe(document, {
                attributes:true,


                subtree:true

            });

        },

        hasSelectorChange:function (mutations) {
            for (var i = 0; i < mutations.length; i++) {

                if (mutations[i].type == "attributes" || mutations[i].attributeName === "id" || mutations[i].attributeName === "class") {


                    mutations[i].target._break = mutations[i].attributeName;
                }
            }

        },
        synOutterConfigs :function () {
            this.outterCall("setAllConfigs", [uitest.configs])
        },
        observeCall      :function () {
            var host = this;

            postmsg.bind(function (data) {


                if (data.funName && data.args) {
                    host[data.funName] && host[data.funName].apply(host, data.args)

                }
            })
        },
        outterCall       :function (funName, args) {

            args = args || [];
            postmsg.send({
                target:parent,
                data  :{funName:funName, args:args}
            })
        }
    }


})();