<template>
    <div class="_warn">
        <div class="container">
            <img :src="icon"/>
            <div v-if="title" class="title" v-html="title"></div>
            <div v-if="content" class="content" v-html="content"></div>
        </div>
    </div>
</template>

<script>
import iconSuccess from '../../../res/_icon_success.png'
import iconEmpty from '../../../res/_icon_empty.png'
import iconFailure from '../../../res/_icon_failure.png'

export default {
    props: {
        type: String,
        title: String,
        content: String
    },
    computed: {
        icon: function() {
            if(this.type == '1') {
                return iconEmpty;
            } else if(this.type == '2') {
                return iconFailure;
            } else {
                return iconSuccess;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    ._warn {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #ffffff;
        position: absolute;
        bottom: 0;
        top: 0;
        left: 0;
        right: 0;

        .container {
            display: inline-block;
            text-align: center;
            margin-top: -2rem;

            img {
                width: 5.47rem;
                height: 4.53rem;
            }

            .title {
                margin-top: 0.67rem;
                color: #333333;
                font-size: 0.43rem;
                font-weight: bold;
            }
            .content {
                margin-top: 0.27rem;
                color: #999999;
                font-size: 0.35rem;
            }
        }
    }
</style>
