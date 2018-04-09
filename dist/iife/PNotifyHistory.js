"use strict";var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},_extends=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var o=arguments[e];for(var n in o)Object.prototype.hasOwnProperty.call(o,n)&&(t[n]=o[n])}return t},PNotifyHistory=function(a){var e;function t(t){var e,o;o=t,(e=this)._observers={pre:i(),post:i()},e._handlers=i(),e._bind=o._bind,e.options=o,e.root=o.root||e,e.store=e.root.store||o.store,this._state=s(_extends({_notice:null,_options:{}},a.modules.History.defaults),t.data),this._fragment=(this._state,{c:n,m:n,p:n,u:n,d:n}),t.target&&(this._fragment.c(),this._mount(t.target,t.anchor))}function n(){}function s(t,e){for(var o in e)t[o]=e[o];return t}function o(t){this.destroy=n,this.fire("destroy"),!(this.set=this.get=n)!==t&&this._fragment.u(),this._fragment.d(),this._fragment=this._state=null}function i(){return Object.create(null)}function r(t){for(;t&&t.length;)t.shift()()}function f(t,e,o,n,i){for(var s in e)if(o[s]){var r=n[s],a=i[s],f=e[s];if(f)for(var h=0;h<f.length;h+=1){var c=f[h];c.__calling||(c.__calling=!0,c.call(t,r,a),c.__calling=!1)}}}return a=a&&a.__esModule?a.default:a,s(s(t.prototype,{initModule:function(t){if(this.set(t),this.get("history")){var e=this.get("_notice");e.get("destroy")&&e.set({destroy:!1})}},beforeOpen:function(){var t=this.get("maxInStack");if(t!==1/0){var e=this.get("_options").stack;if(!1!==e&&a.notices&&a.notices.length>t){for(var o="top"===e.push,n=[],i=0,s=o?0:a.notices.length-1;o?s<a.notices.length:0<=s;o?s++:s--)-1!==["opening","open"].indexOf(a.notices[s].get("_state"))&&a.notices[s].get("stack")===e&&(t<=i?n.push(a.notices[s]):i++);for(var r=0;r<n.length;r++)n[r].close(!1)}}}}),{destroy:o,get:function(t){return t?this._state[t]:this._state},fire:function(t,e){var o=t in this._handlers&&this._handlers[t].slice();if(!o)return;for(var n=0;n<o.length;n+=1)o[n].call(this,e)},observe:function(e,o,t){var n=t&&t.defer?this._observers.post:this._observers.pre;(n[e]||(n[e]=[])).push(o),t&&!1===t.init||(o.__calling=!0,o.call(this,this._state[e]),o.__calling=!1);return{cancel:function(){var t=n[e].indexOf(o);~t&&n[e].splice(t,1)}}},on:function(t,e){if("teardown"===t)return this.on("destroy",e);var o=this._handlers[t]||(this._handlers[t]=[]);return o.push(e),{cancel:function(){var t=o.indexOf(e);~t&&o.splice(t,1)}}},set:function(t){if(this._set(s({},t)),this.root._lock)return;this.root._lock=!0,r(this.root._beforecreate),r(this.root._oncreate),r(this.root._aftercreate),this.root._lock=!1},teardown:o,_set:function(t){var e=this._state,o={},n=!1;for(var i in t)this._differs(t[i],e[i])&&(o[i]=n=!0);if(!n)return;this._state=s(s({},e),t),this._recompute(o,this._state),this._bind&&this._bind(o,this._state);this._fragment&&(f(this,this._observers.pre,o,this._state,e),this._fragment.p(o,this._state),f(this,this._observers.post,o,this._state,e))},_mount:function(t,e){this._fragment[this._fragment.i?"i":"m"](t,e||null)},_unmount:function(){this._fragment&&this._fragment.u()},_differs:function(t,e){return t!=t?e==e:t!==e||t&&"object"===(void 0===t?"undefined":_typeof(t))||"function"==typeof t}}),t.prototype._recompute=n,(e=t).key="History",e.defaults={history:!0,maxInStack:1/0},e.init=function(t){return new e({target:document.body})},e.showLast=function(t){if(void 0===t&&(t=a.defaultStack),!1!==t){var e="top"===t.push,o=e?0:a.notices.length-1,n=void 0;do{if(!(n=a.notices[o]))return;o+=e?1:-1}while(n.get("stack")!==t||!n.get("_modules").History.get("history")||"opening"===n.get("_state")||"open"===n.get("_state"));n.open()}},e.showAll=function(t){if(void 0===t&&(t=a.defaultStack),!1!==t)for(var e=0;e<a.notices.length;e++){var o=a.notices[e];!0!==t&&o.get("stack")!==t||!o.get("_modules").History.get("history")||o.open()}},a.modules.History=e,t}(PNotify);
//# sourceMappingURL=PNotifyHistory.js.map