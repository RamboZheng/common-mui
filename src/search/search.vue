<template>
    <div class="_search" @click="imageClick">
        <div class="content">
            <img :src="icon"><input type="search" v-model="keyword" :placeholder="placeholder" 
                :disabled="isimage" @keyup.13="seachClick" ref="search"/>
        </div>
    </div>
</template>

<script>
import iconSearch from '../../res/_icon_glass.png'

export default {
    props: {
        placeholder: {
            type: String,
            default: '请输入搜索内容'
        },
        isimage: Boolean,
        isfocus: Boolean,
        callback: Function
    },
    data() {
        return {
            icon: iconSearch,
            keyword: ''
        }
    },
    methods: {
        imageClick: function() {
            if(this.isimage && this.callback) {
                this.callback();
            }
        },
        seachClick: function() {
            if(this.keyword) {
                this.callback && this.callback(this.keyword);
            }
        }
    },
    mounted() {
        if(!this.isimage && this.isfocus) {
            this.$refs.search.focus();
        }
    }
}
</script>

<style lang="scss" scoped>
    ._search {
        width: 100%;
        box-sizing: border-box;
        background-color: #f4f4f4;
        padding: 0.27rem;

        .content {
            background-color: #ffffff;
            border-radius: .11rem;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid #eeeeee;
            padding: 0.213rem 0.4rem 0.213rem 0;

            img {
                height: 0.34rem;
                margin: 0 0.27rem 0 0.4rem;
            }

            input {
                flex: 1;
                border: 0;
                outline: none;  
                -webkit-tap-highlight-color: rgba(0,0,0,0);
                color: #333333;
                height: 0.6rem;
                font-size: 0.37rem;
                padding: 0;
            }

            input:disabled {
                background: transparent;
            }

            input::-webkit-input-placeholder {   
                color: #999;
            }
        }
    }
</style>

