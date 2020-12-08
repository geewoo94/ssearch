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
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Form = exports.A = exports.Button = exports.Input = exports.Img = exports.H6 = exports.H5 = exports.H4 = exports.H3 = exports.H2 = exports.H1 = exports.Li = exports.Ul = exports.Ol = exports.Nav = exports.Div = exports.render = void 0;
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
            if (key === 'event') {
                var _a = options[key], type_1 = _a.type, callback = _a.callback;
                el.addEventListener(type_1, callback);
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
exports.Button = elementFactory('button');
exports.A = elementFactory('a');
exports.Form = elementFactory('form');


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.useDispatch = exports.useSelector = void 0;
var Store = (function () {
    var state = null;
    var reducer = null;
    var subscriber = [];
    var setSubscriber = function (sub) {
        subscriber.push(sub);
    };
    var setInitialState = function (initState) {
        if (!state) {
            state = initState;
        }
        else {
            throw Error('setInitialState only can be called once');
        }
    };
    var setReducer = function (newReducer) {
        if (!reducer) {
            reducer = newReducer;
        }
        else {
            throw Error('setReducer only can be called once');
        }
    };
    var useSelector = function (callback) {
        if (!callback) {
            return state;
        }
        else {
            return callback(state);
        }
    };
    var useDispatch = function () {
        return function (action) {
            state = reducer(state, action);
            subscriber.forEach(function (sub) {
                sub();
            });
        };
    };
    return {
        state: state,
        setSubscriber: setSubscriber,
        setInitialState: setInitialState,
        setReducer: setReducer,
        useSelector: useSelector,
        useDispatch: useDispatch,
    };
})();
exports.useSelector = Store.useSelector;
exports.useDispatch = Store.useDispatch;
exports.default = Store;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setLikedItems = exports.setHistories = exports.setRemovedUrls = exports.setCurrentPage = exports.setSearchTerm = exports.setRange = void 0;
var Store_1 = __webpack_require__(1);
var store_lib_1 = __webpack_require__(9);
var DEFAULT_RANGE = '7';
var DEFAULT_PAGE = 'Main';
var initialState = {
    range: DEFAULT_RANGE,
    searchTerm: '',
    removedUrls: [],
    currentPage: DEFAULT_PAGE,
    histories: [],
    likedItems: [],
};
var setRange = function (payload) { return ({ type: store_lib_1.TYPE.SET_RANGE, payload: payload }); };
exports.setRange = setRange;
var setSearchTerm = function (payload) { return ({ type: store_lib_1.TYPE.SET_SEARCH_TERM, payload: payload }); };
exports.setSearchTerm = setSearchTerm;
var setCurrentPage = function (payload) { return ({ type: store_lib_1.TYPE.SET_CURRENT_PAGE, payload: payload }); };
exports.setCurrentPage = setCurrentPage;
var setRemovedUrls = function (payload) { return ({ type: store_lib_1.TYPE.SET_REMOVED_URLS, payload: payload }); };
exports.setRemovedUrls = setRemovedUrls;
var setHistories = function (payload) { return ({ type: store_lib_1.TYPE.SET_HISTORIES, payload: payload }); };
exports.setHistories = setHistories;
var setLikedItems = function (payload) { return ({ type: store_lib_1.TYPE.SET_LIKED_ITEMS, payload: payload }); };
exports.setLikedItems = setLikedItems;
var reducer = function (state, _a) {
    var type = _a.type, payload = _a.payload;
    switch (type) {
        case store_lib_1.TYPE.SET_RANGE: {
            return __assign(__assign({}, state), { range: payload });
        }
        case store_lib_1.TYPE.SET_SEARCH_TERM: {
            return __assign(__assign({}, state), { searchTerm: payload });
        }
        case store_lib_1.TYPE.SET_CURRENT_PAGE: {
            return __assign(__assign({}, state), { currentPage: payload });
        }
        case store_lib_1.TYPE.SET_REMOVED_URLS: {
            return __assign(__assign({}, state), { removedUrls: payload });
        }
        case store_lib_1.TYPE.SET_HISTORIES: {
            return __assign(__assign({}, state), { histories: payload });
        }
        case store_lib_1.TYPE.SET_LIKED_ITEMS: {
            return __assign(__assign({}, state), { likedItems: payload });
        }
    }
};
Store_1.default.setInitialState(initialState);
Store_1.default.setReducer(reducer);
exports.default = Store_1.default;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.useEffect = exports.useState = exports.setStore = void 0;
var initialApp = (function init() {
    var rootComponent = null;
    var rootElement = null;
    var hooks = [];
    var currentHook = 0;
    var store = null;
    var App = {
        renderOnce: function (component, target) {
            target.appendChild(component()());
        },
        render: function (component, target) {
            if (!rootComponent)
                rootComponent = component;
            if (!rootElement)
                rootElement = target;
            rootElement.textContent = '';
            currentHook = 0;
            rootElement.appendChild(rootComponent()());
        }
    };
    function setStore(newStore) {
        if (!store) {
            store = newStore;
            store.setSubscriber(App.render);
        }
        else {
            throw Error('setStore only can be called once');
        }
    }
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
            hooks[currentHook] = depArray;
            callback();
        }
        currentHook++;
    }
    return {
        App: App,
        setStore: setStore,
        useState: useState,
        useEffect: useEffect,
    };
})();
exports.setStore = initialApp.setStore;
exports.useState = initialApp.useState;
exports.useEffect = initialApp.useEffect;
exports.default = initialApp.App;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_PAGE = exports.DEFAULT_RANGE = exports.PAGES = exports.LIKED_PAGE = exports.MAIN_PAGE = void 0;
exports.MAIN_PAGE = 'Main';
exports.LIKED_PAGE = 'Liked';
exports.PAGES = [
    exports.MAIN_PAGE,
    exports.LIKED_PAGE,
];
exports.DEFAULT_RANGE = '7';
exports.DEFAULT_PAGE = exports.MAIN_PAGE;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.filterDetail = exports.filterHistory = void 0;
var Filter = /** @class */ (function () {
    function Filter(histories) {
        this.histories = histories;
    }
    Filter.prototype.filterByRange = function (range) {
        this.histories = this.histories.filter(function (history) {
            var startTime = (new Date()).getTime() - (range * 24 * 3600 * 1000);
            return history.lastVisitTime >= startTime;
        });
        return this;
    };
    Filter.prototype.filterBySearchTerm = function (searchTerm) {
        this.histories = this.histories.filter(function (history) {
            if (history.url.includes(searchTerm)) {
                return true;
            }
            else if (history.title.includes(searchTerm)) {
                return true;
            }
            else {
                return false;
            }
        });
        return this;
    };
    Filter.prototype.filterByRemovedUrls = function (removedUrls) {
        this.histories = this.histories.filter(function (history) {
            return !removedUrls.some(function (url) {
                var regex = new RegExp(url);
                return regex.test(history.url);
            });
        });
        return this;
    };
    Filter.prototype.sortByTime = function () {
        return this;
    };
    Filter.prototype.filterByCurrentPage = function (currentPage) {
        this.histories = this.histories.filter(function (history) {
            var regex = new RegExp(currentPage);
            return regex.test(history.url);
        });
        return this;
    };
    Filter.prototype.nomalize = function () {
        var regex = /https:\/\/[-a-zA-Z0-9@:%._+~#=]{1,256}/;
        var nomalized = this.histories.reduce(function (acc, cur) {
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
        urls.forEach(function (url) { return url.sort(function (a, b) { return a.lastVisitTime - b.lastVisitTime; }); });
        return urls;
    };
    return Filter;
}());
function filterHistory(histories, _a) {
    var range = _a.range, searchTerm = _a.searchTerm, removedUrls = _a.removedUrls;
    return (new Filter(histories)
        .filterByRange(range)
        .filterBySearchTerm(searchTerm)
        .filterByRemovedUrls(removedUrls)
        .sortByTime()
        .nomalize());
}
exports.filterHistory = filterHistory;
function filterDetail(histories, _a) {
    var currentPage = _a.currentPage;
    return (new Filter(histories)
        .filterByCurrentPage(currentPage)
        .sortByTime()
        .nomalize());
}
exports.filterDetail = filterDetail;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(7);


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(8);
var App_1 = __webpack_require__(3);
var Element_1 = __webpack_require__(0);
var store_1 = __webpack_require__(2);
var Header_1 = __webpack_require__(10);
var PageRouter_1 = __webpack_require__(12);
__webpack_require__(20);
__webpack_require__(21);
var root = document.querySelector('#root');
var header = document.querySelector('#header');
App_1.setStore(store_1.default);
App_1.default.renderOnce(Header_1.default, header);
App_1.default.render(function () {
    return Element_1.render(Element_1.Div({ class: 'Main-Wrapper' })(PageRouter_1.default()()));
}, root);


/***/ }),
/* 8 */
/***/ (function(module, exports) {

(function devSetting() {
  if (!chrome || !chrome.history) {
    window.chrome = {};

    window.chrome.history = {
      search: async (query, callback) => {
        const histories = await fetch('./mockHistory.json');
        const parsed = await histories.json();
        callback(parsed);
      }
    };

    window.chrome.search = {
      query: (option, callback) => {
        console.log(option);
        callback();
      }
    };

    window.chrome.storage = {
      sync: {
        get: (callback) => {
          callback({
            likedItems: [
              { title: 'mocktitle', url: 'https://www.google.com', count: 1 },
              { title: 'mocktitle', url: 'https://www.google.com', count: 2 },
              { title: 'mocktitle', url: 'https://www.google.com', count: 11 },
              { title: 'mocktitle', url: 'https://www.google.com', count: 21 },
            ]
          });
        }
      }
    };
  }
})();


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.NAV_MENU = exports.TYPE = void 0;
var TYPE;
(function (TYPE) {
    TYPE[TYPE["SET_RANGE"] = 0] = "SET_RANGE";
    TYPE[TYPE["SET_SEARCH_TERM"] = 1] = "SET_SEARCH_TERM";
    TYPE[TYPE["SET_CURRENT_PAGE"] = 2] = "SET_CURRENT_PAGE";
    TYPE[TYPE["SET_REMOVED_URLS"] = 3] = "SET_REMOVED_URLS";
    TYPE[TYPE["SET_HISTORIES"] = 4] = "SET_HISTORIES";
    TYPE[TYPE["SET_LIKED_ITEMS"] = 5] = "SET_LIKED_ITEMS";
})(TYPE = exports.TYPE || (exports.TYPE = {}));
var NAV_MENU;
(function (NAV_MENU) {
    NAV_MENU[NAV_MENU["MAIN"] = 0] = "MAIN";
    NAV_MENU[NAV_MENU["LIKED"] = 1] = "LIKED";
})(NAV_MENU = exports.NAV_MENU || (exports.NAV_MENU = {}));


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Element_1 = __webpack_require__(0);
var Store_1 = __webpack_require__(1);
var store_1 = __webpack_require__(2);
var constants_1 = __webpack_require__(4);
__webpack_require__(11);
function Header() {
    var navMenu = constants_1.PAGES;
    var dispatch = Store_1.useDispatch();
    var handleSetSearchTerm = function (val) {
        dispatch(store_1.setSearchTerm(val));
    };
    var handleSetRange = function (val) {
        dispatch(store_1.setRange(val));
    };
    var handleSetCurrentPage = function (val) {
        dispatch(store_1.setCurrentPage(val));
    };
    var handleReset = function () {
        dispatch(store_1.setRange(constants_1.DEFAULT_RANGE));
        dispatch(store_1.setSearchTerm(''));
        dispatch(store_1.setCurrentPage(constants_1.DEFAULT_PAGE));
        dispatch(store_1.setRemovedUrls([]));
    };
    return Element_1.render(Element_1.Div({ class: 'Header-Wrapper' })(Element_1.Nav()(Element_1.Ul().apply(void 0, navMenu.map(function (currentPage) { return Element_1.Li({
        event: {
            type: 'click',
            callback: function (ev) { return handleSetCurrentPage(ev.target.textContent); },
        }
    })(currentPage); }))), Element_1.Div({ class: 'Header-Column' })(Element_1.Img({
        src: './main-icon-128.png',
        event: {
            type: 'click',
            callback: handleReset,
        }
    })(), Element_1.Input({
        class: 'Search-Input',
        placeholder: '검색을 껌색하세요!',
        event: {
            type: 'input',
            callback: function (ev) { return handleSetSearchTerm(ev.target.value); }
        }
    })()), Element_1.Input({
        type: 'range',
        min: '0',
        max: '7',
        class: 'Range-Input',
        event: {
            type: 'input',
            callback: function (ev) { return handleSetRange(ev.target.value); },
        }
    })()));
}
exports.default = Header;


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var App_1 = __webpack_require__(3);
var Store_1 = __webpack_require__(1);
var Element_1 = __webpack_require__(0);
var DetailContents_1 = __webpack_require__(13);
var MainPage_1 = __webpack_require__(15);
var LikedPage_1 = __webpack_require__(18);
var store_1 = __webpack_require__(2);
var constants_1 = __webpack_require__(4);
__webpack_require__(19);
function PageRouter() {
    var _a = Store_1.useSelector(), histories = _a.histories, likedItems = _a.likedItems, currentPage = _a.currentPage;
    var dispatch = Store_1.useDispatch();
    App_1.useEffect(function () {
        var WEEK_BY_MILLISECOND = (7 * 24 * 3600 * 1000);
        var query = {
            text: '',
            maxResults: 0,
            startTime: (new Date()).getTime() - WEEK_BY_MILLISECOND,
            endTime: (new Date()).getTime()
        };
        chrome.history.search(query, function (history) {
            dispatch(store_1.setHistories(history));
        });
        chrome.storage.sync.get(function (_a) {
            var likedItems = _a.likedItems;
            dispatch(store_1.setLikedItems(likedItems));
        });
    }, []);
    if (currentPage === constants_1.MAIN_PAGE) {
        return Element_1.render(Element_1.Div()(MainPage_1.default({ histories: histories })()));
    }
    else if (currentPage === constants_1.LIKED_PAGE) {
        return Element_1.render(Element_1.Div()(LikedPage_1.default({ likedItems: likedItems })()));
    }
    else {
        return Element_1.render(Element_1.Div()(DetailContents_1.default({ currentPage: currentPage, histories: histories })()));
    }
}
exports.default = PageRouter;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Element_1 = __webpack_require__(0);
__webpack_require__(14);
var filterHistory_1 = __webpack_require__(5);
function DetailContents(_a) {
    var currentPage = _a.currentPage, histories = _a.histories;
    var filteredHistories = filterHistory_1.filterDetail(histories, { currentPage: currentPage });
    return Element_1.render(Element_1.Div({ class: 'DetailContents-Wrapper' })(Element_1.H1()(currentPage), Element_1.Div()(Element_1.Ul().apply(void 0, filteredHistories[0].map(function (history) {
        return Element_1.Li()(Element_1.A({
            href: history.url,
            target: '_blank',
            title: history.url,
        })(history.title));
    })))));
}
exports.default = DetailContents;


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Element_1 = __webpack_require__(0);
var Store_1 = __webpack_require__(1);
var Contents_1 = __webpack_require__(16);
var filterHistory_1 = __webpack_require__(5);
function MainPage(_a) {
    var histories = _a.histories;
    var _b = Store_1.useSelector(), range = _b.range, searchTerm = _b.searchTerm, removedUrls = _b.removedUrls;
    var filteredHistories = filterHistory_1.filterHistory(histories, {
        range: Number(range),
        searchTerm: searchTerm,
        removedUrls: removedUrls,
    });
    return Element_1.render(Contents_1.default({ histories: filteredHistories })());
}
exports.default = MainPage;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Element_1 = __webpack_require__(0);
var Store_1 = __webpack_require__(1);
var store_1 = __webpack_require__(2);
__webpack_require__(17);
function SiteCard(_a) {
    var sites = _a.sites;
    var dispatch = Store_1.useDispatch();
    var removedUrls = Store_1.useSelector(function (state) { return state.removedUrls; });
    var origin = sites[0].origin.replace(/(^\w+:|^)\/\//, '');
    var handleSetCurrentPage = function (val) {
        dispatch(store_1.setCurrentPage(val));
    };
    var handleSetRemoveUrls = function () {
        dispatch(store_1.setRemovedUrls(__spreadArrays(removedUrls, [origin])));
    };
    var handleSearchInSite = function (val) {
        chrome.search.query({
            text: val + " site:" + origin,
            disposition: 'NEW_TAB',
        }, function () { });
    };
    return Element_1.render(Element_1.Div({ class: 'SiteCard-Wrapper' })(Element_1.Button({
        class: '.Close-Button',
        event: {
            type: 'click',
            callback: function () { return handleSetRemoveUrls(); },
        }
    })('X'), Element_1.Img({
        src: "https://www.google.com/s2/favicons?domain=" + origin
    })(), Element_1.H1({
        event: {
            type: 'click',
            callback: function (ev) { return handleSetCurrentPage(ev.target.textContent); },
        }
    })(origin), Element_1.Input({
        event: {
            type: 'change',
            callback: function (ev) { return handleSearchInSite(ev.target.value); },
        }
    })(), Element_1.Ul().apply(void 0, sites.map(function (site) {
        return Element_1.Li()(Element_1.A({
            href: site.url,
            target: '_blank',
            title: site.url,
        })(site.title));
    }))));
}
function Contents(_a) {
    var histories = _a.histories;
    return Element_1.render(Element_1.Div({ class: 'Contents-Wrapper' }).apply(void 0, histories.map(function (history) { return SiteCard({
        sites: history.slice(0, 10),
    })(); })));
}
exports.default = Contents;


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Element_1 = __webpack_require__(0);
function LikedPage(_a) {
    var likedItems = _a.likedItems;
    likedItems.sort(function (a, b) {
        return b.count - a.count;
    });
    var handleCountUp = function (url) {
        chrome.storage.sync.get(function (_a) {
            var likedItems = _a.likedItems;
            likedItems = likedItems.map(function (item) {
                if (item.url === url) {
                    item.count += 1;
                    return item;
                }
                else {
                    return item;
                }
            });
            console.log(likedItems);
            chrome.storage.sync.set({
                likedItems: likedItems
            }, function () { });
        });
    };
    return Element_1.render(Element_1.Div({ class: 'DetailContents-Wrapper' })(Element_1.H1()('Liked'), Element_1.Div()(Element_1.Ul().apply(void 0, likedItems.map(function (item) {
        return Element_1.Li()(Element_1.A({
            href: item.url,
            target: '_blank',
            title: item.url,
            event: {
                type: 'click',
                callback: function () { return handleCountUp(item.url); },
            }
        })(item.count + ' 번 검색한' + ' ' + item.title));
    })))));
}
exports.default = LikedPage;


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })
/******/ ]);