import creator from '../util/creator'
import PreviewPicker from '../picker/previewPicker.vue'

export default {
    install: function(Vue) {
        creator.new(Vue, PreviewPicker, (imui2, target)=>{
            imui2.previewPicker = {
                show: function(value, callback) {
                    target.value = value;
                    target.isShow = true;
                    target.callback = ()=>{
                        this.hide();
                        callback && callback();
                    };
                },
                hide: function() {
                    target.isShow = false;
                }
            }
        });
    }
}
