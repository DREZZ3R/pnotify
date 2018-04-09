let PNotify,posTimer,onDocumentLoaded=()=>{PNotify.defaultStack.context=document.body,window.addEventListener("resize",()=>{posTimer&&clearTimeout(posTimer),posTimer=setTimeout(()=>{PNotify.positionAll()},10)})},createStackOverlay=t=>{const e=document.createElement("div");e.classList.add("ui-pnotify-modal-overlay"),t.context!==document.body&&(e.style.height=t.context.scrollHeight+"px",e.style.width=t.context.scrollWidth+"px"),e.addEventListener("click",()=>{t.overlayClose&&PNotify.closeStack(t)}),t.overlay=e},insertStackOverlay=t=>{t.overlay.parentNode!==t.context&&(t.overlay=t.context.insertBefore(t.overlay,t.context.firstChild))},removeStackOverlay=t=>{t.overlay.parentNode&&t.overlay.parentNode.removeChild(t.overlay)};const getDefaultArgs=(t,e)=>("object"!=typeof t&&(t={text:t}),e&&(t.type=e),{target:document.body,data:t});function _styles(t){return"object"==typeof t?t:PNotify.styling[t]}function _icons(t){return"object"==typeof t?t:PNotify.icons[t]}function data(){const t=Object.assign({_state:"initializing",_timer:null,_animTimer:null,_animating:!1,_animatingClass:"",_moveClass:"",_timerHide:!1,_moduleClasses:[],_moduleIsNoticeOpen:!1,_modules:{},_modulesPrependContainer:PNotify.modulesPrependContainer,_modulesAppendContainer:PNotify.modulesAppendContainer},PNotify.defaults);return t.modules=Object.assign({},PNotify.defaults.modules),t}var methods={runModules(t){if("init"===t){for(let t in PNotify.modules)if(PNotify.modules.hasOwnProperty(t)&&"function"==typeof PNotify.modules[t].init){const e=PNotify.modules[t].init(this);this.initModule(e)}}else{const e=this.get("_modules");for(let i in e){if(!e.hasOwnProperty(i))continue;const n=Object.assign({_notice:this,_options:this.get()},this.get("modules")[i]);e[i].set(n),"function"==typeof e[i][t]&&e[i][t]()}}},initModule(t){const e=this.get("modules");e.hasOwnProperty(t.constructor.key)||(e[t.constructor.key]={});const i=Object.assign({_notice:this,_options:this.get()},e[t.constructor.key]);t.initModule(i),this.get("_modules")[t.constructor.key]=t},update(t){const e=this.get("hide"),i=this.get("icon");this.set(t),this.runModules("update"),this.get("hide")?e||this.queueClose():this.cancelClose(),this.queuePosition();const n=this.get("icon");return n!==i&&(!0===n&&"fontawesome5"===this.get("icons")||"string"==typeof n&&n.match(/(^| )fa[srlb]($| )/))&&(this.set({icon:!1}),this.set({icon:n})),this},open(){if("opening"===this.get("_state"))return;if("open"===this.get("_state"))return void(this.get("hide")&&this.queueClose());this.set({_state:"opening",_animatingClass:"ui-pnotify-initial-hidden"}),this.runModules("beforeOpen");let t=this.get("stack");if(!this.refs.elem.parentNode||t&&t.context&&t.context!==this.refs.elem.parentNode)if(t&&t.context)t.context.appendChild(this.refs.elem);else{if(!document.body)throw new Error("No context to open this notice in.");document.body.appendChild(this.refs.elem)}return setTimeout(()=>{t&&(t.animation=!1,PNotify.positionAll(),t.animation=!0),this.animateIn(()=>{this.get("hide")&&this.queueClose(),this.set({_state:"open"}),this.runModules("afterOpen")})},0),this},remove(t){return this.close(t)},close(t){if("closing"!==this.get("_state")&&"closed"!==this.get("_state"))return this.set({_state:"closing",_timerHide:!!t}),this.runModules("beforeClose"),this.get("_timer")&&clearTimeout&&(clearTimeout(this.get("_timer")),this.set({_timer:null})),this.animateOut(()=>{if(this.set({_state:"closed"}),this.runModules("afterClose"),this.queuePosition(),this.get("remove")&&this.refs.elem.parentNode.removeChild(this.refs.elem),this.runModules("beforeDestroy"),this.get("destroy")&&null!==PNotify.notices){const t=PNotify.notices.indexOf(this);-1!==t&&PNotify.notices.splice(t,1)}this.runModules("afterDestroy")}),this},animateIn(t){this.set({_animating:"in"});const e=()=>{if(this.refs.elem.removeEventListener("transitionend",e),this.get("_animTimer")&&clearTimeout(this.get("_animTimer")),"in"!==this.get("_animating"))return;let i=this.get("_moduleIsNoticeOpen");if(!i){const t=this.refs.elem.getBoundingClientRect();for(let e in t)if(t[e]>0){i=!0;break}}i?(t&&t.call(),this.set({_animating:!1})):this.set({_animTimer:setTimeout(e,40)})};"fade"===this.get("animation")?(this.refs.elem.addEventListener("transitionend",e),this.set({_animatingClass:"ui-pnotify-in"}),this.refs.elem.style.opacity,this.set({_animatingClass:"ui-pnotify-in ui-pnotify-fade-in"}),this.set({_animTimer:setTimeout(e,650)})):(this.set({_animatingClass:"ui-pnotify-in"}),e())},animateOut(t){this.set({_animating:"out"});const e=()=>{if(this.refs.elem.removeEventListener("transitionend",e),this.get("_animTimer")&&clearTimeout(this.get("_animTimer")),"out"!==this.get("_animating"))return;let i=this.get("_moduleIsNoticeOpen");if(!i){const t=this.refs.elem.getBoundingClientRect();for(let e in t)if(t[e]>0){i=!0;break}}if(this.refs.elem.style.opacity&&"0"!==this.refs.elem.style.opacity&&i)this.set({_animTimer:setTimeout(e,40)});else{this.set({_animatingClass:""});const e=this.get("stack");if(e&&e.overlay){let t=!1;for(let i=0;i<PNotify.notices.length;i++){const n=PNotify.notices[i];if(n!==this&&n.get("stack")===e&&"closed"!==n.get("_state")){t=!0;break}}t||removeStackOverlay(e)}t&&t.call(),this.set({_animating:!1})}};"fade"===this.get("animation")?(this.refs.elem.addEventListener("transitionend",e),this.set({_animatingClass:"ui-pnotify-in"}),this.set({_animTimer:setTimeout(e,650)})):(this.set({_animatingClass:""}),e())},position(){let t=this.get("stack"),e=this.refs.elem;if(!t)return;if(t.context||(t.context=document.body),"number"!=typeof t.nextpos1&&(t.nextpos1=t.firstpos1),"number"!=typeof t.nextpos2&&(t.nextpos2=t.firstpos2),"number"!=typeof t.addpos2&&(t.addpos2=0),!e.classList.contains("ui-pnotify-in")&&!e.classList.contains("ui-pnotify-initial-hidden"))return this;t.modal&&(t.overlay||createStackOverlay(t),insertStackOverlay(t)),e.getBoundingClientRect(),t.animation&&this.set({_moveClass:"ui-pnotify-move"});let i,n=t.context===document.body?window.innerHeight:t.context.scrollHeight,o=t.context===document.body?window.innerWidth:t.context.scrollWidth;if(t.dir1){let s;switch(i={down:"top",up:"bottom",left:"right",right:"left"}[t.dir1],t.dir1){case"down":s=e.offsetTop;break;case"up":s=n-e.scrollHeight-e.offsetTop;break;case"left":s=o-e.scrollWidth-e.offsetLeft;break;case"right":s=e.offsetLeft}void 0===t.firstpos1&&(t.firstpos1=s,t.nextpos1=t.firstpos1)}if(t.dir1&&t.dir2){let i,s={down:"top",up:"bottom",left:"right",right:"left"}[t.dir2];switch(t.dir2){case"down":i=e.offsetTop;break;case"up":i=n-e.scrollHeight-e.offsetTop;break;case"left":i=o-e.scrollWidth-e.offsetLeft;break;case"right":i=e.offsetLeft}void 0===t.firstpos2&&(t.firstpos2=i,t.nextpos2=t.firstpos2);const r=t.nextpos1+e.offsetHeight+(void 0===t.spacing1?25:t.spacing1),a=t.nextpos1+e.offsetWidth+(void 0===t.spacing1?25:t.spacing1);switch((("down"===t.dir1||"up"===t.dir1)&&r>n||("left"===t.dir1||"right"===t.dir1)&&a>o)&&(t.nextpos1=t.firstpos1,t.nextpos2+=t.addpos2+(void 0===t.spacing2?25:t.spacing2),t.addpos2=0),"number"==typeof t.nextpos2&&(e.style[s]=t.nextpos2+"px",t.animation||e.style[s]),t.dir2){case"down":case"up":e.offsetHeight+(parseFloat(e.style.marginTop,10)||0)+(parseFloat(e.style.marginBottom,10)||0)>t.addpos2&&(t.addpos2=e.offsetHeight);break;case"left":case"right":e.offsetWidth+(parseFloat(e.style.marginLeft,10)||0)+(parseFloat(e.style.marginRight,10)||0)>t.addpos2&&(t.addpos2=e.offsetWidth)}}else if(t.dir1){let i,o;switch(t.dir1){case"down":case"up":o=["left","right"],i=t.context.scrollWidth/2-e.offsetWidth/2;break;case"left":case"right":o=["top","bottom"],i=n/2-e.offsetHeight/2}e.style[o[0]]=i+"px",e.style[o[1]]="auto",t.animation||e.style[o[0]]}if(t.dir1)switch("number"==typeof t.nextpos1&&(e.style[i]=t.nextpos1+"px",t.animation||e.style[i]),t.dir1){case"down":case"up":t.nextpos1+=e.offsetHeight+(void 0===t.spacing1?25:t.spacing1);break;case"left":case"right":t.nextpos1+=e.offsetWidth+(void 0===t.spacing1?25:t.spacing1)}else{let i=o/2-e.offsetWidth/2,s=n/2-e.offsetHeight/2;e.style.left=i+"px",e.style.top=s+"px",t.animation||e.style.left}return this},queuePosition(t){return posTimer&&clearTimeout(posTimer),t||(t=10),posTimer=setTimeout(()=>{PNotify.positionAll()},t),this},cancelRemove(){return this.cancelClose()},cancelClose(){return this.get("_timer")&&clearTimeout(this.get("_timer")),this.get("_animTimer")&&clearTimeout(this.get("_animTimer")),"closing"===this.get("_state")&&this.set({_state:"open",_animating:!1,_animatingClass:"fade"===this.get("animation")?"ui-pnotify-in ui-pnotify-fade-in":"ui-pnotify-in"}),this},queueRemove(){return this.queueClose()},queueClose(){return this.cancelClose(),this.set({_timer:setTimeout(()=>this.close(!0),isNaN(this.get("delay"))?0:this.get("delay"))}),this},addModuleClass(...t){const e=this.get("_moduleClasses");for(let i=0;i<t.length;i++){let n=t[i];-1===e.indexOf(n)&&e.push(n)}this.set({_moduleClasses:e})},removeModuleClass(...t){const e=this.get("_moduleClasses");for(let i=0;i<t.length;i++){let n=t[i];const o=e.indexOf(n);-1!==o&&e.splice(o,1)}this.set({_moduleClasses:e})},hasModuleClass(...t){const e=this.get("_moduleClasses");for(let i=0;i<t.length;i++){let n=t[i];if(-1===e.indexOf(n))return!1}return!0}};function oncreate(){this.on("mouseenter",t=>{if(this.get("mouseReset")&&"out"===this.get("_animating")){if(!this.get("_timerHide"))return;this.cancelClose()}this.get("hide")&&this.get("mouseReset")&&this.cancelClose()}),this.on("mouseleave",t=>{this.get("hide")&&this.get("mouseReset")&&"out"!==this.get("_animating")&&this.queueClose(),PNotify.positionAll()});let t=this.get("stack");t&&"top"===t.push?PNotify.notices.splice(0,0,this):PNotify.notices.push(this),this.runModules("init"),this.set({_state:"closed"}),this.get("autoDisplay")&&this.open()}function setup(t){(PNotify=t).VERSION="4.0.0-alpha.2",PNotify.defaultStack={dir1:"down",dir2:"left",firstpos1:25,firstpos2:25,spacing1:36,spacing2:36,push:"bottom",context:window&&document.body},PNotify.defaults={title:!1,titleTrusted:!1,text:!1,textTrusted:!1,styling:"brighttheme",icons:"brighttheme",addClass:"",cornerClass:"",autoDisplay:!0,width:"360px",minHeight:"16px",type:"notice",icon:!0,animation:"fade",animateSpeed:"normal",shadow:!0,hide:!0,delay:8e3,mouseReset:!0,remove:!0,destroy:!0,stack:PNotify.defaultStack,modules:{}},PNotify.notices=[],PNotify.modules={},PNotify.modulesPrependContainer=[],PNotify.modulesAppendContainer=[],PNotify.alert=(t=>new PNotify(getDefaultArgs(t))),PNotify.notice=(t=>new PNotify(getDefaultArgs(t,"notice"))),PNotify.info=(t=>new PNotify(getDefaultArgs(t,"info"))),PNotify.success=(t=>new PNotify(getDefaultArgs(t,"success"))),PNotify.error=(t=>new PNotify(getDefaultArgs(t,"error"))),PNotify.removeAll=(()=>{PNotify.closeAll()}),PNotify.closeAll=(()=>{for(let t=0;t<PNotify.notices.length;t++)PNotify.notices[t].close&&PNotify.notices[t].close(!1)}),PNotify.removeStack=(t=>{PNotify.closeStack(t)}),PNotify.closeStack=(t=>{if(!1!==t)for(let e=0;e<PNotify.notices.length;e++)PNotify.notices[e].close&&PNotify.notices[e].get("stack")===t&&PNotify.notices[e].close(!1)}),PNotify.positionAll=(()=>{if(posTimer&&clearTimeout(posTimer),posTimer=null,PNotify.notices.length>0){for(let t=0;t<PNotify.notices.length;t++){let e=PNotify.notices[t].get("stack");e&&(e.overlay&&removeStackOverlay(e),e.nextpos1=e.firstpos1,e.nextpos2=e.firstpos2,e.addpos2=0)}for(let t=0;t<PNotify.notices.length;t++)PNotify.notices[t].position()}else delete PNotify.defaultStack.nextpos1,delete PNotify.defaultStack.nextpos2}),PNotify.styling={brighttheme:{container:"brighttheme",notice:"brighttheme-notice",info:"brighttheme-info",success:"brighttheme-success",error:"brighttheme-error"},bootstrap3:{container:"alert",notice:"alert-warning",info:"alert-info",success:"alert-success",error:"alert-danger",icon:"ui-pnotify-icon-bs3"},bootstrap4:{container:"alert",notice:"alert-warning",info:"alert-info",success:"alert-success",error:"alert-danger",icon:"ui-pnotify-icon-bs4",title:"ui-pnotify-title-bs4"}},PNotify.icons={brighttheme:{notice:"brighttheme-icon-notice",info:"brighttheme-icon-info",success:"brighttheme-icon-success",error:"brighttheme-icon-error"},bootstrap3:{notice:"glyphicon glyphicon-exclamation-sign",info:"glyphicon glyphicon-info-sign",success:"glyphicon glyphicon-ok-sign",error:"glyphicon glyphicon-warning-sign"},fontawesome4:{notice:"fa fa-exclamation-circle",info:"fa fa-info-circle",success:"fa fa-check-circle",error:"fa fa-exclamation-triangle"},fontawesome5:{notice:"fas fa-exclamation-circle",info:"fas fa-info-circle",success:"fas fa-check-circle",error:"fas fa-exclamation-triangle"}},window&&document.body?onDocumentLoaded():document.addEventListener("DOMContentLoaded",onDocumentLoaded)}function add_css(){var t=createElement("style");t.id="svelte-1eldsjg-style",t.textContent='body > .ui-pnotify{position:fixed;z-index:100040}body > .ui-pnotify.ui-pnotify-modal{z-index:100042}.ui-pnotify{position:absolute;height:auto;z-index:1;display:none}.ui-pnotify.ui-pnotify-modal{z-index:3}.ui-pnotify.ui-pnotify-in{display:block}.ui-pnotify.ui-pnotify-initial-hidden{display:block;visibility:hidden}.ui-pnotify.ui-pnotify-move{transition:left .5s ease, top .5s ease, right .5s ease, bottom .5s ease}.ui-pnotify.ui-pnotify-fade-slow{transition:opacity .4s linear;opacity:0}.ui-pnotify.ui-pnotify-fade-slow.ui-pnotify.ui-pnotify-move{transition:opacity .4s linear, left .5s ease, top .5s ease, right .5s ease, bottom .5s ease}.ui-pnotify.ui-pnotify-fade-normal{transition:opacity .25s linear;opacity:0}.ui-pnotify.ui-pnotify-fade-normal.ui-pnotify.ui-pnotify-move{transition:opacity .25s linear, left .5s ease, top .5s ease, right .5s ease, bottom .5s ease}.ui-pnotify.ui-pnotify-fade-fast{transition:opacity .1s linear;opacity:0}.ui-pnotify.ui-pnotify-fade-fast.ui-pnotify.ui-pnotify-move{transition:opacity .1s linear, left .5s ease, top .5s ease, right .5s ease, bottom .5s ease}.ui-pnotify.ui-pnotify-fade-in{opacity:1}.ui-pnotify .ui-pnotify-shadow{-webkit-box-shadow:0px 6px 28px 0px rgba(0,0,0,0.1);-moz-box-shadow:0px 6px 28px 0px rgba(0,0,0,0.1);box-shadow:0px 6px 28px 0px rgba(0,0,0,0.1)}.ui-pnotify-container{background-position:0 0;padding:.8em;height:100%;margin:0}.ui-pnotify-container:after{content:" ";visibility:hidden;display:block;height:0;clear:both}.ui-pnotify-container.ui-pnotify-sharp{-webkit-border-radius:0;-moz-border-radius:0;border-radius:0}.ui-pnotify-title{display:block;white-space:pre-line;margin-bottom:.4em;margin-top:0}.ui-pnotify.ui-pnotify-with-icon .ui-pnotify-title,.ui-pnotify.ui-pnotify-with-icon .ui-pnotify-text{margin-left:24px}[dir=rtl] .ui-pnotify.ui-pnotify-with-icon .ui-pnotify-title,[dir=rtl] .ui-pnotify.ui-pnotify-with-icon .ui-pnotify-text{margin-right:24px;margin-left:0}.ui-pnotify-title-bs4{font-size:1.2rem}.ui-pnotify-text{display:block;white-space:pre-line}.ui-pnotify-icon,.ui-pnotify-icon span{display:block;float:left}[dir=rtl] .ui-pnotify-icon,[dir=rtl] .ui-pnotify-icon span{float:right}.ui-pnotify-icon-bs3 > span{position:relative;top:2px}.ui-pnotify-icon-bs4 > span{position:relative;top:4px}.ui-pnotify-modal-overlay{background-color:rgba(0, 0, 0, .4);top:0;left:0;position:absolute;height:100%;width:100%;z-index:2}body > .ui-pnotify-modal-overlay{position:fixed;z-index:100041}',appendNode(t,document.head)}function create_main_fragment(t,e){for(var i,n,o,s,r,a,c,l,f,u=e._modulesPrependContainer,d=[],h=0;h<u.length;h+=1)d[h]=create_each_block(t,assign(assign({},e),{each_value:u,module:u[h],module_index:h}));var m=!1!==e.icon&&create_if_block(t,e),p=!1!==e.title&&create_if_block_1(t,e),y=!1!==e.text&&create_if_block_4(t,e),_=e._modulesAppendContainer,g=[];for(h=0;h<_.length;h+=1)g[h]=create_each_block_1(t,assign(assign({},e),{each_value_1:_,module:_[h],module_index_1:h}));function v(e){t.fire("mouseover",e)}function b(e){t.fire("mouseout",e)}function x(e){t.fire("mouseenter",e)}function N(e){t.fire("mouseleave",e)}function k(e){t.fire("mousemove",e)}function C(e){t.fire("mousedown",e)}function w(e){t.fire("mouseup",e)}function P(e){t.fire("click",e)}function T(e){t.fire("dblclick",e)}function L(e){t.fire("focus",e)}function A(e){t.fire("blur",e)}function O(e){t.fire("touchstart",e)}function E(e){t.fire("touchmove",e)}function H(e){t.fire("touchend",e)}function S(e){t.fire("touchcancel",e)}return{c:function(){i=createElement("div"),n=createElement("div");for(var t=0;t<d.length;t+=1)d[t].c();o=createText("\n    "),m&&m.c(),s=createText("\n    "),p&&p.c(),r=createText("\n    "),y&&y.c(),a=createText("\n    ");for(t=0;t<g.length;t+=1)g[t].c();this.h()},h:function(){n.className=c="\n        ui-pnotify-container\n        "+(e._styles.container?e._styles.container:"")+"\n        "+(e._styles[e.type]?e._styles[e.type]:"")+"\n        "+e.cornerClass+"\n        "+(e.shadow?"ui-pnotify-shadow":"")+"\n      ",n.style.cssText=l="\n        "+("string"==typeof e.width?"width: "+e.width+";":"")+"\n        "+("string"==typeof e.minHeight?"min-height: "+e.minHeight+";":"")+"\n      ",setAttribute(n,"role","alert"),addListener(i,"mouseover",v),addListener(i,"mouseout",b),addListener(i,"mouseenter",x),addListener(i,"mouseleave",N),addListener(i,"mousemove",k),addListener(i,"mousedown",C),addListener(i,"mouseup",w),addListener(i,"click",P),addListener(i,"dblclick",T),addListener(i,"focus",L),addListener(i,"blur",A),addListener(i,"touchstart",O),addListener(i,"touchmove",E),addListener(i,"touchend",H),addListener(i,"touchcancel",S),i.className=f="\n      ui-pnotify\n      "+(!1!==e.icon?"ui-pnotify-with-icon":"")+"\n      "+(e._styles.element?e._styles.element:"")+"\n      "+e.addClass+"\n      "+e._animatingClass+"\n      "+e._moveClass+"\n      "+("fade"===e.animation?"ui-pnotify-fade-"+e.animateSpeed:"")+"\n      "+(e.stack&&e.stack.modal?"ui-pnotify-modal":"")+"\n      "+e._moduleClasses.join(" ")+"\n    ",setAttribute(i,"aria-live","assertive"),setAttribute(i,"role","alertdialog"),setAttribute(i,"ui-pnotify",!0)},m:function(e,c){insertNode(i,e,c),appendNode(n,i);for(var l=0;l<d.length;l+=1)d[l].m(n,null);appendNode(o,n),m&&m.m(n,null),appendNode(s,n),p&&p.m(n,null),appendNode(r,n),y&&y.m(n,null),appendNode(a,n);for(l=0;l<g.length;l+=1)g[l].m(n,null);t.refs.container=n,t.refs.elem=i},p:function(e,u){var h=u._modulesPrependContainer;if(e._modulesPrependContainer){for(var _=d.length;_<h.length;_+=1){var v=assign(assign({},u),{each_value:h,module:h[_],module_index:_});d[_]=create_each_block(t,v),d[_].c(),d[_].m(n,o)}for(;_<d.length;_+=1)d[_].u(),d[_].d();d.length=h.length}!1!==u.icon?m?m.p(e,u):((m=create_if_block(t,u)).c(),m.m(n,s)):m&&(m.u(),m.d(),m=null),!1!==u.title?p?p.p(e,u):((p=create_if_block_1(t,u)).c(),p.m(n,r)):p&&(p.u(),p.d(),p=null),!1!==u.text?y?y.p(e,u):((y=create_if_block_4(t,u)).c(),y.m(n,a)):y&&(y.u(),y.d(),y=null);var b=u._modulesAppendContainer;if(e._modulesAppendContainer){for(_=g.length;_<b.length;_+=1){var x=assign(assign({},u),{each_value_1:b,module:b[_],module_index_1:_});g[_]=create_each_block_1(t,x),g[_].c(),g[_].m(n,null)}for(;_<g.length;_+=1)g[_].u(),g[_].d();g.length=b.length}(e._styles||e.type||e.cornerClass||e.shadow)&&c!==(c="\n        ui-pnotify-container\n        "+(u._styles.container?u._styles.container:"")+"\n        "+(u._styles[u.type]?u._styles[u.type]:"")+"\n        "+u.cornerClass+"\n        "+(u.shadow?"ui-pnotify-shadow":"")+"\n      ")&&(n.className=c),(e.width||e.minHeight)&&l!==(l="\n        "+("string"==typeof u.width?"width: "+u.width+";":"")+"\n        "+("string"==typeof u.minHeight?"min-height: "+u.minHeight+";":"")+"\n      ")&&(n.style.cssText=l),(e.icon||e._styles||e.addClass||e._animatingClass||e._moveClass||e.animation||e.animateSpeed||e.stack||e._moduleClasses)&&f!==(f="\n      ui-pnotify\n      "+(!1!==u.icon?"ui-pnotify-with-icon":"")+"\n      "+(u._styles.element?u._styles.element:"")+"\n      "+u.addClass+"\n      "+u._animatingClass+"\n      "+u._moveClass+"\n      "+("fade"===u.animation?"ui-pnotify-fade-"+u.animateSpeed:"")+"\n      "+(u.stack&&u.stack.modal?"ui-pnotify-modal":"")+"\n      "+u._moduleClasses.join(" ")+"\n    ")&&(i.className=f)},u:function(){detachNode(i);for(var t=0;t<d.length;t+=1)d[t].u();m&&m.u(),p&&p.u(),y&&y.u();for(t=0;t<g.length;t+=1)g[t].u()},d:function(){destroyEach(d),m&&m.d(),p&&p.d(),y&&y.d(),destroyEach(g),t.refs.container===n&&(t.refs.container=null),removeListener(i,"mouseover",v),removeListener(i,"mouseout",b),removeListener(i,"mouseenter",x),removeListener(i,"mouseleave",N),removeListener(i,"mousemove",k),removeListener(i,"mousedown",C),removeListener(i,"mouseup",w),removeListener(i,"click",P),removeListener(i,"dblclick",T),removeListener(i,"focus",L),removeListener(i,"blur",A),removeListener(i,"touchstart",O),removeListener(i,"touchmove",E),removeListener(i,"touchend",H),removeListener(i,"touchcancel",S),t.refs.elem===i&&(t.refs.elem=null)}}}function create_each_block(t,e){var i,n=e.module,o=(e.each_value,e.module_index,n);function s(e){return{root:t.root}}if(o)var r=new o(s());function a(e){t.initModule(e.module)}return r&&r.on("init",a),{c:function(){i=createComment(),r&&r._fragment.c()},m:function(t,e){insertNode(i,t,e),r&&r._mount(t,e)},p:function(t,e){n=e.module,e.each_value,e.module_index,o!==(o=n)&&(r&&r.destroy(),o&&((r=new o(s()))._fragment.c(),r._mount(i.parentNode,i),r.on("init",a)))},u:function(){detachNode(i),r&&r._unmount()},d:function(){r&&r.destroy(!1)}}}function create_if_block(t,e){var i,n,o,s;return{c:function(){i=createElement("div"),n=createElement("span"),this.h()},h:function(){n.className=o=!0===e.icon?e._icons[e.type]?e._icons[e.type]:"":e.icon,i.className=s="ui-pnotify-icon "+(e._styles.icon?e._styles.icon:"")},m:function(e,o){insertNode(i,e,o),appendNode(n,i),t.refs.iconContainer=i},p:function(t,e){(t.icon||t._icons||t.type)&&o!==(o=!0===e.icon?e._icons[e.type]?e._icons[e.type]:"":e.icon)&&(n.className=o),t._styles&&s!==(s="ui-pnotify-icon "+(e._styles.icon?e._styles.icon:""))&&(i.className=s)},u:function(){detachNode(i)},d:function(){t.refs.iconContainer===i&&(t.refs.iconContainer=null)}}}function create_if_block_2(t,e){var i,n;return{c:function(){i=createElement("noscript"),n=createElement("noscript")},m:function(t,o){insertNode(i,t,o),i.insertAdjacentHTML("afterend",e.title),insertNode(n,t,o)},p:function(t,e){t.title&&(detachBetween(i,n),i.insertAdjacentHTML("afterend",e.title))},u:function(){detachBetween(i,n),detachNode(i),detachNode(n)},d:noop}}function create_if_block_3(t,e){var i;return{c:function(){i=createText(e.title)},m:function(t,e){insertNode(i,t,e)},p:function(t,e){t.title&&(i.data=e.title)},u:function(){detachNode(i)},d:noop}}function create_if_block_1(t,e){var i,n;function o(t){return t.titleTrusted?create_if_block_2:create_if_block_3}var s=o(e),r=s(t,e);return{c:function(){i=createElement("h4"),r.c(),this.h()},h:function(){i.className=n="ui-pnotify-title "+(e._styles.title?e._styles.title:"")},m:function(e,n){insertNode(i,e,n),r.m(i,null),t.refs.titleContainer=i},p:function(e,a){s===(s=o(a))&&r?r.p(e,a):(r.u(),r.d(),(r=s(t,a)).c(),r.m(i,null)),e._styles&&n!==(n="ui-pnotify-title "+(a._styles.title?a._styles.title:""))&&(i.className=n)},u:function(){detachNode(i),r.u()},d:function(){r.d(),t.refs.titleContainer===i&&(t.refs.titleContainer=null)}}}function create_if_block_5(t,e){var i,n;return{c:function(){i=createElement("noscript"),n=createElement("noscript")},m:function(t,o){insertNode(i,t,o),i.insertAdjacentHTML("afterend",e.text),insertNode(n,t,o)},p:function(t,e){t.text&&(detachBetween(i,n),i.insertAdjacentHTML("afterend",e.text))},u:function(){detachBetween(i,n),detachNode(i),detachNode(n)},d:noop}}function create_if_block_6(t,e){var i;return{c:function(){i=createText(e.text)},m:function(t,e){insertNode(i,t,e)},p:function(t,e){t.text&&(i.data=e.text)},u:function(){detachNode(i)},d:noop}}function create_if_block_4(t,e){var i,n;function o(t){return t.textTrusted?create_if_block_5:create_if_block_6}var s=o(e),r=s(t,e);return{c:function(){i=createElement("div"),r.c(),this.h()},h:function(){i.className=n="ui-pnotify-text "+(e._styles.text?e._styles.text:""),setAttribute(i,"role","alert")},m:function(e,n){insertNode(i,e,n),r.m(i,null),t.refs.textContainer=i},p:function(e,a){s===(s=o(a))&&r?r.p(e,a):(r.u(),r.d(),(r=s(t,a)).c(),r.m(i,null)),e._styles&&n!==(n="ui-pnotify-text "+(a._styles.text?a._styles.text:""))&&(i.className=n)},u:function(){detachNode(i),r.u()},d:function(){r.d(),t.refs.textContainer===i&&(t.refs.textContainer=null)}}}function create_each_block_1(t,e){var i,n=e.module,o=(e.each_value_1,e.module_index_1,n);function s(e){return{root:t.root}}if(o)var r=new o(s());function a(e){t.initModule(e.module)}return r&&r.on("init",a),{c:function(){i=createComment(),r&&r._fragment.c()},m:function(t,e){insertNode(i,t,e),r&&r._mount(t,e)},p:function(t,e){n=e.module,e.each_value_1,e.module_index_1,o!==(o=n)&&(r&&r.destroy(),o&&((r=new o(s()))._fragment.c(),r._mount(i.parentNode,i),r.on("init",a)))},u:function(){detachNode(i),r&&r._unmount()},d:function(){r&&r.destroy(!1)}}}function PNotify_1(t){init(this,t),this.refs={},this._state=assign(data(),t.data),this._recompute({styling:1,icons:1},this._state),document.getElementById("svelte-1eldsjg-style")||add_css();var e=oncreate.bind(this);t.root||(this._oncreate=[],this._beforecreate=[],this._aftercreate=[]),this._fragment=create_main_fragment(this,this._state),this.root._oncreate.push(e),t.target&&(this._fragment.c(),this._mount(t.target,t.anchor),this._lock=!0,callAll(this._beforecreate),callAll(this._oncreate),callAll(this._aftercreate),this._lock=!1)}function createElement(t){return document.createElement(t)}function appendNode(t,e){e.appendChild(t)}function assign(t,e){for(var i in e)t[i]=e[i];return t}function createText(t){return document.createTextNode(t)}function setAttribute(t,e,i){t.setAttribute(e,i)}function addListener(t,e,i){t.addEventListener(e,i,!1)}function insertNode(t,e,i){e.insertBefore(t,i)}function detachNode(t){t.parentNode.removeChild(t)}function destroyEach(t){for(var e=0;e<t.length;e+=1)t[e]&&t[e].d()}function removeListener(t,e,i){t.removeEventListener(e,i,!1)}function createComment(){return document.createComment("")}function detachBetween(t,e){for(;t.nextSibling&&t.nextSibling!==e;)t.parentNode.removeChild(t.nextSibling)}function noop(){}function init(t,e){t._observers={pre:blankObject(),post:blankObject()},t._handlers=blankObject(),t._bind=e._bind,t.options=e,t.root=e.root||t,t.store=t.root.store||e.store}function callAll(t){for(;t&&t.length;)t.shift()()}function destroy(t){this.destroy=noop,this.fire("destroy"),this.set=this.get=noop,!1!==t&&this._fragment.u(),this._fragment.d(),this._fragment=this._state=null}function get(t){return t?this._state[t]:this._state}function fire(t,e){var i=t in this._handlers&&this._handlers[t].slice();if(i)for(var n=0;n<i.length;n+=1)i[n].call(this,e)}function observe(t,e,i){var n=i&&i.defer?this._observers.post:this._observers.pre;return(n[t]||(n[t]=[])).push(e),i&&!1===i.init||(e.__calling=!0,e.call(this,this._state[t]),e.__calling=!1),{cancel:function(){var i=n[t].indexOf(e);~i&&n[t].splice(i,1)}}}function on(t,e){if("teardown"===t)return this.on("destroy",e);var i=this._handlers[t]||(this._handlers[t]=[]);return i.push(e),{cancel:function(){var t=i.indexOf(e);~t&&i.splice(t,1)}}}function set(t){this._set(assign({},t)),this.root._lock||(this.root._lock=!0,callAll(this.root._beforecreate),callAll(this.root._oncreate),callAll(this.root._aftercreate),this.root._lock=!1)}function _set(t){var e=this._state,i={},n=!1;for(var o in t)this._differs(t[o],e[o])&&(i[o]=n=!0);n&&(this._state=assign(assign({},e),t),this._recompute(i,this._state),this._bind&&this._bind(i,this._state),this._fragment&&(dispatchObservers(this,this._observers.pre,i,this._state,e),this._fragment.p(i,this._state),dispatchObservers(this,this._observers.post,i,this._state,e)))}function _mount(t,e){this._fragment[this._fragment.i?"i":"m"](t,e||null)}function _unmount(){this._fragment&&this._fragment.u()}function _differs(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function blankObject(){return Object.create(null)}function dispatchObservers(t,e,i,n,o){for(var s in e)if(i[s]){var r=n[s],a=o[s],c=e[s];if(c)for(var l=0;l<c.length;l+=1){var f=c[l];f.__calling||(f.__calling=!0,f.call(t,r,a),f.__calling=!1)}}}assign(assign(PNotify_1.prototype,methods),{destroy:destroy,get:get,fire:fire,observe:observe,on:on,set:set,teardown:destroy,_set:_set,_mount:_mount,_unmount:_unmount,_differs:_differs}),PNotify_1.prototype._recompute=function(t,e){t.styling&&this._differs(e._styles,e._styles=_styles(e.styling))&&(t._styles=!0),t.icons&&this._differs(e._icons,e._icons=_icons(e.icons))&&(t._icons=!0)},setup(PNotify_1);export default PNotify_1;
//# sourceMappingURL=PNotify.js.map