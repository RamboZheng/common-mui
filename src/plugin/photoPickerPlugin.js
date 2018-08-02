import creator from '../util/creator'
import PhotoPicker from '../picker/photoPicker.vue'

export default {
    install: function(Vue) {
        creator.new(Vue, PhotoPicker, (imui2, target)=>{
            imui2.photoPicker = {
                show: function(callback) {
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
