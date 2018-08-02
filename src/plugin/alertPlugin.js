import creator from '../util/creator'
import Alert from '../base/alert/alert.vue'

export default {
    install: function(Vue) {
        creator.new(Vue, Alert, (imui2, target)=>{
            imui2.alert = {
                show: function(params, callback) {
                    target.icon = params.icon;
                    target.title = params.title;
                    target.content = params.content;
                    target.btnText = params.btnText;
                    target.isShow = true;
                    target.callback = (type)=>{
                        this.hide();
                        callback && callback(type);
                    };
                },
                hide: function() {
                    target.isShow = false;
                }
            }
        });
    }
}
