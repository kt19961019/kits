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
Init.prototype.on = function (eventType, fn) {
    this.each((i, e) => {
        e.addEventListener(eventType, fn)
    })
    return this
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
        return this[0].innerText
    } else {
        return this[0].innerText = value
    }
}
// html方法
// 传参修改
// 不传参获取
Init.prototype.html = function (value) {
    if (value === undefined) {
        return this[0].innerHTML
    } else {
        return this[0].innerHTML = value
    }
}
// val方法
// 传参修改
// 不传参获取
Init.prototype.val = function (value) {
    if (value === undefined) {
        return this[0].value
    } else {
        return this[0].value = value
    }
}