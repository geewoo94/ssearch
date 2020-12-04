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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Store = exports.Component = exports.App = void 0;
var App_1 = __webpack_require__(3);
exports.App = App_1.default;
var Component_1 = __webpack_require__(4);
exports.Component = Component_1.default;
var Store_1 = __webpack_require__(5);
exports.Store = Store_1.default;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var AppFactory_1 = __webpack_require__(0);
var MainApp_1 = __webpack_require__(6);
var app = new AppFactory_1.App();
var store = new AppFactory_1.Store();
app.setStore(store);
app.render(MainApp_1.default, document.querySelector('#root'));


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var App = /** @class */ (function () {
    function App() {
        this.store = null;
        this.root = null;
        this.component = null;
        if (!App.rendered) {
            App.rendered = this;
        }
        return App.rendered;
    }
    App.prototype.setStore = function (store) {
        this.store = store;
        store.app = App.rendered;
    };
    App.prototype.rerender = function () {
        this.render(this.component, this.root);
    };
    App.prototype.render = function (component, root) {
        if (!this.root) {
            this.root = root;
        }
        if (!this.component) {
            this.component = component;
        }
        root.textContent = '';
        var rendered = component();
        root.appendChild(rendered);
    };
    return App;
}());
exports.default = App;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Component = /** @class */ (function () {
    function Component(el) {
        this.el = document.createElement(el);
        this.children = [];
        this.props = null;
    }
    Component.prototype.setChild = function (child, props) {
        this.children.push({ child: child, props: props });
        return this;
    };
    Component.prototype.setChildren = function (children) {
        var _this = this;
        children.forEach(function (_a) {
            var child = _a.child, props = _a.props;
            _this.setChild(child, props);
        });
        return this;
    };
    Component.prototype.setProps = function (props) {
        this.props = props;
        return this;
    };
    Component.prototype.getProps = function () {
        return this.props;
    };
    Component.prototype.setText = function (text) {
        this.el.textContent = text;
        return this;
    };
    Component.prototype.setSrc = function (text) {
        this.el.setAttribute('src', text);
        return this;
    };
    Component.prototype.setEvent = function (event, callback) {
        this.el.addEventListener(event, callback);
        return this;
    };
    Component.prototype.render = function () {
        var _this = this;
        this.children.forEach(function (_a) {
            var child = _a.child, props = _a.props;
            _this.el.appendChild(child(props));
        });
        return this.el;
    };
    return Component;
}());
exports.default = Component;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var initialStorage = {
    navigationList: ['Main Menu', 'Liked'],
    currentPage: 'Main Menu',
};
var Store = /** @class */ (function () {
    function Store() {
        this.storage = initialStorage;
        this.app = null;
        if (!Store.rendered) {
            Store.rendered = this;
        }
        return Store.rendered;
    }
    Store.prototype.getStorage = function (item) {
        return this.storage[item];
    };
    Store.prototype.dispatch = function (action, payload) {
        switch (action) {
            case 'change': {
                this.storage.navigationList = payload;
            }
        }
        this.app.rerender();
    };
    return Store;
}());
exports.default = Store;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var AppFactory_1 = __webpack_require__(0);
var Navigation_1 = __webpack_require__(7);
var Pages_1 = __webpack_require__(11);
var store = new AppFactory_1.Store();
var MainApp = function () {
    var navigationList = store.getStorage('navigationList');
    var currentPage = store.getStorage('currentPage');
    return (new AppFactory_1.Component('div')
        .setChild(Navigation_1.default, { navigationList: navigationList })
        .setChild(Pages_1.default, { currentPage: currentPage })
        .render());
};
exports.default = MainApp;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var AppFactory_1 = __webpack_require__(0);
var Title_1 = __webpack_require__(8);
var NavigationList_1 = __webpack_require__(9);
var Navigation = function (_a) {
    var navigationList = _a.navigationList;
    return (new AppFactory_1.Component('div')
        .setChild(Title_1.default, { text: 'Navigation' })
        .setChild(NavigationList_1.default, { navigationList: navigationList })
        .render());
};
exports.default = Navigation;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var AppFactory_1 = __webpack_require__(0);
var Title = function (_a) {
    var text = _a.text;
    return (new AppFactory_1.Component('h1')
        .setText(text)
        .render());
};
exports.default = Title;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var AppFactory_1 = __webpack_require__(0);
var list_1 = __webpack_require__(10);
var NavigationList = function (_a) {
    var navigationList = _a.navigationList;
    return (new AppFactory_1.Component('nav')
        .setChild(list_1.default, { list: navigationList })
        .render());
};
exports.default = NavigationList;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var AppFactory_1 = __webpack_require__(0);
var List = function (_a) {
    var list = _a.list;
    var children = list.map(function (text) { return ({ child: function () { return new AppFactory_1.Component('li').setText(text).render(); } }); });
    return (new AppFactory_1.Component('ul')
        .setChildren(children)
        .render());
};
exports.default = List;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var MainMenuPage_1 = __webpack_require__(12);
// import LikedPage from './LikedPage';
var Pages = function (_a) {
    var currentPage = _a.currentPage;
    var page;
    if (currentPage === 'Main Menu') {
        page = MainMenuPage_1.default;
    }
    else if (currentPage === 'Liked') {
        // page = LikedPage;
    }
    return page();
};
exports.default = Pages;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var AppFactory_1 = __webpack_require__(0);
var Icon_1 = __webpack_require__(13);
// import SearchBar from '../atoms/SearchBar';
// import RangeInput from '../atoms/RangeInput';
// import SiteCard from '../molecules/SiteCard';
var MainMenuPage = function () {
    return (new AppFactory_1.Component('div')
        .setChild(Icon_1.default)
        // .setChild(SearchBar)
        // .setChild(RangeInput)
        // .setChild(SiteCard)
        .render());
};
exports.default = MainMenuPage;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var AppFactory_1 = __webpack_require__(0);
var Icon = function () {
    return (new AppFactory_1.Component('img')
        .setSrc('./main-icon-128.png')
        .render());
};
exports.default = Icon;


/***/ })
/******/ ]);