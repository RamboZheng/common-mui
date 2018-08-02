import ijquery from './ijquery'

export default {
    new: function(Vue, Component, callback) {
        let extendObj = Vue.extend(Component);
        let target = new extendObj({el: document.createElement('div')});
        if(document.body) {
            document.body.appendChild(target.$el);
        } else {
            ijquery.ready(()=>{document.body.appendChild(target.$el);});
        } 
        this.mixin(Vue, target, callback);
    },

    mixin: function(Vue, target, callback) {
        Vue.mixin({
            created: function () {
                callback(this.$imui2 = this.$imui2 || {}, target);
            }
        })
    }
}