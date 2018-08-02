<template>
    <div class="_arrow" @click="singleClick">
        <div class="container" :class="type==1?'noborder':''">
            <div class="left">
                <slot name="content"></slot>
            </div>
            <img class="right" :src="iconArrow"/>
        </div>
    </div>
</template>

<script>
import iconArrow from '../../../res/_icon_arrow_right.png'

export default {
    props: {
        type: String,
        callback: Function
    },
    data() {
        return {
            iconArrow: iconArrow
        }
    },
    methods: {
        singleClick: function() {
            if(this.type != 0) {
                this.callback && this.callback();
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    ._arrow {
        padding-left: 0.5rem;
        background-color: #ffffff;

        .container {
            display: flex;
            padding: 0.4rem 0.4rem 0.4rem 0;
            align-items: center;
            justify-content: space-between;
            font-size: 0.36rem;
            border-bottom: 1px solid #eeeeee;
        }

        .left {
            text-align: left;
        }

        .right {
            float: right;
            width: 0.4rem;
        }

        .noborder {
            border-bottom: 0 !important;
        }
    }
</style>
