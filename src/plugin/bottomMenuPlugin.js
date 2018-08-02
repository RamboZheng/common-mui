import creator from '../util/creator'
import BottomMenu from '../menu/bottomMenu.vue'

export default {
    install: function(Vue) {
        creator.new(Vue, BottomMenu, (imui2, target)=>{
            imui2.bottomMenu = {
                show: function(params, callback) {
                    target.title = params.title;
                    target.content = params.content;
                    target.isShowRoot = true;
                    target.isShow = true;
                    target.callback = (result)=>{
                        this.hide();
                        callback && callback(result);
                    };
                },
                hide: function() {
                    target.isShow = false;
                }
            }
        });
    }
}
