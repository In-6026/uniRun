(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uni_modules/uview-ui/components/u-swiper/u-swiper"],{"147e":function(e,t,n){"use strict";n.d(t,"b",(function(){return u})),n.d(t,"c",(function(){return o})),n.d(t,"a",(function(){return i}));var i={uLoadingIcon:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-loading-icon/u-loading-icon")]).then(n.bind(null,"1d7e"))},uSwiperIndicator:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-swiper-indicator/u-swiper-indicator")]).then(n.bind(null,"b5d9"))}},u=function(){var e=this,t=e.$createElement,n=(e._self._c,e.$u.addUnit(e.height)),i=e.$u.addUnit(e.radius),u=e.loading?null:e.$u.addUnit(e.height),o=e.loading?null:e.$u.addUnit(e.previousMargin),r=e.loading?null:e.$u.addUnit(e.nextMargin),a=e.loading?null:e.__map(e.list,(function(t,n){var i=e.__get_orig(t),u=e.__get_style([e.itemStyle(n)]),o=e.getItemType(t),r="image"===o?e.$u.addUnit(e.height):null,a="image"===o?e.$u.addUnit(e.radius):null,d="image"===o?e.getSource(t):null,c=e.getItemType(t),l="video"===c?e.$u.addUnit(e.height):null,s="video"===c?e.getSource(t):null,g="video"===c?e.getPoster(t):null,f="video"===c?e.showTitle&&e.$u.test.object(t):null,m=e.showTitle&&e.$u.test.object(t),p=t.g9&&t.title&&e.$u.test.image(e.getSource(t));return{$orig:i,s0:u,m0:o,g5:r,g6:a,m1:d,m2:c,g7:l,m3:s,m4:g,g8:f,g9:m,g10:p}})),d=e.__get_style([e.$u.addStyle(e.indicatorStyle)]);e.$mp.data=Object.assign({},{$root:{g0:n,g1:i,g2:u,g3:o,g4:r,l0:a,s1:d}})},o=[]},6669:function(e,t,n){"use strict";var i=n("aae7"),u=n.n(i);u.a},8726:function(e,t,n){"use strict";n.r(t);var i=n("147e"),u=n("a04f");for(var o in u)"default"!==o&&function(e){n.d(t,e,(function(){return u[e]}))}(o);n("6669");var r,a=n("f0c5"),d=Object(a["a"])(u["default"],i["b"],i["c"],!1,null,"ed671f4a",null,!1,i["a"],r);t["default"]=d.exports},a04f:function(e,t,n){"use strict";n.r(t);var i=n("be3e"),u=n.n(i);for(var o in i)"default"!==o&&function(e){n.d(t,e,(function(){return i[e]}))}(o);t["default"]=u.a},aae7:function(e,t,n){},be3e:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=u(n("f7cb"));function u(e){return e&&e.__esModule?e:{default:e}}var o={name:"u-swiper",mixins:[e.$u.mpMixin,e.$u.mixin,i.default],data:function(){return{currentIndex:0}},watch:{current:function(e,t){e!==t&&(this.currentIndex=e)}},computed:{itemStyle:function(){var t=this;return function(n){var i={};return t.nextMargin&&t.previousMargin&&(i.borderRadius=e.$u.addUnit(t.radius),n!==t.currentIndex&&(i.transform="scale(0.92)")),i}}},methods:{getItemType:function(t){return"string"===typeof t?e.$u.test.video(this.getSource(t))?"video":"image":"object"===typeof t&&this.keyName?t.type?"image"===t.type?"image":"video"===t.type?"video":"image":e.$u.test.video(this.getSource(t))?"video":"image":void 0},getSource:function(t){return"string"===typeof t?t:"object"===typeof t&&this.keyName?t[this.keyName]:(e.$u.error("请按格式传递列表参数"),"")},change:function(e){var t=e.detail.current;this.pauseVideo(this.currentIndex),this.currentIndex=t,this.$emit("change",e.detail)},pauseVideo:function(t){var n=this.getSource(this.list[t]);if(e.$u.test.video(n)){var i=e.createVideoContext("video-".concat(t),this);i.pause()}},getPoster:function(e){return"object"===typeof e&&e.poster?e.poster:""},clickHandler:function(e){this.$emit("click",e)}}};t.default=o}).call(this,n("543d")["default"])}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uni_modules/uview-ui/components/u-swiper/u-swiper-create-component',
    {
        'uni_modules/uview-ui/components/u-swiper/u-swiper-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("8726"))
        })
    },
    [['uni_modules/uview-ui/components/u-swiper/u-swiper-create-component']]
]);