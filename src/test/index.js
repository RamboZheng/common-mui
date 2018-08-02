import './scss/index.scss'
import Vue from 'vue'

$(function() {
    let obj = new IndexObj();
    obj.initVue();
});

function IndexObj() {
}

IndexObj.prototype.initVue = function() {
    let ctx = this;
    new Vue({
        el: '#app',
        methods: {
            goJump: function(type) {
                location.href = "detail.html?type="+type;
            }
        }
    });
};