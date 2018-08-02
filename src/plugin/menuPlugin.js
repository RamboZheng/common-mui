import Menu from '../menu/menu.vue'
import MultiMenu from '../menu/multiMenu.vue'

export default {
    install: function(Vue) {
        Vue.component('imui2-menu', Menu);
        Vue.component('imui2-multi-menu', MultiMenu);
    }
}