import Toggle from '../form/toggle/toggle.vue'
import Button from '../form/button/button.vue'
import Password from '../form/input/password/password.vue'

export default {
    install: function(Vue) {
        Vue.component('imui2-toggle', Toggle);
        Vue.component('imui2-button', Button);
        Vue.component('imui2-password', Password);
    }
}