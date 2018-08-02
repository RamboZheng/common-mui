<template>
    <div class="_menu" ref="root">
        <div class="title">
            <span v-for="(item, index) in title" :class="[item._selected?'selected':'', rightBorder(index)]" 
                @click="changeTab($event, index)">
                {{item.name}}
                <img v-if="item._selected" :src="item.isSpread?iconDownSelected:iconUpSelected"/>
                <img v-else :src="item.isSpread?iconDown:iconUp"/>
            </span>
        </div>
        <div class="spread bg" v-show="isSpread" @click="cancel" ref="shadow"></div>
        <transition name="top">
        <div class="spread" v-show="isSpread" ref="spread">
            <template v-if="hasSpread">
                <div class="item" v-for="(item, index) in spreadList" 
                    :class="[item._selected?'selected':'']" 
                    @click.stop="selectItem(index, item)">
                    {{item[name]}}
                </div>
            </template>
            <div class="empty" v-else>暂无内容</div>
        </div>
        </transition>
    </div>
</template>

<script>
import iconUp from '../../res/_icon_arrow_up.png'
import iconDown from '../../res/_icon_arrow_down.png'
import iconUpSelected from '../../res/_icon_arrow_up_selected.png'
import iconDownSelected from '../../res/_icon_arrow_down_selected.png'

const MAX_MENU_HEIGHT = 12;
const MAX_MENU_EMPTY_HEIGHT = 4;

export default {
    props: {
        data: Array,
        callback: Function,
        name: {
            type: String,
            default: 'name'
        }
    },
    data() {
        return {
            selectedIndex: 0,
            isSpread: false,
            spreadList: [],
            iconUp: iconUp,
            iconDown: iconDown,
            iconUpSelected: iconUpSelected,
            iconDownSelected: iconDownSelected,
            isInitMenuHeight: false
        }
    },
    computed: {
        title: function() {
            let result = new Array;
            for(let i=0;i<this.data.length;i++) {
                result[i] = { 
                    name: this.data[i][0][this.name], 
                    _selected: i==0,
                    isSpread: false
                };
            }
            return result;
        },
        content: function() {
            for(let i=0;i<this.data.length;i++) {
                for(let j=0;j<this.data[i].length;j++) {
                    this.data[i][j]['_selected'] = j==0;
                }
            }
            return this.data;
        },
        hasSpread: function() {
            return this.spreadList && this.spreadList.length>0;
        }
    },
    methods: {
        rightBorder: function(index) {
            return index < this.title.length-1 ? 'rightLine' : '';
        },
        setSelectedState: function(index) {
            let list = this.content[this.selectedIndex];
            for(let i=0;i<list.length;i++) {
                list[i]._selected = i == index;
            }
        },
        changeTab: function(event, position) {
            if(this.selectedIndex == position && this.isSpread) {
                this.isSpread = false;
                this.title[position].isSpread = false;
                return ;
            }

            for(let i=0;i<this.title.length;i++) {
                this.title[i].isSpread = false;
            }
            this.title[position].isSpread = true;
            this.isSpread = this.selectedIndex == position;
            this.selectedIndex = position;
            this.spreadList = this.content[position];

            this.$nextTick(()=>{
                this.calculateSpreadHeight(position);
                this.initBgHeight(event);
            });
        },
        selectItem: function(index, item) {
            this.isSpread = false;
            this.setSelectedState(index);
            this.title[this.selectedIndex] = {
                name: item[this.name],
                isSpread: false,
                _selected: true
            };
            this.callback && this.callback(this.selectedIndex, item);
        },
        cancel: function() {
            this.isSpread = false;
            this.title[this.selectedIndex].isSpread = false;
        },
        calculateSpreadHeight: function(position) {
            for(let i=0;i<this.title.length;i++) {
                this.title[i]._selected = i==position;
            }
            if(this.hasSpread) {
                let height = this.spreadList.length * (1.067+0.027);
                height = height > MAX_MENU_HEIGHT ? MAX_MENU_HEIGHT : height;
                this.$refs.spread.style.height = height + 'rem';
            } else {
                this.$refs.spread.style.height = MAX_MENU_EMPTY_HEIGHT + 'rem';
            }
            this.isSpread = true;
        },
        initBgHeight: function(event) {
            if(!this.isInitMenuHeight) {
                this.isInitMenuHeight = true;
                let parentDom = this.$refs.root;
                let top = parentDom.offsetTop + parentDom.offsetHeight;
                let offsetHeight = document.body.offsetHeight;
                this.$refs.shadow.style.height = (offsetHeight - top - 1) + 'px';
            }   
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '../ani/animation.scss';

    ._menu {
        position: relative;

        .title {
            display: flex;
            width: 100%;
            height: 1.2rem;
            border-bottom: 1px solid #f4f4f4;
            padding: 0.27rem 0;
            background-color: #ffffff;
            box-sizing: border-box;
            span {
                flex: 1;
                display: flex;
                font-size: 0.35rem;
                color: #333333;
                cursor: pointer;
                justify-content: center;
                align-items: center;

                img {
                    position: relative;
                    top: 0.03rem;
                    left: 0.1rem;
                    width: 0.25rem;
                }
            }
            .rightLine {
                border-right: 1px solid #f4f4f4;
                height: 100%;
            }
        }

        .spread {
            position: absolute;
            top: 1.2rem;
            width: 100%;
            background-color: #ffffff;
            z-index: 99;
            overflow: auto;

            .item {
                display: flex;
                justify-content: center;
                align-items: center;
                color: #666666;
                height: 1.067rem;
                cursor: pointer;
                font-size: 0.37rem;
            }
            .empty {
                display: flex;
                height: 100%;
                justify-content: center;
                align-items: center;
                color: #666;
            }
        }

        .bg {
            background-color: rgba($color: #000000, $alpha: 0.7);
        }

        .selected {
            color: #FE9E32 !important;
        }

        .spread::-webkit-scrollbar { 
            display: none;
        }
    }
</style>
