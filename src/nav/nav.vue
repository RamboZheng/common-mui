<template>
    <div class="_nav">
        <div class="tab" v-for="(item, index) in newData" @click="selectItem(index, item)">
            <span :class="item.selected?'selected':''">{{item.name}}</span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        data: Array,
        callback: Function
    },
    data() {
        return {
            newData: this.normalData()
        }
    },
    methods: {
        normalData: function() {
            let result = new Array;
            this.data.forEach((item, i)=>{
                result[i] = { selected: i == 0, name: item.name }
            });
            return result;
        },
        selectItem: function(index, item) {
            this.newData.forEach((item, i)=>{
                item['selected'] = i == index;
            });
            this.callback && this.callback(item);
        }
    }
}
</script>

<style lang="scss" scoped>
    ._nav {
        width: 100%;
        display: flex;
        border: 1px solid #eeeeee;
        background-color: #ffffff;

        .tab {
            flex: 1;
            
            span {
                display: inline-block;
                font-size: 0.37rem;
                color: #333333;
                padding: 0.4rem 0;
            }
        }

        .selected {
            color: #fe952c !important;
            border-bottom: 2px solid #fe952c;
        }
    }
</style>
