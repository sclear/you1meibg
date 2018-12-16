//全局的一些方法
const VUE_GLOBAL = {
    install : function(Vue){
        Vue.filter('Tims',val => {
            return val
        })
        Vue.mixin({

        })
    }
};


export {
    VUE_GLOBAL
}