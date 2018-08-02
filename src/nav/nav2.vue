<template>
    <div class="_nav2">
        <div class="tab" v-for="(item, index) in newData" :class="item.selected?'selected':''" 
            @click="selectItem(index, item)">
            {{item.name}}
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
    ._nav2 {
        width: 100%;
        display: flex;
        border-bottom: 1px solid #eeeeee;
        background-color: #ffffff;

        .tab {
            flex: 1;
            font-size: 0.37rem;
            color: #333333;
            padding: 0.27rem 0;
        }

        .selected {
            color: #ffffff !important;
            background-color: #fe952c;
        }
    }
</style>
