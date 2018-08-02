import './scss/detail.scss'
import Vue from 'vue'
import BasePlugin from '../plugin/BasePlugin'
import FormPlugin from '../plugin/FormPlugin'
import SearchPlugin from '../plugin/SearchPlugin'
import ToastPlugin from '../plugin/ToastPlugin'
import AlertPlugin from '../plugin/AlertPlugin'
import DialogPlugin from '../plugin/DialogPlugin'
import MenuPlugin from '../plugin/MenuPlugin'
import ListviewPlugin from '../plugin/ListviewPlugin'
import BottomMenuPlugin from '../plugin/BottomMenuPlugin'
import PhotoPickerPlugin from '../plugin/PhotoPickerPlugin'
import PreviewPickerPlugin from '../plugin/PreviewPickerPlugin'
import LayoutPlugin from '../plugin/LayoutPlugin'
import NavPlugin from '../plugin/NavPlugin'
import TimePlugin from '../plugin/TimePlugin'
import RulePlugin from '../plugin/RulePlugin'
import AuthPlugin from '../plugin/AuthPlugin'

Vue.use(BasePlugin);
Vue.use(FormPlugin);
Vue.use(SearchPlugin);
Vue.use(ToastPlugin);
Vue.use(AlertPlugin);
Vue.use(DialogPlugin);
Vue.use(MenuPlugin);
Vue.use(ListviewPlugin);
Vue.use(BottomMenuPlugin);
Vue.use(PhotoPickerPlugin);
Vue.use(PreviewPickerPlugin);
Vue.use(LayoutPlugin);
Vue.use(NavPlugin);
Vue.use(TimePlugin);
Vue.use(RulePlugin);
Vue.use(AuthPlugin);

$(function() {
    let obj = new IndexObj();
    obj.initVue();
});

function IndexObj() {
    this.type = this.queryUrlString("type");
}

IndexObj.prototype.queryUrlString = function(name) {
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}

IndexObj.prototype.initVue = function() {
    let ctx = this;
    new Vue({
        el: '#app',
        data: {
            type: this.type,
            menuData: [
                [
                    {
                        tmpname: '全部'
                    },
                    {
                        tmpname: '新闻'
                    },
                    {
                        tmpname: '科技'
                    },
                    {
                        tmpname: '图片'
                    }
                ],
                [
                    {
                        tmpname: '板块'
                    },
                    {
                        tmpname: '娱乐'
                    },
                    {
                        tmpname: '视频'
                    },
                ]
            ],
            multiMenuData: [
                [
                    {
                        tmpname: '全部',
                        list: [
                            {
                                tmpname: '娱乐',
                                list: [
                                    {
                                        tmpname: '图片'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        tmpname: '新闻',
                        list: [
                            {
                                tmpname: '科技1',
                                list: [
                                    {
                                        tmpname: '短视频1'
                                    },
                                    {
                                        tmpname: '短视频2'
                                    },
                                    {
                                        tmpname: '短视频3'
                                    },
                                    {
                                        tmpname: '短视频4'
                                    }
                                ]
                            },
                            {
                                tmpname: '科技2',
                                list: [
                                    {
                                        tmpname: '短视频1'
                                    },
                                    {
                                        tmpname: '短视频2'
                                    },
                                    {
                                        tmpname: '短视频3'
                                    },
                                    {
                                        tmpname: '短视频4'
                                    }
                                ]
                            },
                            {
                                tmpname: '科技3'
                            },
                            {
                                tmpname: '科技4'
                            },
                            {
                                tmpname: '科技5'
                            }
                        ]
                    }
                ],
                [
                    {
                        tmpname: '板块'
                    },
                    {
                        tmpname: '娱乐'
                    },
                    {
                        tmpname: '视频'
                    },
                ]
            ],
            bottomMenuData: [
                {
                    name: '新闻'
                },
                {
                    name: '科技'
                },
                {
                    name: '娱乐'
                },
                {
                    name: '娱乐'
                }
            ],
            photos: [
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1523265077223&di=6160b7994810c7cd9322b4bd468a3b01&imgtype=0&src=http%3A%2F%2Farticle.fd.zol-img.com.cn%2Ft_s640x2000%2Fg5%2FM00%2F00%2F0E%2FChMkJ1Zq21-ICcSMAANU_PJNZDcAAGC4AHLqIYAA1UU695.jpg',
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1523865898&di=c73ee70ef3a5ca848f66381de2d6c81a&imgtype=jpg&er=1&src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20170117%2F0af1f5ea77214949b5d03d5899b02531_th.jpg'
            ],
            navData: [
                {
                    name: '科技'
                },
                {
                    name: '新闻'
                },
                {
                    name: '娱乐'
                }
            ],
            ruleData: `
                1、每位用户每天可签到1次，每次签到获得2积分。
                ↵
                ↵2、签到实行单月累计签到，累计次数月底清零。
                ↵
                ↵3、每月累计签到逢满7天、14天、21天、满月即可激活相应宝箱领取签到奖金，100%获奖。
                ↵
                ↵4、已激活宝箱请尽快打开领取奖金，未打开的宝箱奖金将在当月底作废，
                ↵
                ↵5、您获得的积分可用于参与爱城市网APP举办的多种活动，兑换奖品。
                ↵
                ↵6、签到活动最终解释权归爱城市网所有。            
            `
        },
        methods: {
            goJump: function(type) {
                location.href = "detail.html?type="+type;
            },
            onload: function(done, end) {
                setTimeout(() => {
                    done();
                }, 2000);
            },
            onMultiMenu: function(index, array) {
                console.log('onMultiMenu', array);
            },
            searchCallback: function(keyword) {
                console.log('searchCallback', keyword);
            },
            commonCallback: function(value) {
                console.log('commonCallback', value);
            }
        },
        mounted() {
            if(this.type == 100) {
                this.$imui2.alert.show({
                    icon: '',
                    title: '爱城市网',
                    content: '2018年最佳MVP应用'
                });
            } else if(this.type == 101) {
                this.$imui2.dialog.show({
                    icon: '',
                    title: '爱城市网',
                    content: '2018年最佳MVP应用'
                });
            } else if(this.type == 102) {
                this.$imui2.toast.show('2018年最佳MVP应用');
            } else if(this.type == 103) {
                this.$imui2.btoast.show('提交成功');
            } else if(this.type == 202) {
                this.$imui2.bottomMenu.show({
                    title: '选择器',
                    content: this.bottomMenuData
                }, (item)=>{
                    console.log(item);
                })
            } else if(this.type == 400) {
                this.$imui2.photoPicker.show((type)=>{
                    console.log('photoPicker', type);
                });
            } else if(this.type == 401) {
                this.$imui2.previewPicker.show(this.photos);
            }
        }
    });
};