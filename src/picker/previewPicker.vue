<template>
    <transition name="fade">
    <div class="_preview" v-if="isShow" @click="cancel">
        <div class="container" @touchstart="touchStart($event)" @touchmove="touchMove($event)"
            @touchend="touchEnd($event)" ref="container">
            <div class="photo" v-for="url in value">
                <img :src="url"/>
            </div>
        </div>
        <div class="page" v-if="totalCount>1">{{selectedIndex+'/'+totalCount}}</div>
    </div>
    </transition>
</template>

<script>
export default {
    props: {
        value: Array,
        callback: Function
    },
    data() {
        return {
            isShow: false,
            selectedIndex: 1,
            startX: 0
        }
    },
    computed: {
        totalCount: function() {
            return this.value.length;
        },
        screenWidth: function() {
            return window.screen.width;
        },
        flingDistance: function() {
            return this.screenWidth/4;
        }
    },
    methods: {
        cancel: function() {
            this.callback && this.callback();
        },
        touchStart: function(event) {
            this.startX = event.changedTouches[0].screenX;
        },
        touchMove: function(event) {
            if(this.startX == -1) {
                return ;
            }

            let moveX = event.changedTouches[0].screenX;
            let len = this.startX - moveX;
            if(len > this.flingDistance && this.selectedIndex < this.value.length) {
                this.selectedIndex++;
                this.startX = -1;
                this.$refs.container.scrollLeft = this.screenWidth * (this.selectedIndex-1);
            } else if(len < -this.flingDistance && this.selectedIndex > 1) {
                this.selectedIndex--;
                this.startX = -1;
                this.$refs.container.scrollLeft = this.screenWidth * (this.selectedIndex-1);
            }
        },
        touchEnd: function(event) {
            if(this.startX != -1) {
                let left = this.screenWidth * (this.selectedIndex-1);
                this.$refs.container.scrollLeft = left;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    ._preview {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        background-color: rgba(0, 0, 0, 1);
        display: flex;
        align-items: center;
        
        .container {
            display: inline-block;
            white-space: nowrap;
            overflow-x: auto;
        }

        .container::-webkit-scrollbar {
            display: none;
        }

        .photo {
            width: 10rem;
            display: inline-block;
            img {
                max-width: 10rem;
            }
        }

        .page {
            display: block;
            color: white;
            font-size: 0.45rem;
            font-weight: bold;
            position: absolute;
            bottom: 1rem;
            left: 0;
            right: 0;
            text-align: center;
        }
    }
</style>
