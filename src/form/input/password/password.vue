<template>
    <div class="password">
        <input :type="type==0?'password':'text'" :placeholder="placeholder" ref="password"></input>
        <img :src="icon" @click="toggleClick"/>
    </div>
</template>

<script>
import iconShow from '../../../../res/display.png';
import iconHide from '../../../../res/hide.png';

export default {
    props: {
        placeholder: String
    },
    data() {
        return {
            type: 0
        }
    },
    computed: {
        icon: function() {
            return this.type == 0 ? iconHide : iconShow;
        },
        value: function() {
            return this.$refs.password.value;
        }
    },
    methods: {
        toggleClick: function() {
            let passwordRef = this.$refs.password;
            this.type = this.type == 0 ? 1 : 0;
        }
    }
}
</script>

<style lang="scss" scoped>
    .password {
        display: flex;
        background-color: #ffffff;
        padding: 0.4rem;
        justify-content: center;
        align-items: center;
        margin: 0.4rem;

        input {
            flex: 1;
            width: 100%;
            border: 0;
            outline: none;  
            -webkit-tap-highlight-color: rgba(0,0,0,0);
            color: #333;
            font-size: 0.4rem;
        }

        input::-webkit-input-placeholder {   
            color: #999;
        }

        img {
            margin: 0 0.2rem;
            width: 0.6rem;
        }
    }
</style>
