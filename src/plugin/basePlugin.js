import Source from '../base/source/source.vue'
import FixedSource from '../base/source/fixedSource.vue'
import Toast from '../base/toast/toast.vue'
import Warn from '../base/warn/warn.vue'

export default {
    install: function(Vue) {
        Vue.component('imui2-warn', Warn);
        Vue.component('imui2-source', Source);
        Vue.component('imui2-fixed-source', FixedSource);
    }
}