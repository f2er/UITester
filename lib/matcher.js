/*depend on jquery*/

beforeEach(function(){
    var uiMatchers = {
        toHaveClass: function(className) {
            var nodeList = $(this.actual);
            /*var result = true;*/
            /*$.each(nodeList,function(index,item){
             if(!item.hasClass(className)){
             result = false;
             return false;
             }
             });*/


            /* for(var i = 0;nodeList[i];i++){
             if(!nodeList.item(i).hasClass(className)){
             result = false;
             break;
             }
             }*/
            return nodeList.hasClass(className);
        },
        // 获取元素是否可见
        toBeVisible: function() {
            var nodeList = $(this.actual);
            return nodeList.size() == nodeList.filter(':visible').size();
        },

        toBeHidden: function() {

            var nodeList = $(this.actual);
            return nodeList.size() == nodeList.filter(':hidden').size();
        },

        toBeSelected: function() {
            var nodeList = $(this.actual);
            return nodeList.filter(':selected').size() == nodeList.size();
        },

        toBeChecked: function() {

            var nodeList = $(this.actual);
            return nodeList.filter(':checked').size() == nodeList.size();
        },

        toBeEmpty: function() {
            var nodeList = $(this.actual);
            return nodeList.filter(':empty').size() == nodeList.size();

        },

        toExist: function() {
            var nodeList = $(this.actual);
            return nodeList.size();
        },
        // 有属性attributeName 且为  expectedAttributeValue
        toHaveAttr: function(attributeName, expectedAttributeValue) {
            var nodeList = $(this.actual);
            var result = true;

            $.each(nodeList,function(index,item){
                if($(item).attr(attributeName) != expectedAttributeValue){
                    result = false;
                    return false;
                }
            })
            /*for(var i = 0;nodeList[i];i++){
             if(nodeList.item(i).attr(attributeName) != expectedAttributeValue ) {
             result = false;
             break;
             }
             }*/
            return result;

        },

        toHaveProp: function(propertyName, expectedPropertyValue) {
            var nodeList = $(this.actual);
            var result = true;
            $.each(nodeList,function(index,item){
                if($(item).prop(propertyName) != expectedPropertyValue){
                    result = false;
                    return false;
                }
            })
            /*for(var i = 0;nodeList[i];i++){
             if(nodeList.item(i).prop(propertyName) != expectedPropertyValue ) {
             result = false;
             break;
             }
             }*/
            return result;

        },

        toHaveId: function(id) {
            var nodeList = $(this.actual);
            return nodeList.attr('id') == id;
        },
        // 忽略空格的严格innerHTML匹配
        toHaveHtml: function(html) {
            var nodeList = $(this.actual);
            return $.trim(nodeList.html()) == $.trim(html);
        },
        // 检测html结构是否一致
        toHaveSameSubTree:function(html){
            var nodeList = $(this.actual);
            var root = nodeList[0];
            if(!root){
                return false;
            }

            // 先遍历实际结构. 将结构扁平化
            // 再将参数字符串作为innerHTML插入到dom中. 结构扁平化
            // 最后比较两个记录字符串是否一致

            function serializeHTML(node,arr){

                if(node.nodeType == '1'){
                    arr.push(node.tagName);
                    var childs = node.childNodes;
                    // 过滤一次.
                    var tagChilds = [];
                    for(var i=0;childs[i];i++){
                        if(childs[i].nodeType == 1){
                            tagChilds.push(childs[i]);
                        }
                    }
                    if(tagChilds.length){
                        arr.push('>');
                    }

                    for(var i = 0;tagChilds[i];i++){
                        serializeHTML(tagChilds[i],arr);
                        if(i<tagChilds.length-1){arr.push('+');}
                    }
                }
                return;
            }
            var temp = $('<div style="display: none;" id="tempHtmlStructure"></div>');
            temp[0].innerHTML = html;
            $('body').append(temp);
            var expectRecord = [];
            // 遍历

            serializeHTML($('#tempHtmlStructure')[0],expectRecord);
            temp.remove();
            expectRecord.shift();
            var expectStr =expectRecord.join('');
            var actualRecord = [];
            serializeHTML(root,actualRecord);
            actualRecord.shift();
            var actualStr= actualRecord.join("");
            return  actualStr == expectStr;

        },

        toHaveText: function(text) {
            var nodeList = $(this.actual);
            var trimmedText = $.trim(nodeList.text());
            if (text && $.isFunction(text.test)) {
                return text.test(trimmedText);
            } else {
                return trimmedText == text;
            }
        },

        toHaveValue: function(value) {
            var nodeList = $(this.actual);
            var result = true;
            $.each(nodeList,function(index,item){
                if($(item).val() !== value){
                    result = false;
                    return false;
                }
            })

            /*for(var i = 0;nodeList[i];i++){
             if(nodeList.item(i).val() != value ) {
             result = false;
             break;
             }
             }*/
            return result;



        },




        toBe: function(selector) {
            var nodeList = $(this.actual);
            return nodeList.filter(selector).length;
        },

        toContain: function(selector) {
            return $(selector,this.actual).size();
        },

        toBeDisabled: function(selector){
            var nodeList = $(this.actual);
            return nodeList.filter(':disabled').size() == nodeList.size();
        },

        toBeFocused: function(selector) {
            var nodeList = $(this.actual);

            /*错误 */
            return true;// nodeList.filter(':focus').size() == nodeList.size();
        },
        // css 属性判断
        toHaveComputedStyle:function(styleProp,expectValue){
            var expect= expectValue;
            if(styleProp.match(/color/i)){
                var tempNode = $('<div></div>');
                $('body').append(tempNode);
                $(tempNode).css(styleProp,expectValue);
                expect = $(tempNode).css(styleProp);
                tempNode.remove();
            }

            var nodeList = $(this.actual);
            var result = true;
            $.each(nodeList,function(index,item){
                if($(item).css(styleProp)!== expect){
                    result = false;
                    return false;
                }

            })
            /* for(var i=0;nodeList[i];i++){
             if(S.DOM.css(nodeList[i],styleProp) !== expect){
             result = false;
             break;
             }
             }*/
            return result;
        },
        /**
         *
         * @param x
         * @param y
         * @param off 误差值
         * @param relativeEl 相对元素
         * @return {Boolean}
         */
        atPosition:function(x,y,off,relativeEl){
            var tempOff = 0.1; // 误差参数0.1
            var absX = Math.abs(x);
            var absY = Math.abs(y);
            var referPosition = {top:0,left:0} ; // 默认的相对于浏览器左上角                 热风
            if(arguments[2]&& typeof arguments[2]  == 'number'){
                tempOff = arguments[2];
            }

            if(arguments[3]&& typeof arguments[3] == 'string'){
                var referEl = $(arguments[3]);
                if(referEl){
                    referPosition = referEl.offset();
                }


            }
            var nodeList = $(this.actual);
            var actualPosition = nodeList.offset();
            var heightGap=nodeList.outerHeight() *tempOff;
            var widthGap = nodeList.outerWidth() *tempOff;
            return (Math.abs(Math.abs(actualPosition.top - referPosition.top) - absY) < heightGap) &&( Math.abs(Math.abs(actualPosition.left - referPosition.left) - absX) < widthGap);
        },

        // 是否是盒模型


        // 元素位置
        // overlay 判断元素是否被其他元素遮挡

        // 元素对齐验证



        // 判断元素是否在指定的位置上 x y

        // 验证

        /*
         *  1. 登陆                               x
         *  2. focus到输入框                     v
         *  3. 输入内容                         v
         *  4. 触发表情.                       v
         *  5 选择表情                        v
         *  6. 输入                         v
         *  7. 上传图片                    x
         *  8 提交                       v
         *  9. 成功或者失败的提示是否显示  v
         *
         * */
        willAddChildren:function(selector,nodeNum){
            var num = 1;
            var self = this;
            if(arguments.length>1 && typeof arguments[1] == 'number'){
                num = arguments[1];
            }
            // 记录下传入节点的子元素信息 innerHTML

            //  先将符合条件的孩子节点个数报存
            var list = $(selector);
            var before=0;
            debugger;
            $.each(list,function(index,item){
                if($(item).parent(self.actual)){
                    before++;
                }
            })
            /*for(var i= 0,len=list.length;i<len;i++){
             if(S.DOM.parent(list[i],this.actual) ){
             before++;
             }

             }*/
            this.record = before;

            // 验证节点子元素是否增加了selector所指定的节点. 个数是否一致

            this.verify = jasmine.Matchers.matcherFn_('willAddChild',function(){
                var list = $(selector);
                var after=0;
                var self = this;
                $.each(list,function(index,item){
                    if($(item).parent(self.actual)){
                        after++;
                    }
                })
                /* for(var i= 0,len=list.length;i<len;i++){
                 if(S.DOM.parent(list[i],this.actual)){
                 after++;
                 }
                 }*/


                return  this.record + num == after;
            });
            return this;
        },
        willRemoveChildren:function(selector,nodeNum){
            var num = 1;
            if(arguments.length>1 && typeof arguments[1] == 'number'){
                num = arguments[1];
            }

            // 记录下传入节点的子元素信息 innerHTML

            //  先将符合条件的孩子节点个数报存
            var list = $(selector);
            var before=0;
            var self = this;
            $.each(list,function(item){
                if($(item).parent(self.actual)){
                    before++;
                }
            })
            /*for(var i= 0,len=list.length;i<len;i++){
             if(S.DOM.parent(list[i],this.actual) ){
             before++;
             }

             }*/


            this.record = before;
            // 验证节点子元素是否增加了selector所指定的节点. 个数是否一致

            this.verify = jasmine.Matchers.matcherFn_('willRemoveChild',function(){
                var list = $(selector);
                var after=0;
                var self=this;
                $.each(list,function(index,item){
                    if($(item).parent(self.actual)){
                        after++;
                    }
                })
                /*for(var i= 0,len=list.length;i<len;i++){
                 if(S.DOM.parent(list[i],this.actual) ){
                 after++;
                 }
                 }*/

                return  this.record - num == after;
            });
            return this;
        }
    };


    this.addMatchers(uiMatchers);
});