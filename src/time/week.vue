<template>
    <div class="_week">
        <div class="tab" v-for="(item, index) in data" :class="item.selected?'selected':''" 
            @click="selectItem(index, item)">
            <div>{{item.name}}</div>
            <div class="day">{{item.day}}</div>
        </div>
    </div>
</template>

<script>
const WEEKS = ['星天', '星一', '星二', '星三', '星四', '星五', '星六']

export default {
    props: {
        type: String,
        callback: Function
    },
    data() {
        return {
            data: this.getCurrentMongthDate()
        }
    },
    methods: {
        getTotalDays: function() {
            let date = new Date();
            date.setMonth(date.getMonth() + 1);
            date.setDate(0);
            return date.getDate();
        },
        getCurrentMongthDate: function() {
            let result = [];
            let date = new Date();
            //是否从第二天开始显示
            if(this.type == '1') {
                date.setDate(date.getDate()+1);
            }
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();
            let days = this.getTotalDays();
            let len = days - day + 1;
            len = len > 7 ? 7 : len;
            let nextLen = 7 - len || 0;
            let index = 0;
            for(let i=0;i<len;i++) {
                let date = year + '/' + month + '/' + (day + i);
                result[index] = {
                    name: WEEKS[new Date(date).getDay()],
                    day: day + i,
                    date: date,
                    selected: index == 0,
                };
                index++;
            }

            //检查隔年
            if(month < 11) {
                month++;
            } else {
                year++;
                month = 1;
            }
            
            for(let i=0;i<nextLen;i++) {
                let date = year + '/' + month + '/' + (1 + i);
                result[index] = {
                    name: WEEKS[new Date(date).getDay()],
                    day: 1 + i,
                    date: date,
                    selected: false
                };

                index++;
            }
            return result;
        },
        selectItem: function(index, item) {
            this.data.forEach((item, i)=>{
                item['selected'] = i == index;
            });
            this.callback && this.callback(item);
        }
    }
}
</script>

<style lang="scss" scoped>
    ._week {
        display: flex;
        border-bottom: 1px solid #eeeeee;
        background-color: #ffffff;

        .tab {
            flex: 1;
            font-size: 0.28rem;
            color: #333333;
            padding: 0.2rem 0;

            .day {
                margin-top: 0.15rem;
                color: #666666;
            }
        }

        .selected {
            color: #ffffff !important;
            background-color: #fe952c;

            .day {
                color: #ffffff !important;
            }
        }
    }
</style>
