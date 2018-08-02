import creator from '../util/creator'
import Dialog from '../base/dialog/dialog.vue'

export default {
    install: function(Vue) {
        creator.new(Vue, Dialog, (imui2, target)=>{
            imui2.dialog = {
                show: function(params, callback) {
                    target.icon = params.icon;
                    target.title = params.title;
                    target.content = params.content;
                    target.leftText = params.leftText;
                    target.rightText = params.rightText;
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
