/**
 *   参数 el 自定义指令所使用在的 标签 本例 如：div
 *   参数 binding 有属性 name: 自定义指令名称； value: 自定义指令所填入的值；rawName：指令全称
 * @param Vue
 */
const install = function (Vue) {
    Vue.directive("hasRole",hasRole)
}

function hasRole(el, binding, vnode) {
    const {value} = binding
    console.log("------el元素-------")
    console.log(el)
    console.log("---------binding----------")
    console.log(binding)
    console.log("------------vnode---------------")
    console.log(vnode)
    console.log("---------el 父节点---------")
    console.log(el.parentNode)
    const hasRole = value.some(role => {
        return role === 'admin'
    })
    if(hasRole){
        el.parentNode && el.parentNode.removeChild(el)
    }
}
if (window.Vue) {
    window['hasRole'] = hasRole
    Vue.use(install); // eslint-disable-line
}

export default install

