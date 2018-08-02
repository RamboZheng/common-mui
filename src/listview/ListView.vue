<template>
    <div class="_listview" ref="listview" @touchstart="touchStart($event)" @touchmove="touchMove($event)" 
        @touchend="touchEnd($event)">
        <slot name="content"></slot>
        <div class="prompt" v-if="isLoading">
            <div class="spinner">
                <div class="double-bounce1"></div>
                <div class="double-bounce2"></div>
            </div>
        </div>
        <div class="prompt" v-else-if="isEnd&&showEndText">
            {{promptText}}
        </div>
    </div>
</template>

<script>
const LOAD_TEXT = "正在加载中...";
const END_TEXT = "没有更多内容了";

export default {
    props: {
        onload: Function,
        showEndText: Boolean
    },
    data() {
        return {
            isLoading: false,
            isEnd: false,
            promptText: '',
            touchStartY: 0
        }
    },
    methods: {
        reset: function() {
            this.isEnd = false;
        },
        touchStart: function(event) {
            this.touchStartY = event.changedTouches[0].screenY;
        },
        touchMove: function(event) {
            if(this.isLoading || this.isEnd) {
                return ;
            }

            let touchMoveY = event.changedTouches[0].screenY;
            let isUpTo = this.touchStartY - touchMoveY > 80;

            let listviewRef = this.$refs.listview;
            let scrollHeight  = listviewRef.scrollHeight;
            let scrollTop = listviewRef.scrollTop;
            let clientHeight = listviewRef.clientHeight;
            let bottom = scrollHeight - scrollTop - clientHeight;
            if(scrollTop > 0 && bottom <= 5 && isUpTo) {
                this.promptText = LOAD_TEXT;
                this.isLoading = true;
                this.$nextTick(()=>{
                    this.$refs.listview.scrollTop += 100;
                });
            }
        },
        touchEnd: function(event) {
            if(!this.isLoading) {
                return ;
            }

            this.onload && this.onload(()=>{
                this.isLoading = false;
            }, ()=>{
                this.isLoading = false;
                this.promptText = END_TEXT;
                this.isEnd = true;
            });
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '../ani/loading.scss';

    ._listview {
        width: 100%;
        overflow: auto;

        .prompt {
            height: 1.2rem;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #999;
            font-size: 0.32rem;
        }
    }
</style>
