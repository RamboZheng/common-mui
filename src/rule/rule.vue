<template>
    <div class="_rule">
        <div class="container">
            <div class="content">
                <div class="title">{{title||'活动规则'}}</div>
                <div class="rules" v-html="content"></div>
            </div>
            <img class="close" :src="iconClose" @click="close"/>
        </div>
    </div>
</template>

<script>
import iconClose from '../../res/_icon_close.png'

export default {
    props: {
        title: String,
        content: String,
        callback: Function
    },
    data() {
        return {
            iconClose: iconClose
        }
    },
    methods: {
        close: function() {
            this.callback && this.callback();
        }
    }
}
</script>

<style lang="scss" scoped>
    ._rule {
        background-color: rgba(0, 0, 0, 0.4);
        position: fixed;
        top: 0;
        bottom: 0;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        .container {
            width: 80%;
            text-align: center;
        }

        .content {
            padding: 0.53rem;
            border-radius: 4px;
            background-color: #ffffff;
        }

        .title {
            font-size: 0.4rem;
            font-weight: bold;
            color: #333333;
        }

        .rules {
            margin-top: 0.4rem;
            font-size: 0.37rem;
            line-height: 180%;
            color: #666666;
            text-align: left;
        }

        .close {
            width: 1rem;
        }
    }
</style>
