<template>
    <div class="_bottom-menu">
        <div class="bg" v-show="isShowRoot" @click="close"></div>
        <div class="container" v-show="isShowRoot">
            <transition name="top" v-on:after-leave="afterLeave">
            <div class="box" v-if="isShow" ref="box">
                <div class="title">{{title}}</div>
                <div class="content" ref="content">
                    <div class="item" v-for="(item, index) in content" @click.stop="selectItem(index, item)">
                        <span>{{item.name}}</span><img :src="iconUnchecked" ref="icons"/>
                    </div>
                </div>
                <div class="btn" @click.stop="close">关闭</div>
            </div>
            </transition>
        </div>
    </div>
</template>

<script>
import iconChecked from '../../res/_icon_checked.png'
import iconUnchecked from '../../res/_icon_uncheck.png'

export default {
    props: {
        title: String,
        content: Array,
        callback: Function
    },
    data() {
        return {
            iconChecked: iconChecked,
            iconUnchecked: iconUnchecked,
            isShowRoot: false,
            isShow: false
        }
    },
    methods: {
        selectItem: function(index, item) {
            this.$refs.icons[index].src = iconChecked;
            setTimeout(() => {
                this.callback && this.callback(item);
            }, 600);
        },
        close: function() {
            this.isShow = false;
        },
        afterLeave: function() {
            this.isShowRoot = false;
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '../ani/animation.scss';

    ._bottom-menu {
        .bg {
            position: fixed;
            top: 0;
            bottom: 0;
            width: 100%;
            background-color: rgba($color: #000000, $alpha: 0.7);
        }

        .box {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background-color: #ffffff;
            border-top: 1px solid #eeeeee;
            overflow: hidden;
            height: 7.5rem;

            .title {
                font-size: 0.4rem;
                color: #333333;
                padding: 0.3rem;
            }

            .content {
                overflow: auto;
                padding-left: 0.3rem;
                height: 4.9rem;
            }

            .item {
                display: flex;
                height: 1.2rem;
                width: 100%;
                font-size: 0.4rem;
                border-bottom: 1px solid #eeeeee;
                color: #666666;
                align-items: center;
                justify-content: space-between;

                img {
                    width: 0.533rem;
                    height: 0.533rem;
                    margin-right: 0.3rem;
                }
            }

            .btn {
                background-color: #fe952c;
                padding: 0.5rem;
                font-size: 0.37rem;
                color: #ffffff;
            }
        }
    }
</style>
