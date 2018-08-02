<template>
    <div class="_multi-menu" ref="root">
        <div class="title">
            <span v-for="(item, index) in title" 
                :class="[item._selected?'selected':'',rightBorder(index)]" @click="changeTab($event, index)">
                {{item.name}} 
                <img v-if="item._selected" :src="item.isSpread?iconDownSelected:iconUpSelected"/>
                <img v-else :src="item.isSpread?iconDown:iconUp"/>
            </span>
        </div>
        <div class="spread bg" v-show="isSpread" @click="cancel" ref="shadow"></div>
        <transition name="top">
        <div class="spread" v-show="isSpread" ref="spread">
            <template v-if="hasSpread()">
                <div v-for="level in columns" class="items" :style="getColor(level-1)">
                    <div class="item" v-for="(item, index) in spreadList[level-1]" 
                        :class="[item._selected?'selected':'', columns==1?'one-column':'']" 
                        @click="selectItemClick(level-1, item)">
                        {{item[name]}}
                    </div>
                </div>
            </template>
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
            COLORS: ['#ffffff', '#f4f4f4', '#f9f9f9'],
            selectedIndex: 0,
            isSpread: false,
            spreadList: new Array(3).fill([]),
            levelIndexs: new Array(3),
            iconUp: iconUp,
            iconDown: iconDown,
            iconUpSelected: iconUpSelected,
            iconDownSelected: iconDownSelected,
            columns: 3,
            isInitMenuHeight: false
        }
    },
    computed: {
        title: function() {
            let result = new Array;
            for(let i=0;i<this.data.length;i++) {
                result[i] = {
                    name: this.data[i][0][this.name],
                    _selected: i == 0,
                    isSpread: false
                };
            }
            return result;
        },
        content: function() {
            for(let i=0;i<this.data.length;i++) {
                this.recursion(this.data[i]);
            }
            return this.data;
        }
    },
    methods: {
        /** 递归初始化所有数据 */
        recursion: function(value) {
            let tmp;
            for(let i=0;i<value.length;i++) {
                tmp = value[i];
                tmp['_selected'] = false;
                if(tmp.list && tmp.list.length > 0) {
                    this.recursion(tmp.list);
                }
            }
            return value;
        },
        /** 获取颜色信息 */
        getColor: function(index) {
            return { backgroundColor: this.COLORS[index] };
        },
        /** 右边距 */
        rightBorder: function(index) {
            return index < this.title.length-1 ? 'rightLine' : '';
        },
        /** 是否展开 */
        hasSpread: function() {
            return this.spreadList[0] && this.spreadList[0].length>0;
        },
         /** 
         * 设置选中tab菜单数据
         */
        calculateLevels: function(index) {
            for(let i=0;i<this.title.length;i++) {
                this.title[i]._selected = i==index;
            }
            let data = this.content[index];
            this.columns = this.calculateLoopLevels(data[0]);
            this.setLevelMenu(-1, data);
        },
        /**
         * 计算第一个项菜单列数
         */
        calculateLoopLevels: function(obj) {
            let loop = 0;
            if(obj && obj[this.name]) {
                loop++;
                if(obj.list && obj.list.length > 0) {
                    loop += this.calculateLoopLevels(obj.list[0]);
                }
            }
            return loop;
        },
        /**
         * 计算层级最大项长度
         */
        calculateSpreadMaxCount: function() {
            let count = 0;
            for(let i=0;i<this.spreadList.length;i++) {
                let length = this.spreadList[i].length;
                if(length > count) {
                    count = length;
                }
            }
            return count;
        },
        /**
         * 设置菜单高度
         */
        calculateHeight: function() {
            if(this.hasSpread) {
                let height = this.calculateSpreadMaxCount() * (1.067+0.027);
                height = height > MAX_MENU_HEIGHT ? MAX_MENU_HEIGHT : height;
                this.$refs.spread.style.height = height + 'rem';
            } else {
                this.$refs.spread.style.height = MAX_MENU_EMPTY_HEIGHT + 'rem';
            }
            this.isSpread = true;
        },
        /** 设置选中项颜色 */
        setSelectedState: function(level, item) {
            for(let i=level;i<this.columns;i++) {
                this.recursion(this.spreadList[i]);
            }
            item._selected = true;
        },
        /** 重置选中项 */
        resetSelectedState: function() {
            for(let i=0;i<this.columns;i++) {
                this.recursion(this.spreadList[i]);
            }
            this.spreadList = new Array(3).fill([]);
        },
        /** 选中tab事件 */
        changeTab: function(event, index) {
            this.resetSelectedState();
            if(this.selectedIndex == index && this.isSpread) {
                this.isSpread = false;
                this.title[index].isSpread = false;
                return ;
            }

            for(let i=0;i<this.title.length;i++) {
                this.title[i].isSpread = false;
            }
            this.title[index].isSpread = true;
            this.selectedIndex = index;
            this.isSpread = false;
            this.$nextTick(()=>{
                this.calculateLevels(index);
                this.calculateHeight();
                this.initBgHeight(event);
            });
        },
        /**
         * 菜单项选中事件
         */
        selectItemClick: function(level, item) {
            this.setSelectedState(level, item);
            if(level == this.columns-1) {
                this.levelIndexs[level] = item;
                this.title[this.selectedIndex] = {
                    name: item[this.name],
                    isSpread: false,
                    _selected: true
                };
                this.$nextTick(()=>{
                    this.callback && this.callback(this.selectedIndex, this.levelIndexs);
                    this.isSpread = false;
                });
            } else {
                this.setLevelMenu(level, [item]);
                this.calculateHeight();
            }
        },
        /** 设置菜单数据 */
        setLevelMenu: function(level, data) {
            for(let i=0;i<this.columns;i++) {
                if(level == -1) {
                    level = 0;
                    this.$set(this.spreadList, i, data || []);
                } else if(i > level) {
                    data = data && data[0] ? data[0].list : [];
                    this.$set(this.spreadList, i, data || []);
                }
                if(i >= level && data && data.length > 0) {
                    this.levelIndexs[i] = data[0];
                }
            }
        },
        cancel: function() {
            this.isSpread = false;
            this.title[this.selectedIndex].isSpread = false;
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

    ._multi-menu {
        position: relative;

        .title {
            display: flex;
            width: 100%;
            height: 1.2rem;
            border-bottom: 1px solid #f4f3f2;
            padding: 0.27rem 0;
            background-color: #ffffff;
            text-align: center;
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
                border-right: 1px solid #f4f3f2;
                height: 0.6rem;
            }
        }

        .spread {
            position: absolute;
            top: 1.2rem;
            width: 100%;
            background-color: #ffffff;
            z-index: 99;
            overflow: auto;
            display: flex;

            .items {
                flex: 1;
                overflow: auto;
            }

            .item {
                display: flex;
                justify-content: left;
                align-items: center;
                color: #666666;
                padding-left: 0.4rem;
                height: 1.067rem;
                cursor: pointer;
                font-size: 0.37rem;
            }

            .one-column {
                justify-content: center;
                padding-left: 0;
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

        .items::-webkit-scrollbar { 
            display: none;
        }
    }
</style>
