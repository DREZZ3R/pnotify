!function(t,e){if("function"==typeof define&&define.amd)define("PNotifyCallbacks",["exports","PNotify"],e);else if("undefined"!=typeof exports)e(exports,require("./PNotify"));else{var n={};e(n,t.PNotify),t.PNotifyCallbacks=n}}(this,function(t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n,f=(n=e)&&n.__esModule?n:{default:n};var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},i=f.default.prototype.open,o=f.default.prototype.close,a=function(t,e,n){var r=t?t.get("modules"):e.modules,i=r&&r.Callbacks?r.Callbacks:{};return i[n]?i[n]:function(){return!0}};function s(t){var e,n;n=t,(e=this)._observers={pre:h(),post:h()},e._handlers=h(),e._bind=n._bind,e.options=n,e.root=n.root||e,e.store=e.root.store||n.store,this._state=l({},t.data),this._fragment=(this._state,{c:u,m:u,p:u,u:u,d:u}),t.target&&(this._fragment.c(),this._mount(t.target,t.anchor))}function u(){}function l(t,e){for(var n in e)t[n]=e[n];return t}function c(t){this.destroy=u,this.fire("destroy"),!(this.set=this.get=u)!==t&&this._fragment.u(),this._fragment.d(),this._fragment=this._state=null}function h(){return Object.create(null)}function _(t){for(;t&&t.length;)t.shift()()}function d(t,e,n,r,i){for(var o in e)if(n[o]){var s=r[o],f=i[o],a=e[o];if(a)for(var u=0;u<a.length;u+=1){var l=a[u];l.__calling||(l.__calling=!0,l.call(t,s,f),l.__calling=!1)}}}f.default.prototype.open=function(){if(!1!==a(this,null,"beforeOpen")(this)){for(var t=arguments.length,e=Array(t),n=0;n<t;n++)e[n]=arguments[n];i.apply(this,e),a(this,null,"afterOpen")(this)}},f.default.prototype.close=function(t){if(!1!==a(this,null,"beforeClose")(this,t)){for(var e=arguments.length,n=Array(1<e?e-1:0),r=1;r<e;r++)n[r-1]=arguments[r];o.apply(this,[t].concat(n)),a(this,null,"afterClose")(this,t)}},l(s.prototype,{destroy:c,get:function(t){return t?this._state[t]:this._state},fire:function(t,e){var n=t in this._handlers&&this._handlers[t].slice();if(!n)return;for(var r=0;r<n.length;r+=1)n[r].call(this,e)},observe:function(e,n,t){var r=t&&t.defer?this._observers.post:this._observers.pre;(r[e]||(r[e]=[])).push(n),t&&!1===t.init||(n.__calling=!0,n.call(this,this._state[e]),n.__calling=!1);return{cancel:function(){var t=r[e].indexOf(n);~t&&r[e].splice(t,1)}}},on:function(t,e){if("teardown"===t)return this.on("destroy",e);var n=this._handlers[t]||(this._handlers[t]=[]);return n.push(e),{cancel:function(){var t=n.indexOf(e);~t&&n.splice(t,1)}}},set:function(t){if(this._set(l({},t)),this.root._lock)return;this.root._lock=!0,_(this.root._beforecreate),_(this.root._oncreate),_(this.root._aftercreate),this.root._lock=!1},teardown:c,_set:function(t){var e=this._state,n={},r=!1;for(var i in t)this._differs(t[i],e[i])&&(n[i]=r=!0);if(!r)return;this._state=l(l({},e),t),this._recompute(n,this._state),this._bind&&this._bind(n,this._state);this._fragment&&(d(this,this._observers.pre,n,this._state,e),this._fragment.p(n,this._state),d(this,this._observers.post,n,this._state,e))},_mount:function(t,e){this._fragment[this._fragment.i?"i":"m"](t,e||null)},_unmount:function(){this._fragment&&this._fragment.u()},_differs:function(t,e){return t!=t?e==e:t!==e||t&&"object"===(void 0===t?"undefined":r(t))||"function"==typeof t}}),s.prototype._recompute=u,function(t){t.key="Callbacks",t.getCallbacks=a;var e=f.default.alert,n=f.default.notice,r=f.default.info,i=f.default.success,o=f.default.error,s=function(t,e){a(null,e,"beforeInit")(e);var n=t(e);return a(n,null,"afterInit")(n),n};f.default.alert=function(t){return s(e,t)},f.default.notice=function(t){return s(n,t)},f.default.info=function(t){return s(r,t)},f.default.success=function(t){return s(i,t)},f.default.error=function(t){return s(o,t)},f.default.modules.Callbacks=t}(s),t.default=s});
//# sourceMappingURL=PNotifyCallbacks.js.map