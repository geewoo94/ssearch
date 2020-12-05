/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Input = exports.Img = exports.H6 = exports.H5 = exports.H4 = exports.H3 = exports.H2 = exports.H1 = exports.Li = exports.Ul = exports.Ol = exports.Nav = exports.Div = exports.render = void 0;
function render(el) {
    return (function () {
        var _this = this;
        var children = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            children[_i] = arguments[_i];
        }
        if (typeof children[0] === 'string' || typeof children[0] === 'number') {
            this.textContent = String(children[0]);
            return this;
        }
        if (children[0] === null)
            return this;
        children.forEach(function (child) {
            _this.appendChild(child);
        });
        return this;
    }).bind(el);
}
exports.render = render;
function elementFactory(type) {
    return function (options) {
        var el = document.createElement(type);
        for (var key in options) {
            if (key === 'onClick') {
                el.addEventListener('click', options[key]);
            }
            else if (key === 'onChange') {
                el.addEventListener('change', options[key]);
            }
            else {
                el.setAttribute(key, options[key]);
            }
        }
        return render(el);
    };
}
exports.Div = elementFactory('div');
exports.Nav = elementFactory('nav');
exports.Ol = elementFactory('ol');
exports.Ul = elementFactory('ul');
exports.Li = elementFactory('Li');
exports.H1 = elementFactory('h1');
exports.H2 = elementFactory('h2');
exports.H3 = elementFactory('h3');
exports.H4 = elementFactory('h4');
exports.H5 = elementFactory('h5');
exports.H6 = elementFactory('h6');
exports.Img = elementFactory('img');
exports.Input = elementFactory('input');


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.useEffect = exports.useState = void 0;
var initialApp = (function init() {
    var rootComponent = null;
    var rootElement = null;
    var hooks = [];
    var currentHook = 0;
    var App = {
        render: function (component, target) {
            if (!rootComponent)
                rootComponent = component;
            if (!rootElement)
                rootElement = target;
            target.textContent = '';
            currentHook = 0;
            target.appendChild(component()());
        }
    };
    function useState(initialState) {
        hooks[currentHook] = hooks[currentHook] || initialState;
        var setStateHookIndex = currentHook;
        var setState = function (newState) {
            hooks[setStateHookIndex] = newState;
            App.render(rootComponent, rootElement);
        };
        return [hooks[currentHook++], setState];
    }
    function useEffect(callback, depArray) {
        var hasNoDeps = !depArray;
        var deps = hooks[currentHook];
        var hasChangedDeps = deps ? !depArray.every(function (el, i) { return el === deps[i]; }) : true;
        if (hasNoDeps || hasChangedDeps) {
            callback();
            hooks[currentHook] = depArray;
        }
        currentHook++;
    }
    return {
        App: App,
        useState: useState,
        useEffect: useEffect,
    };
})();
exports.useState = initialApp.useState;
exports.useEffect = initialApp.useEffect;
exports.default = initialApp.App;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(3);


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var App_1 = __webpack_require__(1);
var Element_1 = __webpack_require__(0);
var NavigationContainer_1 = __webpack_require__(4);
var PageContainer_1 = __webpack_require__(6);
__webpack_require__(13);
__webpack_require__(14);
chrome.tabs.query({}, function (tabs) {
    var url = tabs[0].url;
    console.log(tabs);
});
function Main() {
    var _a = App_1.useState('Main'), currentPage = _a[0], setCurrentPage = _a[1];
    var handleChangeMenu = function (page) {
        setCurrentPage(page);
    };
    return Element_1.render(Element_1.Div({ class: 'Main-Wrapper' })(NavigationContainer_1.default({
        changeMenu: handleChangeMenu
    })(), PageContainer_1.default({ page: currentPage })()));
}
;
var root = document.querySelector('#root');
App_1.default.render(Main, root);


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Element_1 = __webpack_require__(0);
var Element_2 = __webpack_require__(0);
__webpack_require__(5);
function NavigationContainer(_a) {
    var changeMenu = _a.changeMenu;
    var navMenu = ['Main', 'Liked'];
    var handleClick = function (value) {
        changeMenu(value);
    };
    return Element_2.render(Element_1.Div({ class: 'NavigationContainer-Wrapper' })(Element_1.H1()('Navigation'), Element_1.Nav()(Element_1.Ul().apply(void 0, navMenu.map(function (menu) { return Element_1.Li({
        onClick: function (ev) { return handleClick(ev.target.textContent); },
    })(menu); }))), Element_1.H2()('Options')));
}
;
exports.default = NavigationContainer;


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var App_1 = __webpack_require__(1);
var Element_1 = __webpack_require__(0);
var Header_1 = __webpack_require__(7);
var Contents_1 = __webpack_require__(10);
__webpack_require__(12);
function filterHistory(range, histories) {
    return histories.filter(function (history) {
        var startTime = (new Date()).getTime() - (range * 24 * 3600 * 1000);
        return history.lastVisitTime >= startTime;
    });
}
function MainPage(_a) {
    var histories = _a.histories;
    var _b = App_1.useState('7'), range = _b[0], setRange = _b[1];
    var filteredHistories = filterHistory(Number(range), histories);
    return Element_1.render(Element_1.Div({ class: 'PageContainer-wrapper' })(Header_1.default({ range: range, setRange: setRange })(), Contents_1.default({ histories: filteredHistories })()));
}
var initialHistories = [];
function PageContainer(_a) {
    var _this = this;
    var page = _a.page;
    var _b = App_1.useState(initialHistories), histories = _b[0], setHistories = _b[1];
    App_1.useEffect(function () {
        //dev
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var histories, parsed;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch('./mockHistory.json')];
                    case 1:
                        histories = _a.sent();
                        return [4 /*yield*/, histories.json()];
                    case 2:
                        parsed = _a.sent();
                        setHistories(parsed);
                        return [2 /*return*/];
                }
            });
        }); })();
        //deploy
    }, []);
    var Page = MainPage;
    if (page === 'Main') {
        return Element_1.render(MainPage({
            histories: histories
        })());
    }
    else if (page === 'Liked') {
        return Element_1.render(Element_1.Div()('Liked'));
    }
}
;
exports.default = PageContainer;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Element_1 = __webpack_require__(0);
var styled_1 = __webpack_require__(8);
__webpack_require__(9);
var styledDiv = styled_1.default(Element_1.Div);
var style = "\n  display: flex;\n  justify-content: space-around;\n  width: 100vh;\n";
function Header(_a) {
    var range = _a.range, setRange = _a.setRange;
    return Element_1.render(Element_1.Div({ class: 'Header-Wrapper' })(Element_1.Div({ class: 'Right-Column' })(), Element_1.Div({ class: 'Header-Column' })(Element_1.Img({ src: './main-icon-128.png' })(), Element_1.Input({ placeholder: '검색을 껌색하세요!', class: 'Search-Input' })()), Element_1.Input({
        type: 'range',
        min: '0',
        max: '7',
        value: range,
        class: 'Range-Input',
        onChange: function (ev) { return setRange(ev.target.value); },
    })()));
}
exports.default = Header;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function () {
    var memo = {};
    var styleTag = document.createElement('style');
    var head = document.querySelector('head');
    function generateRandomString() {
        return (Math.random()
            .toString(36)
            .replace(/[^a-z]+/g, ''));
    }
    function styled(el) {
        var randomClass = generateRandomString();
        return function (style, options) {
            var text = "." + randomClass + " {" + style + "}";
            if (!memo[text]) {
                memo[text] = true;
                styleTag.textContent += text;
            }
            head.appendChild(styleTag);
            return el(Object.assign({ class: randomClass }, options));
        };
    }
    return styled;
})();


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Element_1 = __webpack_require__(0);
__webpack_require__(11);
function SiteCard(_a) {
    var sites = _a.sites;
    var origin = sites[0].origin.replace(/(^\w+:|^)\/\//, '');
    sites.sort(function (a, b) { return a.lastVisitTime - b.lastVisitTime; });
    return Element_1.render(Element_1.Div({ class: 'SiteCard-Wrapper' })(Element_1.H1()(origin), Element_1.Input()(), Element_1.Ul().apply(void 0, sites.map(function (site) { return Element_1.Li()(site.title.slice(0, 50) + '...' + '[미리보기]'); }))));
}
function Contents(_a) {
    var histories = _a.histories;
    var regex = /https:\/\/[-a-zA-Z0-9@:%._\+~#=]{1,256}\//;
    var nomalized = histories.reduce(function (acc, cur) {
        var matched = cur.url.match(regex);
        if (!matched)
            return acc;
        var root = matched[0];
        if (!acc[root])
            acc[root] = [];
        cur.origin = root;
        acc[root].push(cur);
        return acc;
    }, {});
    var urls = [];
    for (var prop in nomalized) {
        urls.push(nomalized[prop]);
    }
    urls.sort(function (a, b) { return b.length - a.length; });
    return Element_1.render(Element_1.Div({ class: 'Contents-Wrapper' }).apply(void 0, urls.map(function (url) { return SiteCard({ sites: url.slice(0, 10) })(); })));
}
exports.default = Contents;


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })
/******/ ]);