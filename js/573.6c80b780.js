(self.webpackChunksearchdemo=self.webpackChunksearchdemo||[]).push([[573],{7520:(t,n,a)=>{"use strict";a.r(n),a.d(n,{default:()=>i});var e=a(3645),s=a.n(e)()((function(t){return t[1]}));s.push([t.id,"\n.badge-basic[data-v-31ed257c] {\n\tdisplay: inline-block;\n\tmin-width: 10px;\n\tpadding: 3px 7px;\n\tfont-size: 12px;\n\tfont-weight: bold;\n\tline-height: 1;\n\ttext-align: center;\n\twhite-space: nowrap;\n\tvertical-align: baseline;\n\tborder-radius: 10px;\n}\n.badge-green[data-v-31ed257c] {\n\tbackground-color: #01ff35;\n\tcolor: #fff;\n}\n.badge[data-v-31ed257c] {\n\tcolor: #fff;\n\tbackground-color: #999;\n}\n.badge[data-v-31ed257c]:empty, .badge-green[data-v-31ed257c]:empty {\n\tdisplay: none;\n}\n.badge-wrapper[data-v-31ed257c] {\n\tpadding-top: 4px;\n\tmargin: 0 0.2em;\n\tfloat: left;\n}\n.small[data-v-31ed257c], .other_info .info_data_text[data-v-31ed257c] {\n\tcolor: #837f73;\n\tfont-size: 90%;\n}\n.other_info[data-v-31ed257c] {\n\tmargin-top: 0.2em;\n\tfloat: right;\n}\n.info-span[data-v-31ed257c] {\n\tmargin-left: 0.7em;\n}\n.abstract[data-v-31ed257c] {\n\tline-height: 1.4em;\n\t/* 两端对齐文字，最后一行左对齐 */\n\ttext-justify: distribute-all-lines;\n\t-ms-text-align-last: left;\n\ttext-align: justify;\n\t-moz-text-align-last: left;\n}\n.no-abstract[data-v-31ed257c] {\n\tfont-weight: 200;\n\tfont-size: 0.8em;\n}\n#result_item[data-v-31ed257c] {\n\ttext-align: left;\n\tmargin-left: 4em;\n\tmin-height: 2em;\n\twidth: 600px;\n\tpadding: 0.2em;\n}\n@media screen and (max-width: 360px) {\n#result_item[data-v-31ed257c] {\n\t\tmargin-left: 1em;\n\t\tpadding-left: 1.5em;\n\t\tmax-width: 85%;\n}\n}\n@media screen and (min-width: 361px) and (max-width: 480px) {\n#result_item[data-v-31ed257c] {\n\t\tmargin-right: 1em;\n\t\tmargin-left: 2em;\n\t\tmax-width: 85%;\n}\n}\n@media screen and (min-width: 481px) and (max-width: 690px) {\n#result_item[data-v-31ed257c] {\n\t\tmargin-left: 3em;\n\t\tmax-width: 85%;\n\t\tpadding: 0.4em;\n}\n}\n\n\n",""]);const i=s},6573:(t,n,a)=>{"use strict";a.r(n),a.d(n,{default:()=>i});var e=function(){var t=this,n=t._self._c;return n("div",{attrs:{id:"result_item"}},[n("h3",[n("a",{attrs:{href:t.item.link_url,target:"_blank"}},[t._v(t._s(t.item.title))]),t._v(" "),n("a",{attrs:{href:t.item.link_url,target:"_blank"}},[n("span",{staticClass:"small"},[t._v("  详情...")])])]),t._v(" "),n("div",{staticClass:"abstract",class:0===t.item.description.length?"no-abstract":""},[t._v(t._s(t.item.description||"该网页暂无简介")+"\n\t")]),t._v(" "),n("div",{staticClass:"other_info"},[n("span",{staticClass:"info-span user"},[n("span",{staticClass:"iconfont iconline-user"}),t._v(" "),n("span",{staticClass:"info_data_text"},[t._v(t._s(t.item.user_name))])]),t._v(" "),n("span",{staticClass:"info-span comment_count"},[n("span",{staticClass:"iconfont iconline-news"}),t._v(" "),n("span",{staticClass:"info_data_text"},[t._v(t._s(t.item.comments_count))])]),t._v(" "),n("span",{staticClass:"info-span create_time"},[n("span",{staticClass:"iconfont iconline-calendar"}),t._v(" "),n("span",{staticClass:"info_data_text"},[t._v(t._s(t._f("ts2dtString")(t.item.create_time)))])]),t._v(" "),n("span",{staticClass:"info-span delta_time"},[n("span",{staticClass:"iconfont iconline-time"}),t._v(" "),n("span",{staticClass:"info_data_text"},[t._v(t._s(t._f("toDelta")(t.item.create_time,"cn")))])])]),t._v(" "),n("div",{staticClass:"clearfix"}),t._v(" "),t.item.tags&&0!==t.item.tags.length?n("div",{staticClass:"tags"},t._l(t.item.tags,(function(a){return n("div",{staticClass:"badge-wrapper"},[n("span",{staticClass:"badge-basic",class:[t.special.badges.find((function(t){return t===a.toLowerCase()}))?"badge-green":"badge"]},[t._v(t._s(a))])])})),0):t._e(),t._v(" "),n("div",{staticClass:"clearfix"})])};e._withStripped=!0;const s={name:"search-result-item",props:{item:{required:!0,type:Object}},data:function(){return{special:{badges:["任子恒","Jason Ren","vue.js","vue","HTML5","css","css3","css 3","javascript","字节跳动","bytedance"],animations:["bytedance","字节跳动","前端训练营"]}}},methods:{},filters:{ts2dtString:function(t){return new Date(t).toLocaleDateString()},toDelta:function(t,n){var a=6e4,e=36e5,s=864e5,i=new Date,d=i.getFullYear(),l=d%400==0||d%4==0&&d%100!=0?316224e5:31536e6,c=i.getTime()-t;return 1e3<=c&&c<a?Math.floor(c/1e3)+"秒前":a<=c&&c<e?Math.floor(c/a)+"分钟前":e<=c&&c<s?Math.floor(c/e)+"小时前":s<=c&&c<l?Math.floor(c/s)+"天前":c>=l?Math.floor(c/l)+"年前":(console.log("delta: ".concat(c)),"")}}};a(3817);const i=(0,a(1900).Z)(s,e,[],!1,null,"31ed257c",null).exports},3817:(t,n,a)=>{var e=a(7520);e.__esModule&&(e=e.default),"string"==typeof e&&(e=[[t.id,e,""]]),e.locals&&(t.exports=e.locals),(0,a(5346).Z)("7f2baaaf",e,!1,{})}}]);