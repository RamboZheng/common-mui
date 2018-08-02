<template>
    <div class="_photo-picker" v-show="isShowRoot">
        <transition name="top" v-on:after-leave="afterLeave">
        <div class="container" v-if="isShow">
            <div class="items">
                <div class="title">请选择</div>
                <div class="camera" @click="select('camera')">拍照</div>
                <div class="gallery" @click="select('gallery')">从手机相册选择</div>
            </div>
            <div class="cancel" @click="cancel">取消</div>
        </div>
        </transition>
    </div>
</template>

<script>
export default {
    props: {
        callback: Function
    },
    data() {
        return {
            isShowRoot: false,
            isShow: false
        }
    },
    methods: {
        select: function(type) {
            this.isShow = false;
            this.callback && this.callback(type);
        },
        cancel: function() {
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

    ._photo-picker {
        position: fixed;
        background-color: rgba(0, 0, 0, 0.7);
        top: 0;
        bottom: 0;
        width: 100%;

        .container {
            position: absolute;
            bottom: 0.3rem;
            left: 0.3rem;
            right: 0.3rem;
            height: 6rem;
        }

        .items {
            background-color: #ffffff;
            border-radius: 4px;

            .item {
                font-size: 0.4rem;
                padding: 0.4rem;
            }

            .title {
                @extend .item;
                color: #666666;
                border-bottom: 1px solid #eeeeee;
            }

            .camera {
                @extend .item;
                color: #fe952c;
                border-bottom: 1px solid #eeeeee;
            }

            .gallery {
                @extend .item;
                color: #fe952c;
            }
        }

        .cancel {
            font-size: 0.4rem;
            color: #666666;
            padding: 0.4rem;
            background-color: #ffffff;
            border-radius: 4px;
            margin-top: 0.27rem;
        }
    }
</style>
