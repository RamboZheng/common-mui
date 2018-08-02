<template>
<transition name="fade">
    <div class="toast" v-if="isShow">
        <div class="content">
            <div>
                <img :src="icon"/><br/>
                <span v-html="value"></span>
            </div>
        </div>
    </div>
</transition>
</template>

<script>
import iconRight from '../../../res/_icon_right.png'

export default {
    props: {
        value: String
    },
    data() {
        return {
            isShow: false,
            icon: iconRight
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '../../ani/animation.scss';

    .toast {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;

        .content {
            background-color: rgba(0, 0, 0, 0.8);
            border-radius: 0.27rem;
            color: #ffffff;
            font-size: 0.37rem;
            display: flex;
            justify-content: center;
            width: 4rem;
            height: 3.8rem;

            img {
                width: 1.3rem;
                margin-top: 0.6rem;
            }

            span {
                display: block;
                margin-top: 0.3rem;
                padding: 0 0.4rem;
            }
        }
    }
</style>
