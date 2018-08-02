<template>
    <div :class="[type=='0'?'disable':(type=='1'?'normal':'second')]" @click="click">
        提交
    </div>
</template>

<script>
export default {
    props: {
        type: {
            type: String,
            default: '2'
        },
        callback: Function
    },
    data() {
        return {
            isHangUp: false //防止重复点击
        }
    },
    methods: {
        click: function() {
            if(this.type != '0' && !this.isHangUp) {
                this.isHangUp = true;
                setTimeout(() => {
                    this.isHangUp = false;
                }, 500);
                this.callback && this.callback();
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.button {
    width: 7.73rem;
    padding: 0.31rem;
    font-size: 0.4rem;
    border-radius: 0.05rem;
    text-align: center;
    display: inline-block;
}

.normal {
    @extend .button;
    border: 1px solid #fe952c;
    color: #fe952c; 
}

.second {
    @extend .button;
    background-color: #fe952c;
    color: #ffffff; 
}

.disable {
    @extend .button;
    background-color: #cccccc;
    color: #ffffff; 
}
</style>
