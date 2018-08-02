<template>
    <div :class="[isActive ? 'active' : 'unactive']" @click="toggle">
        <div class="bar"></div>
    </div>
</template>

<script>
export default {
    props: {
        default: String,
        callback: Function
    },
    data() {
        return {
            isActive: this.default == 1
        }
    },
    methods: {
        toggle: function() {
            this.isActive = !this.isActive;
            this.callback && this.callback(this.isActive);
        }
    }
}
</script>

<style lang="scss" scoped>
$baseHeight: 0.83;

.toggle {
    display: inline-block;
    width: $baseHeight * 1.645 + rem;
    height: $baseHeight + rem;
    border-radius: $baseHeight + rem;
    box-sizing: border-box;
    padding: $baseHeight * 0.05 + rem;

    .bar {
        display: inline-block;
        box-sizing: border-box;
        width: $baseHeight * 0.86 + rem;
        height: $baseHeight * 0.87 + rem;
        border-radius: $baseHeight * 0.87 + rem;
        box-shadow: 0px 1px 1px 0px #999999;
;
    }
}

.active {
    @extend .toggle;
    background-color: #fe952c;
    text-align: right;
    .bar {
        background-color: #ffffff;
    }
}

.unactive {
    @extend .toggle;
    background-color: transparent;
    border: 1px solid #e1e1e1;
    padding: $baseHeight * 0.02 + rem !important;
    text-align: left;
    .bar {
        border: 1px solid #e1e1e1;
        background-color: #ffffff;
    }
}
</style>

