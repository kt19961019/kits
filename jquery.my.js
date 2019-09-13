(function () {
    // 封装代码的方式：
    // 1. 把对象抽象成为构造函数
    // 2. 在构造函数里面写属性
    // 3. 在原型对象上面写方法
    // 元素获取
    function $(selector) {
        return new Init(selector)
    }
    function Init(selector) {
        let dom = document.querySelectorAll(selector)
        for (i = 0; i < dom.length; i++) {
            this[i] = dom[i]
        }
        this.length = dom.length
        // 把数组dom的数据跟索引和长度放入this对象中，这就是伪数组(本质是一个对象)
    }
    // each方法
    Init.prototype.each = function (fn) {
        // this是调用该方法的对象
        for (i = 0; i < this.length; i++) {
            fn(i, this[i])
            //对象是个伪数组  i对象中的索引 this[i]是每个元素
        }
    }
    // css方法
    // 功能一 ：获取
    // 功能二 ：修改
    Init.prototype.css = function (property, value) {
        // 判断用户是输入两个形参还是一个
        // 一个形参则或取两个则修改
        if (value === undefined) {
            let cssStyle = window.getComputedStyle(this[0])
            // 默认或取伪数组第一个元素的全部属性 
            return cssStyle[property]
            // 在全部属性中找到输入的形参的值
        } else {
            this.each((i, e) => {
                e.style[property] = value;
            })
        }
    }
    // 添加类名
    Init.prototype.addClass = function (className) {
        this.each((i, e) => {
            e.classList.add(className)
        })
        return this
    }
    // 删除类名
    Init.prototype.removeClass = function (className) {
        this.each((i, e) => {
            e.classList.remove(className)
        })
        return this
    }
    // 切换类名
    Init.prototype.toggleClass = function (className) {
        this.each((i, e) => {
            e.classList.toggle(className)
        })
        return this
    }
    // 注册事件
    // 委托事件
    Init.prototype.on = function (type, selector, fn) {
        if (fn === undefined) {
            fn = selector
            this.each(function (i, e) {
                e.addEventListener(type, fn)
            })
        } else {
            this.each((i, e) => {
                e.addEventListener(type, function (event) {
                    let list = this.querySelectorAll(selector)
                    let isExit = Array.prototype.indexOf.call(list, event.target) != -1
                    if (isExit) {
                        fn.call(event.target)
                    }
                })
            })
        }
        return this;
    }
    // attr方法封装 
    // 非开关属性
    // 功能一 ：获取
    // 功能二 ：修改
    Init.prototype.attr = function (property, value) {
        // 判断用户是输入两个形参还是一个
        // 一个形参则或取两个则修改
        if (value === undefined) {
            let cssStyle = window.getComputedStyle(this[0])
            // 默认或取伪数组第一个元素的全部属性 
            return cssStyle[property]
            // 在全部属性中找到输入的形参的值
        } else {
            this.each((i, e) => {
                e.style[property] = value;
            })
        }
    }
    // prop方法封装 
    Init.prototype.prop = function (property, value) {
        if (value === undefined) {
            let a = this[0].getAttribute(property)
            if (a === null) {
                return false
            } else {
                return true
            }
        } else {
            if (value === true) {
                this[0].setAttribute(property, true)
            } else {
                this[0].removeAttribute(property)
            }
        }

    }
    // text方法
    // 传参修改
    // 不传参获取
    Init.prototype.text = function (value) {
        if (value === undefined) {
            this[0].innerText
        } else {
            this[0].innerText = value
        }
        return this
    }
    // html方法
    // 传参修改
    // 不传参获取
    Init.prototype.html = function (value) {
        if (value === undefined) {
            this[0].innerHTML
        } else {
            this[0].innerHTML = value
        }
        return this
    }
    // val方法
    // 传参修改
    // 不传参获取
    Init.prototype.val = function (value) {
        if (value === undefined) {
            this[0].value
        } else {
            this[0].value = value
        }
        return this
    }
    // append方法
    // 一个参数默认给第一个元素后面追加新元素和内容
    // 两个参数为给指定索引的元素后面追加新元素和内容
    Init.prototype.append = function (content, index) {
        if (index === undefined) {
            this[0].innerHTML = this[0].innerHTML += content
        } else {
            this[index].outerHTML = content + this[index].outerHTML
        }
        return this
    }
    // prepend方法
    // 一个参数默认给第一个元素前面追加新元素和内容
    // 两个参数为给指定索引的元素前面追加新元素和内容
    Init.prototype.prepend = function (content, index) {
        if (index === undefined) {
            this[0].innerHTML = content += this[0].innerHTML
        } else {
            this[index].outerHTML = content + this[index].outerHTML
        }
        return this
    }
    // before方法
    // 一个参数给所有元素前面追加一个新元素和内容
    // 两个参数为给指定索引的元素前面追加新元素和内容
    Init.prototype.before = function (content, index) {
        if (index === undefined) {
            this.each(i => {
                this[i].outerHTML = content + this[i].outerHTML
            })
        } else {
            this[index].outerHTML = content + this[index].outerHTML
        }
        return this
    }
    // siblings方法
    // 不传参获取元素所有同代元素集合的一个数组
    Init.prototype.siblings = function (expr) {
        let cc = this[0].parentNode.children
        let n = Array.prototype.indexOf.call(cc, this[0])
        let mm = []
        for (let i = 0; i < cc.length; i++) {
            if (i !== n) {
                mm.push(cc[i])
            }
        }
        if (expr) {
            let slc = document.querySelectorAll(expr)
            let nn = []
            for (let i = 0; i < slc.length; i++) {
                let index = mm.indexOf(slc[i])
                if (index != -1) {
                    nn.push(mm[index])
                }
            }
            return nn
        }
        return mm
    }
    //children方法
    // 不传参获取元素所有子元素集合的一个数组
    //传参匹配指定选择器的子元素
    Init.prototype.children = function (expr) {
        let cc = this[0].children
        console.log(cc)
        let mm = []
        for (let i = 0; i < cc.length; i++) {
            mm.push(cc[i])
        }
        if (expr) {
            let slc = document.querySelectorAll(expr)
            let nn = []
            for (let i = 0; i < slc.length; i++) {
                let index = mm.indexOf(slc[i])
                if (index != -1) {
                    nn.push(mm[index])
                }
            }
            return nn
        }
        return mm
    }
    // parent方法
    // 不传参 匹配所有对象中所有元素的父元素
    // 传参 匹配拥有指定选择器的父元素
    Init.prototype.parent = function (expr) {
        let par = []
        this.each((i, e) => {
            par.push(e.parentNode)
        })
        if (expr) {
            let slc = document.querySelectorAll(expr)
            let nn = []
            for (let i = 0; i < slc.length; i++) {
                let index = par.indexOf(slc[i])
                if (index != -1) {
                    nn.push(par[index])
                }
            }
            return nn
        }
        return par
    }
    // parents方法
    // 不传参 向上匹配元素的所有祖先元素
    //  传参 向上匹配元素的指定选择器的祖先元素
    Init.prototype.parents =function(expr){
        let c=this
        function bb (c){
            if(c[0].parentNode){
                aa.unshift(c[0].parentNlode)
                aa=bb(aa)
              }
            return aa
        }
        let p=[]
        bb(c).forEach((e,i) => {
            p.unshift(bb(c)[i])
        })
        if(expr){
            let slc = document.querySelectorAll(expr)
            let nn = []
            for (let i = 0; i < slc.length; i++) {
                let index = p.indexOf(slc[i])
                if (index != -1) {
                    nn.push(p[index])
                }
            }
            return nn
        }
        return p
    }
    window.$ = $
})()