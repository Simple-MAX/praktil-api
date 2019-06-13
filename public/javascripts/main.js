var Vue = require("vue/dist/vue.js");

Vue.component("mostPopularAds", require("./components/Most_Popular_Ads.vue"));

const app = new Vue({
    el: "#dashboard"
});