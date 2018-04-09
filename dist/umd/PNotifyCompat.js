!function(e,t){if("function"==typeof define&&define.amd)define("PNotifyCompat",["exports","PNotify"],t);else if("undefined"!=typeof exports)t(exports,require("./PNotify"));else{var o={};t(o,e.PNotify),e.PNotifyCompat=o}}(this,function(e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o,n=(o=t)&&o.__esModule?o:{default:o};var l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};var s=function(){function r(e,t){for(var o=0;o<t.length;o++){var r=t[o];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(e,t,o){return t&&r(e.prototype,t),o&&r(e,o),e}}();var a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var r in o)Object.prototype.hasOwnProperty.call(o,r)&&(e[r]=o[r])}return e},i=function e(t,o,r){var n=a({},o?r?u.prototype.options[r]:{}:u.prototype.options,t),l=function(e){for(var t=e,o=void 0;-1!==(o=t.indexOf("_"));)t=t.slice(0,o)+t.slice(o+1,o+2).toUpperCase()+t.slice(o+2);return t};for(var s in n){if(n.hasOwnProperty(s)&&-1!==s.indexOf("_"))n[l(s)]=n[s],delete n[s]}return o||(n.hasOwnProperty("addclass")&&(n.addClass=n.addclass,delete n.addclass),n.hasOwnProperty("cornerclass")&&(n.cornerClass=n.cornerclass,delete n.cornerClass),n.hasOwnProperty("textEscape")&&(n.textTrusted=!n.textEscape,delete n.textEscape),n.hasOwnProperty("titleEscape")&&(n.titleTrusted=!n.titleEscape,delete n.titleEscape),n.hasOwnProperty("styling")&&("bootstrap3"===n.styling?n.icons="bootstrap3":"fontawesome"===n.styling&&(n.styling="bootstrap3",n.icons="fontawesome4")),n.hasOwnProperty("stack")&&n.stack.overlay_close&&(n.stack.overlayClose=n.stack.overlay_close),n.modules={},n.hasOwnProperty("animate")&&(n.modules.Animate=e(n.animate,!0,"animate"),delete n.animate),n.hasOwnProperty("buttons")&&(n.modules.Buttons=e(n.buttons,!0,"buttons"),delete n.buttons,n.modules.Buttons.classes&&(n.modules.Buttons.classes=e(n.modules.Buttons.classes,!0))),n.hasOwnProperty("confirm")&&(n.modules.Confirm=e(n.confirm,!0,"confirm"),n.modules.Confirm.promptDefault&&(n.modules.Confirm.promptValue=n.modules.Confirm.promptDefault,delete n.modules.Confirm.promptDefault),delete n.confirm),n.hasOwnProperty("desktop")&&(n.modules.Desktop=e(n.desktop,!0,"desktop"),delete n.desktop),n.hasOwnProperty("history")&&(n.modules.History=e(n.history,!0,"history"),delete n.history),n.hasOwnProperty("mobile")&&(n.modules.Mobile=e(n.mobile,!0,"mobile"),delete n.mobile),n.hasOwnProperty("nonblock")&&(n.modules.NonBlock=e(n.nonblock,!0,"nonblock"),delete n.nonblock),n.hasOwnProperty("reference")&&(n.modules.Reference=e(n.reference,!0,"reference"),delete n.reference),n.hasOwnProperty("beforeInit")&&(n.modules.Callbacks||(n.modules.Callbacks={}),n.modules.Callbacks.beforeInit=n.beforeInit,delete n.beforeInit),n.hasOwnProperty("afterInit")&&(n.modules.Callbacks||(n.modules.Callbacks={}),n.modules.Callbacks.afterInit=n.afterInit,delete n.afterInit),n.hasOwnProperty("beforeOpen")&&(n.modules.Callbacks||(n.modules.Callbacks={}),n.modules.Callbacks.beforeOpen=n.beforeOpen,delete n.beforeOpen),n.hasOwnProperty("afterOpen")&&(n.modules.Callbacks||(n.modules.Callbacks={}),n.modules.Callbacks.afterOpen=n.afterOpen,delete n.afterOpen),n.hasOwnProperty("beforeClose")&&(n.modules.Callbacks||(n.modules.Callbacks={}),n.modules.Callbacks.beforeClose=n.beforeClose,delete n.beforeClose),n.hasOwnProperty("afterClose")&&(n.modules.Callbacks||(n.modules.Callbacks={}),n.modules.Callbacks.afterClose=n.afterClose,delete n.afterClose)),n},u=function(e){function r(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,r),"object"!==(void 0===e?"undefined":l(e))&&(e={text:e}),n.default.modules.Callbacks&&e.before_init&&e.before_init(e),e=i(e);var t=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(r.__proto__||Object.getPrototypeOf(r)).call(this,{target:document.body,data:e})),o=t.get;return t.get=function(e){return void 0===e?a(window.jQuery?window.jQuery(this.refs.elem):this.refs.elem,o.call(this)):o.call(this,e)},t.on("pnotify.confirm",function(e){window.jQuery&&window.jQuery(t.refs.elem).trigger("pnotify.confirm",[t,e.value])}),t.on("pnotify.cancel",function(e){window.jQuery&&window.jQuery(t.refs.elem).trigger("pnotify.cancel",t)}),n.default.modules.Callbacks&&n.default.modules.Callbacks.getCallbacks(t,null,"afterInit")(t),t}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(r,n.default),s(r,[{key:"update",value:function(e){return e=i(e),function e(t,o,r){null===t&&(t=Function.prototype);var n=Object.getOwnPropertyDescriptor(t,o);if(void 0===n){var l=Object.getPrototypeOf(t);return null===l?void 0:e(l,o,r)}if("value"in n)return n.value;var s=n.get;return void 0!==s?s.call(r):void 0}(r.prototype.__proto__||Object.getPrototypeOf(r.prototype),"update",this).call(this,e)}}]),r}();u.prototype.options={text_escape:!1,title_escape:!1},u.reload=function(){return u},u.removeAll=function(){return n.default.removeAll()},u.removeStack=function(e){return n.default.removeStack(e)},u.positionAll=function(e){return n.default.positionAll(e)},u.desktop={permission:function(){n.default.modules.Desktop.permission()}},window.jQuery&&window.jQuery(function(){window.jQuery(document.body).on("pnotify.history-last",function(){n.default.modules.History.showLast()})}),e.default=u});
//# sourceMappingURL=PNotifyCompat.js.map