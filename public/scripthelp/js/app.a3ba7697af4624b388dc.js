webpackJsonp([1],{"+a2T":function(t,e){},NHnr:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i("7+uW"),a={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},staticRenderFns:[]};var r=i("VU/8")({name:"App"},a,!1,function(t){i("nNf3")},null,null).exports,s=i("/ocq"),o=i("mvHQ"),l=i.n(o),c=i("7t+N"),u=i.n(c),d={data:function(){return{resData:{jobname:"行情圖函數匯總",children:[{jobname:"版塊字元函數",jobid:"1",children:[{name:"版塊字元函數名稱A",note:"版塊字元函數名稱A的介紹。。。"},{name:"版塊字元函數名稱B",note:"版塊字元函數名稱A的介紹。。。"}]},{jobname:"選擇函數",jobid:"2",children:[{name:"選擇知臨函數名稱A",note:"選擇函數名稱A的介紹。。。"},{name:"選擇函數名稱B",note:"選擇函數名稱A的介紹。。。"}]}]},treeUrl:"https://opensourcecache.zealink.com/cache/webcache/hqfunctionhelp/hqfunctionhelp.json",dataId:"",dataName:"",tabDetail:[],filterText:"",isDetails:!1,filterArray:[],hasNextFilter:!1,count:0,activeId:1}},methods:{routerJump:function(t){this.$router.push({path:"/"+t})},dataApiGet:function(t,e){u.a.ajax({url:t,type:"get",dataType:"json",success:function(t){e(t)},error:function(t){console.log(t)}})},TreeFn:function(t){console.log(t),t&&(t.children.map(function(t){t.children.map(function(t){t.note=t.note.replace(new RegExp("\r","g"),"<br>")})}),this.resData=t,console.log(t,"res"),this.toDetailsPage(this.resData.children[0]))},filterKeyWorldFn:function(){var t=this;if(this.filterText.trim())if(0===this.count&&0===this.filterArray.length){console.log(this.filterText,"filterKey");var e=this.replaceReg(this.filterText);this.filterArray=[],this.deepClone(this.resData.children).map(function(i){i.children.map(function(n){n.name.includes(e)&&(-1===t.filterArray.findIndex(function(t){return t.jobid===i.jobid})&&t.filterArray.push(i))})}),this.filterArray.map(function(i){i.children.map(function(i){i.name=t.brightenKeyword(i.name,e)})}),console.table(this.filterArray),this.filterArray.length>0?(this.hasNextFilter=!0,this.activeId=this.filterArray[0].jobid,this.toDetailsPage(this.filterArray[0])):(this.hasNextFilter=!1,this.$message({message:"無相關匹配結果",type:"warning"}),this.$router.push({path:"/"}))}else this.toNextFilter()},toDetailsPage:function(t){console.log("item",t),this.activeId=t.jobid,this.dataId=t.jobid,this.tabDetail=t.children,this.dataName=t.jobname,this.isDetails=!0,this.routerJump(this.dataId)},toNextFilter:function(){this.count++,this.count<this.filterArray.length?(console.log(this.count),this.activeId=this.filterArray[this.count].jobid,this.toDetailsPage(this.filterArray[this.count])):(this.$message({message:"查找完畢",type:"warning"}),this.hasNextFilter=!1,this.filterArray=[],this.count=0)},brightenKeyword:function(t,e){var i=new RegExp(e,"i");if(t)return t.replace(i,'<span style="color: #fff; background-color:cornflowerblue;">'+e+"</span>")},deepClone:function(t){return t.map(function(t){return JSON.parse(l()(t))})},replaceReg:function(t){return t.toLowerCase().replace(/[a-z]/g,function(t){return t.toUpperCase()})}},components:{},created:function(){var t=1e6*Math.random().toFixed(6);this.dataApiGet(this.treeUrl+"?"+t,this.TreeFn)},mounted:function(){},watch:{filterText:function(t){t.trim()||(this.hasNextFilter=!1,this.filterArray=[],this.count=0)}}},h={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"function-help"},[i("div",{staticClass:"aside"},[i("div",{staticClass:"handle-box"},[i("div",{staticClass:"filterBtn",on:{keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13,e.key))return null;e.stopPropagation(),t.filterKeyWorldFn(e)}}},[i("el-input",{attrs:{placeholder:"輸入關鍵字進行過濾"},model:{value:t.filterText,callback:function(e){t.filterText=e},expression:"filterText"}},[i("i",{staticClass:"el-input__icon el-icon-search",attrs:{slot:"suffix"},on:{click:function(e){e.stopPropagation(),t.filterKeyWorldFn(e)}},slot:"suffix"})])],1),t._v(" "),t.hasNextFilter&&t.filterArray.length>1?i("div",{staticClass:"nextBtn",on:{click:function(e){e.stopPropagation(),t.toNextFilter(e)}}},[i("el-button",{attrs:{plain:""}},[t._v("下一個")])],1):t._e()]),t._v(" "),i("div",{staticClass:"class-list"},t._l(t.resData.children,function(e,n){return i("div",{key:n,staticClass:"function-class",class:{activeItem:t.activeId===e.jobid},on:{click:function(i){t.toDetailsPage(e)}}},[t._v("\n        "+t._s(e.jobname)+"\n      ")])}))]),t._v(" "),i("div",{staticClass:"main"},[i("div",{staticClass:"content"},[i("keep-alive",[i("router-view",{attrs:{dataId:t.dataId,tabDetail:t.tabDetail,dataName:t.dataName}})],1)],1)])])},staticRenderFns:[]};var f=i("VU/8")(d,h,!1,function(t){i("+a2T")},null,null).exports,p={data:function(){return{}},props:{dataId:{type:String,default:""},dataName:{type:String,default:""},tabDetail:{type:Array,default:[]}},methods:{},components:{},created:function(){},watch:{}},m={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"details"},[i("div",{staticClass:"detail-content"},[i("div",{staticClass:"title"},[t._v(t._s(t.dataName))]),t._v(" "),i("div",{staticClass:"detail-box"},t._l(t.tabDetail,function(e,n){return i("div",{key:n,staticClass:"desc"},[i("h4",{staticClass:"desc-title",domProps:{innerHTML:t._s(e.name)}}),t._v(" "),i("div",{domProps:{innerHTML:t._s(e.note)}})])}))])])},staticRenderFns:[]};var v=i("VU/8")(p,m,!1,function(t){i("eRCB")},null,null).exports;n.default.use(s.a);var g=new s.a({routes:[{path:"/",component:f,children:[{path:":id",component:v}]}]}),y=i("zL8q"),b=i.n(y);i("tvR6");n.default.config.productionTip=!1,n.default.use(b.a),new n.default({el:"#app",router:g,components:{App:r},template:"<App/>"})},eRCB:function(t,e){},nNf3:function(t,e){},tvR6:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.a3ba7697af4624b388dc.js.map