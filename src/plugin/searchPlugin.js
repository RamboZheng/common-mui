import Search from '../search/search.vue'
import Search2 from '../search/search2.vue'

export default {
    install: function(Vue) {
        Vue.component('imui2-search', Search);
        Vue.component('imui2-search2', Search2);
    }
}