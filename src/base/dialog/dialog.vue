<template>
<transition name="fade">
    <div class="dialog" v-if="isShow">
        <div class="container">
            <div class="icon" v-if="icon"><img :src="icon"/></div>
            <div class="content" :class="[icon?'addIcon':'']">
                <div class="title">{{title}}</div>
                <div class="text" v-html="content"></div>
                <div class="btn">
                    <div class="left" @click="close(0)">{{leftTextCpd}}</div>
                    <div class="right" @click="close(1)">{{rightTextCpd}}</div>
                </div>
            </div>
        </div>
    </div>
</transition>
</template>

<script>
export default {
    props: {
        icon: String,
        title: String,
        content: String,
        leftText: String,
        rightText: String,
        callback: Function
    },
    data() {
        return {
            isShow: false
        }
    },
    computed: {
        leftTextCpd: function() {
            return this.leftText || '取消';
        },
        rightTextCpd: function() {
            return this.rightText || '继续';
        }
    },
    methods: {
        close: function(type) {
            this.callback && this.callback(type);
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '../../ani/animation.scss';

    .dialog {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.7);

        .container {
            text-align: center;
            width: 100%;
        }

        .icon {
            position: relative;
            top: 0;
            z-index: 999;
            img {
                height: 2.72rem;
            }
        }

        .addIcon {
           position: relative;
           top: -1.5rem;
           padding-top: 1.5rem;
        }

        .content {
            width: 80%;
            background-color: #ffffff;
            border-radius: 0.13rem;
            display: inline-block;

            .title {
                font-weight: bold;
                font-size: 0.4rem;
                padding-top: 0.53rem;
                color: #333333;
            }
            .text {
                font-size: 0.37rem;
                padding: 0.27rem 0.53rem 0.53rem 0.53rem;
                line-height: 180%;
                color: #666666;
            }
        }

        .content .btn {
            display: flex;
            border-top: 1px solid #f4f4f4;

            .normal {
                flex: 1;
                font-size: 0.37rem;
                padding: 0.4rem;
            }
            .left {
                @extend .normal;
                color: #666666;
            }
            .right {
                @extend .normal;
                color: #fe952c;
                border-left: 1px solid #f4f4f4;
            }
        }
    }
</style>
