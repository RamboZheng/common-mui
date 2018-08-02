<template>
    <div class="_search">
        <div class="content">
            <div class="left">
                <input type="search" v-model="keyword" :placeholder="placeholder" 
                    @keyup.13="seachClick" ref="search"/>
            </div>
            <div class="right" @click="cancelClick">取消</div>
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
        isfocus: Boolean,
        callback: Function,
        oncancel: Function
    },
    data() {
        return {
            icon: iconSearch,
            keyword: ''
        }
    },
    methods: {
        seachClick: function() {
            if(this.keyword) {
                this.callback && this.callback(this.keyword);
            }
        },
        cancelClick: function() {
            this.oncancel && this.oncancel();
        }
    },
    mounted() {
        if(this.isfocus) {
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
            display: flex;
            align-items: center;
            
            .left {
                flex: 1;
                display: flex;
                background-color: #ffffff;
                border-radius: .11rem;
                align-items: center;
                justify-content: center;
                border: 1px solid #eeeeee;
                padding: 0.213rem 0.4rem;

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
            }

            .right {
                color: #666666;
                padding: 0 0.13rem 0 0.4rem;
                font-size: 0.37rem;
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

