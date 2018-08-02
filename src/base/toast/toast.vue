<template>
<transition name="fade">
    <div class="toast" v-if="isShow">
        <span class="content" v-html="value"></span>
    </div>
</transition>
</template>

<script>
export default {
    props: {
        value: String
    },
    data() {
        return {
            isShow: false
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '../../ani/animation.scss';

    .toast {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;

        .content {
            background-color: rgba(0, 0, 0, 0.8);
            border-radius: 4px;
            min-width: 2.67rem;
            max-width: 7.26rem;
            padding: 0.29rem 0.4rem;
            display: inline-block;
            text-align: left;
            color: #ffffff;
            font-size: 0.32rem;
            line-height: 150%;
        }
    }
</style>
