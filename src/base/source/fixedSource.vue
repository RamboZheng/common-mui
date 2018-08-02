<template>
    <div class="fixed-source">
        <span v-html="value"></span>
    </div>
</template>

<script>
export default {
    props: {
        value: String
    }
}
</script>

<style lang="scss" scoped>
    .fixed-source {
        color: #999;
        font-size: 0.32rem;
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 1.2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border-top: 1px solid #eeeeee;
        background-color: #ffffff;
    }
</style>
