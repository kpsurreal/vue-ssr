(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{220:function(n,t,e){"use strict";e.r(t);var i=e(221),r=e(225),a=(e(227),e(196)),o=Object(a.default)(r.default,i.render,i.staticRenderFns,!1,null,"361b972d",null);t.default=o.exports},221:function(n,t,e){"use strict";e.r(t);var i=e(222);e.d(t,"render",function(){return i.render}),e.d(t,"staticRenderFns",function(){return i.staticRenderFns})},222:function(n,t,e){"use strict";e.r(t),e.d(t,"render",function(){return i}),e.d(t,"staticRenderFns",function(){return r});var i=function(){var n=this,t=n.$createElement,i=n._self._c||t;return i("div",{staticClass:"content"},[i("div",{staticClass:"top-bar"},[i("img",{staticClass:"top-img position-left",attrs:{src:e(223),height:"16",width:"16",alt:""},on:{click:n.backAction}}),n._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:n.searchStr,expression:"searchStr"}],staticClass:"top-input",attrs:{type:"text",placeholder:"搜索币种快速预警"},domProps:{value:n.searchStr},on:{input:function(t){t.target.composing||(n.searchStr=t.target.value)}}}),n._v(" "),i("img",{directives:[{name:"show",rawName:"v-show",value:!n.searchStr,expression:"!searchStr"}],staticClass:"top-img position-right",attrs:{src:e(203),height:"18",width:"18",alt:""}}),n._v(" "),i("img",{directives:[{name:"show",rawName:"v-show",value:n.searchStr,expression:"searchStr"}],staticClass:"top-img position-right",attrs:{src:e(224),height:"18",width:"18",alt:""}})]),n._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:0===n.list.length,expression:"list.length === 0"}],staticClass:"search-list"},[i("ul",[n._l(n.coinNames,function(t,e){return n._l(t,function(t,e){return i("li",{key:n.coinName,on:{click:function(e){n.showList(t.symbol)}}},[n._m(0,!0),n._v(" "),i("span",[n._v(n._s(e))])])})})],2)]),n._v(" "),i("home-list",{directives:[{name:"show",rawName:"v-show",value:0!==n.list.length,expression:"list.length !== 0"}],attrs:{total:n.total,list:n.list,loadAction:"Search/getSearchList",loadingAction:"Search/setLoading"}})],1)},r=[function(){var n=this.$createElement,t=this._self._c||n;return t("i",{staticClass:"serch-icon"},[t("img",{attrs:{src:e(203),height:"18",width:"18",alt:""}})])}]},224:function(n,t){n.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAclJREFUOBGlUz1Lw1AUfXlJP0AKkl8iOjlW0ArqGjfbIVJKi7uDk3+hoRQCraNZa6tOjm7iLwklXfqVxHMeeaHULuKD9L3ec86999yXGGLH6na7x6VSqZGm6TVhwzCeF4vFsNPpfG7Tjc1Av98/lFI+QlDDbsZxrGDTNEWSJDESvmN/aDabX1qXJ/B9/wrBoWVZ9mq1EiBrjtqRVBQKBbFer0MEGq7rjgioBJ7nHaDlD5D2dVWl2vHDbpB8CkvVdrv9bQRBYIZh+FIul8+Xy6WSsBosCJ0ss5B3VSwWxXw+f7Nt+1JGUXQE8tmmGMI7tPpKIh+cx/B+C57yRS411FoAXPiWIKnqrIxYbTabtRAYoJsUWAuJPJzzmWUa14IfR4uZgW1jHhfg7gGr4xEgP2GAVd0ledRQK/ln1wKYX8Nm5W2uBBigQh7nwHCNI1SoAxsAGMJrA1MfE9OLGmphWfogJxqAf7Y2AaEH3yewU61UKj3E+BJpGi0k1P7/Gh3Hwdzie2Sc6hZpn8PUi2c9EnLIpYZaNUS+USDfgBTy3uFNa/OdMWLkkJtpRH4LfLeR9RQDnIAcZ0NSybJzTIwc/R0w++9SCP7lc/4BqmktawOBiNAAAAAASUVORK5CYII="},225:function(n,t,e){"use strict";e.r(t);var i=e(226);t.default=i.default},226:function(n,t,e){"use strict";e.r(t);var i=e(146),r=e.n(i),a=e(207),o=e(206);t.default={name:"search",components:{HomeList:a.default},props:{},data:function(){return{searchStr:"",timer:null}},computed:r()({},Object(o.mapState)("Search",["coinNames","total","list"])),watch:{searchStr:function(n){var t=this;this.$store.commit("Search/resetList"),this.timer&&clearTimeout(this.timer),n&&(this.timer=setTimeout(function(){t.getCoinNames()},500))}},methods:{backAction:function(){this.list.length?this.$store.commit("Search/resetList"):this.$router.push("/")},getCoinNames:function(){this.$store.dispatch("Search/getCoinNames",this.searchStr)},showList:function(n){this.$store.dispatch("Search/showList",n)}}}},227:function(n,t,e){"use strict";e.r(t);var i=e(228),r=e.n(i);for(var a in i)"default"!==a&&function(n){e.d(t,n,function(){return i[n]})}(a);t.default=r.a},228:function(n,t,e){var i=e(229);"string"==typeof i&&(i=[[n.i,i,""]]),i.locals&&(n.exports=i.locals);(0,e(84).default)("40d72ae8",i,!0,{})},229:function(n,t,e){(n.exports=e(83)(!0)).push([n.i,"\n.content[data-v-361b972d] {\n  height: 100%;\n}\n.top-bar[data-v-361b972d] {\n  position: relative;\n  padding-left: 1rem;\n  padding-top: 1rem;\n  padding-bottom: 1rem;\n  height: 4rem;\n  line-height: 2rem;\n}\n.top-bar .top-img[data-v-361b972d] {\n  vertical-align: middle;\n}\n.top-bar .top-img.position-right[data-v-361b972d] {\n  position: absolute;\n  right: 2rem;\n  top: 1.5rem;\n}\n.top-bar .top-img.position-left[data-v-361b972d] {\n  position: absolute;\n  left: 1rem;\n  top: 1.5rem;\n}\n.top-bar .top-input[data-v-361b972d] {\n  width: calc(100% - (1rem) * 3);\n  height: 2rem;\n  background: #f4f4f4;\n  border-radius: 2rem ;\n  margin-left: 1.5rem;\n  padding-left: 1rem;\n  border: none;\n}\n.search-list li[data-v-361b972d] {\n  padding-left: 1rem;\n  padding-right: 1rem;\n  padding-top: .5rem;\n  padding-bottom: .5rem;\n  color: #9A9A9A;\n}\n.search-list li .serch-icon[data-v-361b972d] {\n  vertical-align: middle;\n  margin-right: .5rem;\n}\n","",{version:3,sources:["/Users/jiangjian/Desktop/lucoins/vue-ssr/src/components/Search.vue?vue&type=style&index=0&id=361b972d&lang=less&scoped=true","/Users/jiangjian/Desktop/lucoins/vue-ssr/src/components/Search.vue"],names:[],mappings:";AAqFA;EACE,aAAA;CCpFD;ADsFD;EACE,mBAAA;EACA,mBAAA;EACA,kBAAA;EACA,qBAAA;EACA,aAAA;EACA,kBAAA;CCpFD;AD8ED;EAQI,uBAAA;CCnFH;ADoFG;EACE,mBAAA;EACA,YAAA;EACA,YAAA;CClFL;ADoFG;EACE,mBAAA;EACA,WAAA;EACA,YAAA;CClFL;ADiED;EAqBI,+BAAA;EACA,aAAA;EACA,oBAAA;EACA,qBAAA;EACA,oBAAA;EACA,mBAAA;EACA,aAAA;CCnFH;ADsFD;EAEI,mBAAA;EACA,oBAAA;EACA,mBAAA;EACA,sBAAA;EACA,eAAA;CCrFH;AD+ED;EAQM,uBAAA;EACA,oBAAA;CCpFL",file:"Search.vue?vue&type=style&index=0&id=361b972d&lang=less&scoped=true",sourcesContent:["\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.content{\n  height: 100%;\n}\n.top-bar{\n  position:relative;\n  padding-left: 1rem;\n  padding-top: 1rem;\n  padding-bottom: 1rem;\n  height:4rem;\n  line-height: 2rem;\n  .top-img{\n    vertical-align: middle;\n    &.position-right{\n      position: absolute;\n      right: 2rem;\n      top: 1.5rem;\n    }\n    &.position-left{\n      position: absolute;\n      left: 1rem;\n      top: 1.5rem;\n    }\n  }\n  .top-input{\n    width: calc(100% - (1rem) * 3);\n    height: 2rem;\n    background:rgba(244,244,244,1);\n    border-radius: 2rem ;\n    margin-left: 1.5rem;\n    padding-left:1rem;\n    border:none;\n  }\n}\n.search-list {\n  li{\n    padding-left: 1rem;\n    padding-right: 1rem;\n    padding-top: .5rem;\n    padding-bottom: .5rem;\n    color: #9A9A9A;\n    .serch-icon{\n      vertical-align: middle;\n      margin-right: .5rem;\n    }\n  }\n}\n",".content {\n  height: 100%;\n}\n.top-bar {\n  position: relative;\n  padding-left: 1rem;\n  padding-top: 1rem;\n  padding-bottom: 1rem;\n  height: 4rem;\n  line-height: 2rem;\n}\n.top-bar .top-img {\n  vertical-align: middle;\n}\n.top-bar .top-img.position-right {\n  position: absolute;\n  right: 2rem;\n  top: 1.5rem;\n}\n.top-bar .top-img.position-left {\n  position: absolute;\n  left: 1rem;\n  top: 1.5rem;\n}\n.top-bar .top-input {\n  width: calc(100% - (1rem) * 3);\n  height: 2rem;\n  background: #f4f4f4;\n  border-radius: 2rem ;\n  margin-left: 1.5rem;\n  padding-left: 1rem;\n  border: none;\n}\n.search-list li {\n  padding-left: 1rem;\n  padding-right: 1rem;\n  padding-top: .5rem;\n  padding-bottom: .5rem;\n  color: #9A9A9A;\n}\n.search-list li .serch-icon {\n  vertical-align: middle;\n  margin-right: .5rem;\n}\n"],sourceRoot:""}])}}]);