/*! @creativebulma/bulma-tagsinput v1.0.3 | (c) 2020 Gaetan | MIT License | https://github.com/CreativeBulma/bulma-tagsinput */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("BulmaTagsInput", [], factory);
	else if(typeof exports === 'object')
		exports["BulmaTagsInput"] = factory();
	else
		root["BulmaTagsInput"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _interopRequireDefault=__webpack_require__(0);Object.defineProperty(exports,"__esModule",{value:!0}),exports.escape=exports.cloneAttributes=exports.optionsFromDataset=exports.querySelectorAll=exports.querySelector=void 0;var _toConsumableArray2=_interopRequireDefault(__webpack_require__(19)),_defineProperty2=_interopRequireDefault(__webpack_require__(9)),_type=__webpack_require__(11);function ownKeys(a,b){var c=Object.keys(a);if(Object.getOwnPropertySymbols){var d=Object.getOwnPropertySymbols(a);b&&(d=d.filter(function(b){return Object.getOwnPropertyDescriptor(a,b).enumerable})),c.push.apply(c,d)}return c}function _objectSpread(a){for(var b,c=1;c<arguments.length;c++)b=null==arguments[c]?{}:arguments[c],c%2?ownKeys(Object(b),!0).forEach(function(c){(0,_defineProperty2["default"])(a,c,b[c])}):Object.getOwnPropertyDescriptors?Object.defineProperties(a,Object.getOwnPropertyDescriptors(b)):ownKeys(Object(b)).forEach(function(c){Object.defineProperty(a,c,Object.getOwnPropertyDescriptor(b,c))});return a}/**
 * querySelector under steroid
 * Can use as selector:
 *  - function
 *  - DOM Node
 *  - String
 * @param {String|Node|Function} selector 
 * @param {Node|undefined} node 
 */var querySelector=function querySelector(a,b){return(0,_type.isFunction)(a)?a(b):(0,_type.isNode)(a)?a:(0,_type.isString)(a)?(b&&(0,_type.isNode)(b)&&1===b.nodeType||(b=document),b.querySelector(a)):Array.isArray(a)||"undefined"!=typeof NodeList&&NodeList.prototype.isPrototypeOf(a)?a[0]:void 0};/** 
 * querySelectorAll under steroid
 * Can use as selector:
 *  - function
 *  - DOM Node
 *  - String
 * @param {String|Node|Function} selector 
 * @param {Node|undefined} node 
 */exports.querySelector=querySelector;var querySelectorAll=function querySelectorAll(a,b){return(0,_type.isFunction)(a)?a(b):(0,_type.isNode)(a)?[a]:(0,_type.isString)(a)?(b&&(0,_type.isNode)(b)&&1===b.nodeType||(b=document),b.querySelectorAll(a)):"undefined"!=typeof NodeList&&NodeList.prototype.isPrototypeOf(a)?a:[]};// Convert dataset into Object
exports.querySelectorAll=querySelectorAll;var optionsFromDataset=function optionsFromDataset(a){var b=1<arguments.length&&arguments[1]!==void 0?arguments[1]:{};return(0,_type.isNode)(a)?a.dataset?Object.keys(a.dataset).filter(function(a){return Object.keys(b).includes(a)}).reduce(function(b,c){return _objectSpread(_objectSpread({},b),{},(0,_defineProperty2["default"])({},c,a.dataset[c]))},{}):{}:{}};/**
 * Copy HTML attributes from a source element to a target element
 * @param {Node} target 
 * @param {Node} source 
 * @param {String} except list of attributes to skip (separated by space)
 */exports.optionsFromDataset=optionsFromDataset;var cloneAttributes=function cloneAttributes(a,b){var c=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;null!==c&&(c=c.split(" ")),(0,_toConsumableArray2["default"])(b.attributes).forEach(function(b){c.includes(b.nodeName)||a.setAttribute("id"===b.nodeName?"data-id":b.nodeName,b.nodeValue)})};/**
 * Escapes string for insertion into HTML, replacing special characters with HTML
 * entities.
 * @param {String} string
 */exports.cloneAttributes=cloneAttributes;var escape=function escape(a){return(0,_type.isString)(a)?a.replace(/(['"<>])/g,function(a){return{"<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[a]}):a};exports.escape=escape;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

module.exports = _createClass;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

module.exports = _assertThisInitialized;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

module.exports = _getPrototypeOf;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(16);

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) setPrototypeOf(subClass, superClass);
}

module.exports = _inherits;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(8);

var assertThisInitialized = __webpack_require__(4);

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return assertThisInitialized(self);
}

module.exports = _possibleConstructorReturn;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

module.exports = _defineProperty;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

module.exports = _arrayLikeToArray;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _interopRequireDefault=__webpack_require__(0);Object.defineProperty(exports,"__esModule",{value:!0}),exports.isSelectorValid=exports.BooleanParse=exports.isNode=exports.isPromise=exports.isObject=exports.isString=exports.isFunction=void 0;var _typeof2=_interopRequireDefault(__webpack_require__(8)),isFunction=function isFunction(a){return"function"==typeof a};exports.isFunction=isFunction;var isString=function isString(a){return"string"==typeof a||!!a&&"object"===(0,_typeof2["default"])(a)&&"[object String]"===Object.prototype.toString.call(a)};exports.isString=isString;var isObject=function isObject(a){return("function"==typeof a||"object"===(0,_typeof2["default"])(a)&&!!a)&&!Array.isArray(a)};// Returns true if the value has a "then" function. Adapted from
// https://github.com/graphql/graphql-js/blob/499a75939f70c4863d44149371d6a99d57ff7c35/src/jsutils/isPromise.js
exports.isObject=isObject;var isPromise=function isPromise(a){return!!(a&&"function"==typeof a.then)};exports.isPromise=isPromise;var isNode=function isNode(a){try{return Node.prototype.cloneNode.call(a,!1),!0}catch(a){return!1}};/**
 * Convert String (false,False,True,true,no,yes,0,1) to real Boolean
 * @param {String} val 
 */exports.isNode=isNode;var BooleanParse=function BooleanParse(a){return!/^(?:f(?:alse)?|no?|0+)$/i.test(a)&&!!a};/**
 * Check if given query selector is valid
 * @param {String} selector 
 */exports.BooleanParse=BooleanParse;var isSelectorValid=function isSelectorValid(a){var b=function queryCheck(a){return document.createDocumentFragment().querySelector(a)};try{b(a)}catch(a){return!1}return!0};exports.isSelectorValid=isSelectorValid;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=void 0;var _dom=__webpack_require__(1),_default=function _default(a){return"<span class=\"tag ".concat((0,_dom.escape)(a.style),"\" data-value=\"").concat((0,_dom.escape)(a.value),"\">\n        ").concat((0,_dom.escape)(a.text),"\n        ").concat(a.removable?"<div class=\"delete is-small\" data-tag=\"delete\"></div>":"","\n    </span>")};exports["default"]=_default;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _interopRequireDefault=__webpack_require__(0);Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=void 0;var _classCallCheck2=_interopRequireDefault(__webpack_require__(2)),_createClass2=_interopRequireDefault(__webpack_require__(3)),_assertThisInitialized2=_interopRequireDefault(__webpack_require__(4)),_get2=_interopRequireDefault(__webpack_require__(14)),_inherits2=_interopRequireDefault(__webpack_require__(6)),_possibleConstructorReturn2=_interopRequireDefault(__webpack_require__(7)),_getPrototypeOf2=_interopRequireDefault(__webpack_require__(5)),_component=_interopRequireDefault(__webpack_require__(17)),_dom=__webpack_require__(1),_type=__webpack_require__(11),_defaultOptions=_interopRequireDefault(__webpack_require__(25)),_tag=_interopRequireDefault(__webpack_require__(12)),_wrapper=_interopRequireDefault(__webpack_require__(26)),_dropdownItem=_interopRequireDefault(__webpack_require__(27));function _createSuper(a){var b=_isNativeReflectConstruct();return function _createSuperInternal(){var c,d=(0,_getPrototypeOf2["default"])(a);if(b){var e=(0,_getPrototypeOf2["default"])(this).constructor;c=Reflect.construct(d,arguments,e)}else c=d.apply(this,arguments);return(0,_possibleConstructorReturn2["default"])(this,c)}}function _isNativeReflectConstruct(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(a){return!1}}// TODO: add pattern or function to valdiate value before adding
var BulmaTagsInput=/*#__PURE__*/function(a){function BulmaTagsInput(a){var c,d=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{};return(0,_classCallCheck2["default"])(this,BulmaTagsInput),c=b.call(this,a,d,_defaultOptions["default"]),c.options.allowDuplicates=(0,_type.BooleanParse)(c.options.allowDuplicates),c.options.caseSensitive=(0,_type.BooleanParse)(c.options.caseSensitive),c.options.clearSelectionOnTyping=(0,_type.BooleanParse)(c.options.clearSelectionOnTyping),c.options.closeDropdownOnItemSelect=(0,_type.BooleanParse)(c.options.closeDropdownOnItemSelect),c.options.freeInput=(0,_type.BooleanParse)(c.options.freeInput),c.options.highlightDuplicate=(0,_type.BooleanParse)(c.options.highlightDuplicate),c.options.highlightMatchesString=(0,_type.BooleanParse)(c.options.highlightMatchesString),c.options.removable=(0,_type.BooleanParse)(c.options.removable),c.options.searchOn=c.options.searchOn.toLowerCase(),c.options.selectable=(0,_type.BooleanParse)(c.options.selectable),c.options.trim=(0,_type.BooleanParse)(c.options.trim),c._onDocumentClick=c._onDocumentClick.bind((0,_assertThisInitialized2["default"])(c)),c._onInputChange=c._onInputChange.bind((0,_assertThisInitialized2["default"])(c)),c._onInputClick=c._onInputClick.bind((0,_assertThisInitialized2["default"])(c)),c._onInputFocusOut=c._onInputFocusOut.bind((0,_assertThisInitialized2["default"])(c)),c._onInputFocusIn=c._onInputFocusIn.bind((0,_assertThisInitialized2["default"])(c)),c._onInputKeyDown=c._onInputKeyDown.bind((0,_assertThisInitialized2["default"])(c)),c._onInputKeyPress=c._onInputKeyPress.bind((0,_assertThisInitialized2["default"])(c)),c._onOriginalInputChange=c._onOriginalInputChange.bind((0,_assertThisInitialized2["default"])(c)),c._onTagDeleteClick=c._onTagDeleteClick.bind((0,_assertThisInitialized2["default"])(c)),c._onTagClick=c._onTagClick.bind((0,_assertThisInitialized2["default"])(c)),c._onDropdownItemClick=c._onDropdownItemClick.bind((0,_assertThisInitialized2["default"])(c)),c.items=[],c._selected=-1,c._init(),c}/**
	 * Initiate all DOM element corresponding to selector
	 * @method
	 * @return {Array} Array of all Plugin instances
	 */(0,_inherits2["default"])(BulmaTagsInput,a);var b=_createSuper(BulmaTagsInput);return(0,_createClass2["default"])(BulmaTagsInput,[{key:"_init",/**
	 * Initiate plugin
	 * @method init
	 * @return {void}
	 */value:function _init(){var a=this;this._isSelect="SELECT"===this.element.tagName,this._isMultiple=this._isSelect&&this.element.hasAttribute("multiple"),this._objectItems="undefined"!=typeof this.options.itemValue||this._isSelect,this.options.itemValue=this.options.itemValue?this.options.itemValue:this._isSelect?"value":void 0,this.options.itemText=this.options.itemText?this.options.itemText:this._isSelect?"text":void 0,"undefined"==typeof this.options.itemText&&(this.options.itemText=this.options.itemValue),this.options.freeInput=!this._objectItems&&this.options.freeInput,this.source=null,"undefined"!=typeof this.options.source&&(!["value","text"].includes(this.options.searchOn)&&(this.options.searchOn=_defaultOptions["default"].searchOn),(0,_type.isPromise)(this.options.source)?this.source=this.options.source:(0,_type.isFunction)(this.options.source)?this.source=function(b){return Promise.resolve(a.options.source(b))}:Array.isArray(this.options.source)&&(this.source=function(b){return Promise.resolve(a.options.source.filter(function(c){var d=a._objectItems?c[a.options.itemValue]:c;return a.options.caseSensitive?d.includes(b):d.toLowerCase().includes(b.toLowerCase())}))})),this._manualInputAllowed=!this._isSelect&&this.options.freeInput,this._filterInputAllowed=this._isSelect||this.source,this._build()}/**
     * Build TagsInput DOM elements
     */},{key:"_build",value:function _build(){var a=this,b=document.createRange().createContextualFragment((0,_wrapper["default"])({emptyTitle:"undefined"==typeof this.options.noResultsLabel?"No results found":this.options.noResultsLabel,placeholder:this.element.placeholder?this.element.placeholder:this.options.placeholder,uuid:this.id}));this.container=b.firstElementChild,this.input=this.container.querySelector("input"),this.dropdown=this.container.querySelector("#".concat(this.id,"-list .dropdown-content")),this.dropdownEmptyOption=this.dropdown.querySelector(".empty-title"),(0,_dom.cloneAttributes)(this.input,this.element,"data-type multiple name type value"),this.element.disabled&&(this.container.setAttribute("disabled","disabled"),this.options.removable=!1,this.options.selectable=!1),(this.input.getAttribute("disabled")||this.input.classList.contains("is-disabled"))&&this.container.setAttribute("disabled","disabled"),this._manualInputAllowed||this.container.classList.add(this._filterInputAllowed?"is-filter":"no-input"),this._isSelect||"undefined"!=typeof this.options.source||(this.dropdown.remove(),this.dropdown=null,this.input.setAttribute("list",null)),this._isSelect?Array.from(this.element.options).forEach(function(b){b.selected&&a.add(b.value?b:{value:b.text,text:b.text},!0),a._createDropdownItem(b)}):this.element.value.length&&this.add(this._objectItems?JSON.parse(this.element.value):this.element.value,!0),this._bindEvents(),this.element.parentNode.insertBefore(this.container,this.element),this.element.style.display="none"}/**
     * Bind all events listener
     */},{key:"_bindEvents",value:function _bindEvents(){document.addEventListener("click",this._onDocumentClick),this.element.addEventListener("change",this._onOriginalInputChange),this.input.addEventListener("input",this._onInputChange),this.input.addEventListener("click",this._onInputClick),this.input.addEventListener("keydown",this._onInputKeyDown),this.input.addEventListener("keypress",this._onInputKeyPress),this.input.addEventListener("focusout",this._onInputFocusOut),this.input.addEventListener("focusin",this._onInputFocusIn)}/**
     * Check if caret is at the beginning of the input value
     */},{key:"_caretAtStart",value:function _caretAtStart(){try{return 0===this.input.selectionStart&&0===this.input.selectionEnd}catch(a){return""===this.input.value}}/**
     * Check value length constraint if option activated
     * @param {string|object} item 
     */},{key:"_checkLength",value:function _checkLength(a){var b=this._objectItems?a[this.options.itemValue]:a;return!(0,_type.isString)(b)||b.length>=this.options.minChars&&("undefined"==typeof this.options.maxChars||b.length<=this.options.maxChars)}/**
     * Close dropdown
     */},{key:"_closeDropdown",value:function _closeDropdown(){this.dropdown&&(this.emit("before.dropdown.close",this),this.container.classList.remove("is-active"),this.emit("after.dropdown.close",this))}/**
     * Create a new dropdown item based on given item data
     * @param {String|Object} item 
     */},{key:"_createDropdownItem",value:function _createDropdownItem(a){if(this.dropdown){// TODO: add possibility to provide template through options
var b=document.createRange().createContextualFragment((0,_dropdownItem["default"])({text:a.text,value:a.value})),c=b.firstElementChild;c.dataset.value=a.value,c.dataset.text=a.text,c.addEventListener("click",this._onDropdownItemClick),this.dropdown.append(c)}}/**
     * Create a new tag and add it to the DOM
     * @param string value 
     */},{key:"_createTag",value:function _createTag(a){var b=document.createRange().createContextualFragment((0,_tag["default"])({removable:this.options.removable,style:this.options.tagClass,text:a.text,value:a.value})),c=b.firstElementChild;if(c.addEventListener("click",this._onTagClick),this.options.removable){// Find delete button and attach click event
var d=c.querySelector(".delete");d&&d.addEventListener("click",this._onTagDeleteClick)}// insert new tag at the end (ie just before input)
this.container.insertBefore(c,this.input)}/**
     * Remove all dropdown items except the empty title
     */},{key:"_emptyDropdown",value:function _emptyDropdown(){this.dropdown&&Array.from(this.dropdown.children).filter(function(a){return!a.classList.contains("empty-title")}).forEach(function(a){a.remove()})}/**
     * Find needle into a string and wrap it with <mark> HTML tag
     * @param {String} string 
     * @param {String} needle 
     */},{key:"_highlightMatchesInString",value:function _highlightMatchesInString(a,b){var c=new RegExp("("+b+")(?![^<]*>|[^<>]*</)","i");// explanation: http://stackoverflow.com/a/18622606/1147859
// If the regex doesn't match the string just return initial string
if(!a.match(c))return a;// Otherwise, get to highlighting
var d=a.match(c).index,e=d+a.match(c)[0].toString().length,f=a.substring(d,e);return a=a.replace(c,"<mark class=\"is-highlighted\">".concat(f,"</mark>")),a}/**
     * Open dropdown
     */},{key:"_openDropdown",value:function _openDropdown(){this.dropdown&&this.container.classList.add("is-active")}/**
     * Propagate internal input changes to the original input
     */},{key:"_propagateChange",value:function _propagateChange(){var a=this;this._isSelect?(Array.from(this.element.options).forEach(function(a){a.setAttribute("selected",void 0),a.selected=!1,"undefined"!=typeof a.dataset.source&&a.remove()}),this.items.forEach(function(b){a._updateSelectOptions({value:a._objectItems?b[a.options.itemValue]:b,text:a._objectItems?b[a.options.itemText]:b})})):this.element.value=this.value;// Trigger Change event manually (because original input is now hidden)
// Trick: Passes current class constructor name to prevent loop with _onOriginalInputChange handler)
var b=new CustomEvent("change",{detail:this.constructor.name});this.element.dispatchEvent(b)}/**
     * Trim value if option activated
     * @param {string|object} item 
     */},{key:"_trim",value:function _trim(a){return this.options.trim&&(this._objectItems?((0,_type.isString)(a[this.options.itemValue])&&(a[this.options.itemValue]=a[this.options.itemValue].trim()),(0,_type.isString)(a[this.options.itemText])&&(a[this.options.itemText]=a[this.options.itemText].trim())):a=a.trim()),a}/**
     * Filter Dropdown items to be compliant with already selected items and current input value
     * Filtering is made on Text by default (can be changed with option)
     */},{key:"_filterDropdownItems",value:function _filterDropdownItems(){var a=this,b=0<arguments.length&&void 0!==arguments[0]?arguments[0]:null;if(this.dropdown&&this.emit("before.dropdown.filter",this)){Array.from(this.dropdown.children).filter(function(a){return!a.classList.contains("empty-title")}).forEach(function(c){var d=c.dataset[a.options.searchOn];// Remove highlights
if(a.options.highlightMatchesString&&(c.textContent=c.textContent.replace(/<\/?(mark\s?(class="is\-highlighted")?)?>]*>?/gm,"")),b&&b.length?(c.style.display=a.options.caseSensitive?d.includes(b)?"block":"none":d.toLowerCase().includes(b.toLowerCase())?"block":"none",a.options.highlightMatchesString&&(c.innerHTML=a._highlightMatchesInString(c.innerHTML,b))):c.style.display="block",!a.options.allowDuplicates||a._isSelect&&!a._isMultiple){var e="value"===a.options.searchOn?a.hasValue(d):a.hasText(d);c.style.display=e?"none":c.style.display}});var c=Array.from(this.dropdown.children).filter(function(a){return!a.classList.contains("empty-title")}).some(function(a){return"none"!==a.style.display});return this.dropdownEmptyOption.style.display=c?"none":"block",this.emit("after.dropdown.filter",this),c}return!0}/**
     * Update original select option based on given item
     * @param {String|Object} item 
     */},{key:"_updateSelectOptions",value:function _updateSelectOptions(a){if(this._isSelect){// Check to see if the tag exists in its raw or uri-encoded form
var b=this.element.querySelector("option[value=\"".concat(encodeURIComponent(a.value),"\"]"))||this.element.querySelector("option[value=\"".concat(a.value,"\"]"));// add <option /> if item represents a value not present in one of the <select />'s options
if(!b){var c=document.createRange().createContextualFragment("<option value=\"".concat(a.value,"\" data-source=\"").concat(this.id,"\" selected>").concat(a.text,"</option>"));b=c.firstElementChild,this.element.add(b)}// mark option as selected
b.setAttribute("selected","selected"),b.selected=!0}}/**
     * Add given item
     * item = 'john'
     * item = 'john,jane'
     * item = ['john', 'jane']
     * item = [{
     *  "value": "1",
     *  "text": "John"
     * }, {
     *  "value": "2",
     *  "text": "Jane"
     * }]
     * @param {String|Object} item 
     * @param {Boolean} silently Should the change be propagated to the original element
     */},{key:"add",value:function add(a){var b=this,c=!!(1<arguments.length&&void 0!==arguments[1])&&arguments[1];// Check if number of items is limited ans reached
if("undefined"!=typeof this.options.maxTags&&this.items.length>=this.options.maxTags)return this;// Make sure to work with an array of items
// If string items are expected then check every item is a string
if(a=Array.isArray(a)?a:(0,_type.isObject)(a)?[a]:a.split(this.options.delimiter),!this._objectItems&&a.filter(function(a){return(0,_type.isString)(a)}).length!==a.length)throw"Item must be a string or an array of strings";// If object items are expected then check every item is an object
if(this._objectItems&&a.filter(function(a){return(0,_type.isObject)(a)}).length!==a.length)throw"Item must be an object or an array of objects";return a.forEach(function(a){// Check if item respects min/max chars
if(a=b._trim(a),b._checkLength(a)&&(b._isSelect&&!b._isMultiple&&0<b.items.length&&(b.removeAtIndex(0),b.element.remove(b.element.selectedIndex)),a=b.emit("before.add",a)))// check if duplicates are allowed or not
if(b.options.allowDuplicates||!b.has(a)){var d={value:b._objectItems?a[b.options.itemValue]:a,text:b._objectItems?a[b.options.itemText]:a},e=b._createTag(d);b.items.push(a),c||(b._propagateChange(),b.emit("after.add",{item:a,tag:e}))}else{if(b.options.highlightDuplicate){var f=Array.from(b.container.children).filter(function(a){return a.classList.contains("tag")})[b.indexOf(a)];f&&(f.classList.add("is-duplicate"),setTimeout(function(){f.classList.remove("is-duplicate")},1250))}b.emit("item.duplicate",a)}}),this}/**
     * Unselect the selected item
     */},{key:"clearSelection",value:function clearSelection(){if(0<=this._selected){var a=this.items[this._selected],b=Array.from(this.container.children).filter(function(a){return a.classList.contains("tag")})[this._selected];this.emit("before.unselect",{item:a,tag:b})&&(b&&b.classList.remove("is-selected"),this._selected=-1,this.emit("after.unselect",{item:a,tag:b}))}return this}/**
     * Shortcut to removeAll method
     */},{key:"flush",value:function flush(){return this.removeAll()}/**
     * Sets focus on the input
     */},{key:"focus",value:function focus(){return this.container.classList.add("is-focused"),this.input.focus(),this}/**
     * Check if given item is present
     * @param {String} item 
     */},{key:"has",value:function has(a){var b=this;return a=this._trim(a),this._objectItems?this.items.some(function(c){return b.options.caseSensitive||!(0,_type.isString)(c[b.options.itemValue])?c[b.options.itemValue]===a[b.options.itemValue]:c[b.options.itemValue].toLowerCase()===a[b.options.itemValue].toLowerCase()}):this.hasValue(a)}/**
     * Check if given text is present
     * @param {String} value 
     */},{key:"hasText",value:function hasText(a){var b=this;return this.options.trim&&(a=a.trim()),this.items.some(function(c){var d=b._objectItems?c[b.options.itemText]:c;return b.options.caseSensitive?d===a:d.toLowerCase()===a.toLowerCase()})}/**
     * Check if given value is present
     * @param {String} value 
     */},{key:"hasValue",value:function hasValue(a){var b=this;return this.options.trim&&(a=a.trim()),this.items.some(function(c){var d=b._objectItems?c[b.options.itemValue]:c;return b.options.caseSensitive?d===a:d.toLowerCase()===a.toLowerCase()})}/**
     * Get index of given item
     * @param {string} item 
     */},{key:"indexOf",value:function indexOf(a){if(a=this._trim(a),this._objectItems){if(!(0,_type.isObject)(a))throw"Item must be an object";return this.items.map(function(a){return a.value}).indexOf(a.value)}return this.items.indexOf(a)}/**
     * Returns the internal input element
     */},{key:"input",value:function input(){return this.input}/**
     * Get items
     */},{key:"items",value:function items(){return this.items}/**
     * Remove given item
     * item = 'john'
     * item = 'john,jane'
     * @param String item 
     */},{key:"remove",value:function remove(a){var b=this;if(this.options.removable){// If string items are expected then check every item is a string
if(a=Array.isArray(a)?a:(0,_type.isObject)(a)?[a]:a.split(this.options.delimiter),!this._objectItems&&a.filter(function(a){return(0,_type.isString)(a)}).length!==a.length)throw"Item must be a string or an array of strings";// If object items are expected then check every item is an object
if(this._objectItems&&a.filter(function(a){return(0,_type.isObject)(a)}).length!==a.length)throw"Item must be an object or an array of objects";a.forEach(function(a){for(var c=b.indexOf(a);0<=c;)b.removeAtIndex(c),c=b.indexOf(a)})}return this}/**
     * Remove all tags at once
     */},{key:"removeAll",value:function removeAll(){return this.options.removable&&this.emit("before.flush",this.items)&&(this.clearSelection(),Array.from(this.container.children).filter(function(a){return a.classList.contains("tag")}).forEach(function(a){return a.remove()}),this.items=[],this._filterDropdownItems(),this._propagateChange(),this.emit("after.flush",this.items)),this}/**
     * Remove item at given index
     * @param Integer index 
     */},{key:"removeAtIndex",value:function removeAtIndex(a){var b=!(1<arguments.length&&void 0!==arguments[1])||arguments[1];if(this.options.removable&&!isNaN(a)&&0<=a&&a<this.items.length){var c=Array.from(this.container.children).filter(function(a){return a.classList.contains("tag")})[a],d=this.items[a];this.emit("before.remove",d)&&(b&&this.clearSelection(),c&&c.remove(),this._isSelect&&(this.element.options[a].selected=!1),this._selected==a?this._selected=-1:0<=this._selected&&(this._selected-=1),this.items.splice(a,1),this._filterDropdownItems(),this._propagateChange(),this.emit("after.remove",d))}return this}/**
     * Select given item
     * @param {string} item 
     */},{key:"select",value:function select(a){var b=this;if(this.options.selectable){// If string items are expected then check every item is a string
if(a=Array.isArray(a)?a:(0,_type.isObject)(a)?[a]:a.split(this.options.delimiter),!this._objectItems&&a.filter(function(a){return(0,_type.isString)(a)}).length!==a.length)throw"Item must be a string or an array of strings";// If object items are expected then check every item is an object
if(this._objectItems&&a.filter(function(a){return(0,_type.isObject)(a)}).length!==a.length)throw"Item must be an object or an array of objects";a.forEach(function(a){b.selectAtIndex(b.indexOf(a))})}return this}/**
     * Select tag at given index
     * @param Integer index 
     */},{key:"selectAtIndex",value:function selectAtIndex(a){if(this.options.selectable&&(this.clearSelection(),!isNaN(a)&&0<=a&&a<this.items.length)){var b=Array.from(this.container.children).filter(function(a){return a.classList.contains("tag")})[a],c=this.items[a];this.emit("before.select",{item:c,tag:b})&&(b&&b.classList.add("is-selected"),this._selected=a,this.emit("after.select",{item:c,tag:b}))}return this}/**
     * Get selected item
     */},{key:"_onDocumentClick",/**
     * Document click event handler
     * @param {Event} e 
     */value:function _onDocumentClick(a){if(this.dropdown){// If we click on element inside container then do nothing
if(this.container.contains(a.target))return;// Tag and delete button already deleted when event triggered
// So we check if target is a tag delete button
if(a.target.dataset.tag&&"delete"===a.target.dataset.tag)return;// Click outside dropdown so close it
this._closeDropdown()}}/**
     * Input focus lost event handler
     * @param {Event} e 
     */},{key:"_onDropdownItemClick",value:function _onDropdownItemClick(a){if(a.preventDefault(),this.dropdown){if(this._objectItems){var b={};b[this.options.itemText]=a.currentTarget.dataset.text,b[this.options.itemValue]=a.currentTarget.dataset.value,this.add(b)}else this.add(a.currentTarget.dataset.value);this._filterDropdownItems(),this.input.value="",this.input.focus(),this.options.closeDropdownOnItemSelect&&this._closeDropdown()}}/**
     * Input change event handler
     * @param {Event} e 
     */},{key:"_onInputChange",value:function _onInputChange(){this._filterDropdownItems(this.input.value)}/**
     * Input click event handler
     * @param {Event} e 
     */},{key:"_onInputClick",value:function _onInputClick(a){a.preventDefault(),(!this.source||this.input.value.length>=this.options.searchMinChars)&&(this._openDropdown(),this._filterDropdownItems())}/**
     * Input focus event handler
     * 
     * @param {Event} e 
     */},{key:"_onInputFocusIn",value:function _onInputFocusIn(a){return a.preventDefault(),null!==this.container.getAttribute("disabled")||this.container.classList.contains("is-disabled")?(this.input.blur(),!1):void this.container.classList.add("is-focused")}/**
     * Input focus lost event handler
     * @param {Event} e 
     */},{key:"_onInputFocusOut",value:function _onInputFocusOut(a){a.preventDefault(),this.container.classList.remove("is-focused")}/**
     * Input Keydown event handler
     * 
     * @param {Event} e 
     */},{key:"_onInputKeyDown",value:function _onInputKeyDown(a){var b=a.charCode||a.keyCode||a.which;switch(b){// BACKSPACE
case 8:if(this.options.removable&&this._caretAtStart()&&0<=this._selected){var c=this._selected;// If tag was selected then select next (or previous if next does not exists)
0<=c&&this.selectAtIndex(c+1<this.items.length?c+1:c-1),this.removeAtIndex(c,!1)}this.source&&this.input.value.length<this.options.searchMinChars&&this._closeDropdown();break;// ESCAPE
case 27:0<=this._selected&&this.clearSelection(),this._closeDropdown();break;// DELETE
case 46:if(this.options.removable&&this._caretAtStart()&&0<=this._selected){var d=this._selected;// If tag was selected then select next (or previous if next does not exists)
0<=d&&this.selectAtIndex(d+1<this.items.length?d+1:d-1),this.removeAtIndex(d,!1)}this.source&&this.input.value.length<this.options.searchMinChars&&this._closeDropdown();break;// LEFT ARROW
case 37:this.input.value.length||(0>this._selected?this.selectAtIndex(this.items.length-1):this.selectAtIndex(0<=this._selected-1?this._selected-1:this.items.length-1));break;// RIGHT ARROW
case 39:this.input.value.length||(0>this._selected?this.selectAtIndex(0):this.selectAtIndex(this._selected+1>=this.items.length?0:this._selected+1));break;default:this.options.clearSelectionOnTyping&&this.clearSelection();// ignore
}}/**
     * Input Keypress event handler
     * 
     * @param {Event} e 
     */},{key:"_onInputKeyPress",value:function _onInputKeyPress(a){var b=this,c=a.charCode||a.keyCode||a.which,d=this._trim(this.input.value)+String.fromCharCode(c);if(!this._manualInputAllowed&&!this._filterInputAllowed)return a.preventDefault(),!1;// ENTER
if(!d.length&&13!==c)return!1;if(this._filterInputAllowed&&this._filterDropdownItems(d),this._filterInputAllowed&&this.source&&d.length>=this.options.searchMinChars&&13!==c&&(this._openDropdown(),this.dropdown.classList.add("is-loading"),this._emptyDropdown(),this.source(d).then(function(a){a=b.emit("on.results.received",a),a.length&&a.forEach(function(a){var c={value:null,text:null};(0,_type.isObject)(a)?(c.value=a[b.options.itemValue],c.text=a[b.options.itemText]):(c.value=a,c.text=a),b._createDropdownItem(c)}),b._filterDropdownItems(d),b.dropdown.classList.remove("is-loading")})["catch"](function(a){console.log(a)})),this._manualInputAllowed&&(d.includes(this.options.delimiter)||13==c)){a.preventDefault();// Split value by delimiter in case we copy/paste multiple values
var e=d.split(this.options.delimiter);return e.forEach(function(a){""!=(a=a.replace(b.options.delimiter,""))&&b.add(a)}),d="",this.input.value="",this._closeDropdown(),!1}}/**
     * Original input change event handler
     * CAUTION: because original input is now hidden the change event must be triggered manually on change
     * Example how to trigger change event manually
     * var changeEvent = new Event('change');
     * input.dispatchEvent(changeEvent);
     * 
     * @param {Event} e 
     */},{key:"_onOriginalInputChange",value:function _onOriginalInputChange(a){(!a.detail||(0,_type.isString)(a.detail)&&a.detail!==this.constructor.name)&&(this.value=a.currentTarget.value)}/**
     * Tag click event handler
     * 
     * @param {Event} e 
     */},{key:"_onTagClick",value:function _onTagClick(a){if(a.preventDefault(),a.currentTarget.classList.contains("delete"))return!1;if(null!==this.container.getAttribute("disabled")||this.container.classList.contains("is-disabled"))return!1;if(this.input.focus(),this.options.selectable){var b=a.currentTarget.closest(".tag");if(b){var c=Array.from(this.container.children).indexOf(b);c===this._selected?this.clearSelection():this.selectAtIndex(c)}}}/**
     * Delete tag button click event handler
     * 
     * @param {Event} e 
     */},{key:"_onTagDeleteClick",value:function _onTagDeleteClick(a){if(a.preventDefault(),null!==this.container.getAttribute("disabled")||this.container.classList.contains("is-disabled"))return!1;var b=a.currentTarget.closest(".tag");b&&this.removeAtIndex(Array.from(this.container.children).indexOf(b))}},{key:"selected",get:function get(){return 0<=this._selected?this.items[this._selected]:null}/**
     * Get selected item index
     */},{key:"selectedIndex",get:function get(){return this._selected}/**
     * Get value
     */},{key:"value",get:function get(){return this._isSelect?Array.from(this.element.options).filter(function(a){return a.selected}).map(function(a){return a.value}):this._objectItems?this.items.map(function(a){return a.value}).join(this.options.delimiter):this.items.join(this.options.delimiter)}/**
     * Set value
     */,set:function set(a){this.removeAll(),this.add(a)}}],[{key:"attach",value:function attach(){var a=0<arguments.length&&void 0!==arguments[0]?arguments[0]:"input[data-type=\"tags\"], input[type=\"tags\"], select[data-type=\"tags\"], select[type=\"tags\"]",b=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},c=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null;return(0,_get2["default"])((0,_getPrototypeOf2["default"])(BulmaTagsInput),"attach",this).call(this,a,b,c)}}]),BulmaTagsInput}(_component["default"]);exports["default"]=BulmaTagsInput;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var superPropBase = __webpack_require__(15);

function _get(target, property, receiver) {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    module.exports = _get = Reflect.get;
  } else {
    module.exports = _get = function _get(target, property, receiver) {
      var base = superPropBase(target, property);
      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);

      if (desc.get) {
        return desc.get.call(receiver);
      }

      return desc.value;
    };
  }

  return _get(target, property, receiver || target);
}

module.exports = _get;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var getPrototypeOf = __webpack_require__(5);

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = getPrototypeOf(object);
    if (object === null) break;
  }

  return object;
}

module.exports = _superPropBase;

/***/ }),
/* 16 */
/***/ (function(module, exports) {

function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

module.exports = _setPrototypeOf;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _interopRequireDefault=__webpack_require__(0);Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=void 0;var _defineProperty2=_interopRequireDefault(__webpack_require__(9)),_classCallCheck2=_interopRequireDefault(__webpack_require__(2)),_createClass2=_interopRequireDefault(__webpack_require__(3)),_assertThisInitialized2=_interopRequireDefault(__webpack_require__(4)),_inherits2=_interopRequireDefault(__webpack_require__(6)),_possibleConstructorReturn2=_interopRequireDefault(__webpack_require__(7)),_getPrototypeOf2=_interopRequireDefault(__webpack_require__(5)),_events=_interopRequireDefault(__webpack_require__(18)),_dom=__webpack_require__(1),_uuid=_interopRequireDefault(__webpack_require__(24));function ownKeys(a,b){var c=Object.keys(a);if(Object.getOwnPropertySymbols){var d=Object.getOwnPropertySymbols(a);b&&(d=d.filter(function(b){return Object.getOwnPropertyDescriptor(a,b).enumerable})),c.push.apply(c,d)}return c}function _objectSpread(a){for(var b,c=1;c<arguments.length;c++)b=null==arguments[c]?{}:arguments[c],c%2?ownKeys(Object(b),!0).forEach(function(c){(0,_defineProperty2["default"])(a,c,b[c])}):Object.getOwnPropertyDescriptors?Object.defineProperties(a,Object.getOwnPropertyDescriptors(b)):ownKeys(Object(b)).forEach(function(c){Object.defineProperty(a,c,Object.getOwnPropertyDescriptor(b,c))});return a}function _createSuper(a){var b=_isNativeReflectConstruct();return function _createSuperInternal(){var c,d=(0,_getPrototypeOf2["default"])(a);if(b){var e=(0,_getPrototypeOf2["default"])(this).constructor;c=Reflect.construct(d,arguments,e)}else c=d.apply(this,arguments);return(0,_possibleConstructorReturn2["default"])(this,c)}}function _isNativeReflectConstruct(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(a){return!1}}var Component=/*#__PURE__*/function(a){function Component(a){var c,d=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},e=2<arguments.length&&void 0!==arguments[2]?arguments[2]:{};// An invalid selector or non-DOM node has been provided.
if((0,_classCallCheck2["default"])(this,Component),c=b.call(this),c.element=(0,_dom.querySelector)(a,document),!c.element)throw new Error("An invalid selector or non-DOM node has been provided for ".concat(c.constructor.name,"."));return c.element[c.constructor.name]=c.constructor._interface.bind((0,_assertThisInitialized2["default"])(c)),c.element[c.constructor.name].Constructor=c.constructor.name,c.id=(0,_uuid["default"])(c.constructor.name+"-"),c.options=_objectSpread(_objectSpread(_objectSpread({},e),d),(0,_dom.optionsFromDataset)(c.element,e)),c}/**
	 * Initiate all DOM element corresponding to selector
	 * @method
	 * @return {Array} Array of all Plugin instances
	 */(0,_inherits2["default"])(Component,a);var b=_createSuper(Component);return(0,_createClass2["default"])(Component,null,[{key:"attach",value:function attach(){var a=this,b=0<arguments.length&&void 0!==arguments[0]?arguments[0]:null,c=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},d=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null,e=[];return null!==b&&((0,_dom.querySelectorAll)(b,d).forEach(function(d){"undefined"==typeof d[a.name]?e.push(new a(d,_objectSpread({selector:b},c))):e.push(d[a.name])}),"undefined"==typeof window[this.name]&&(window[this.name]={observers:[]}),window[this.name].observers&&!window[this.name].observers.includes(b)&&(this.observeDom(b,c),window[this.name].observers.push(b))),e}/**
	 * Observe DOM mutations to automatically initialize plugin on new elements when added to the DOM
	 * 
	 * @param {string} selector 
	 * @param {Object} options 
	 */},{key:"observeDom",value:function observeDom(a,b){var c=this,d=new MutationObserver(function(d){d.forEach(function(d){for(var e=0;e<d.addedNodes.length;e++)"undefined"!=typeof window[c.name]&&c.attach(a,b,d.addedNodes[e])})});"undefined"!=typeof document&&d.observe(document,{childList:!0,subtree:!0})}},{key:"_interface",value:function _interface(){var a=0<arguments.length&&void 0!==arguments[0]?arguments[0]:null,b=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{};if("string"==typeof a){if("undefined"==typeof this[a])throw new TypeError("No method named \"".concat(a,"\""));return this[a](b)}return this}}]),Component}(_events["default"]);exports["default"]=Component;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _interopRequireDefault=__webpack_require__(0);Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=void 0;var _classCallCheck2=_interopRequireDefault(__webpack_require__(2)),_createClass2=_interopRequireDefault(__webpack_require__(3)),EventEmitter=/*#__PURE__*/function(){/**
	 * Construct EventEmitter
	 * 
	 * @param {Array} listeners 
	 */function EventEmitter(){var a=0<arguments.length&&void 0!==arguments[0]?arguments[0]:[];(0,_classCallCheck2["default"])(this,EventEmitter),this._listeners=new Map(a),this._events=new Map}/**
     * Destroys EventEmitter
     */return(0,_createClass2["default"])(EventEmitter,[{key:"destroy",value:function destroy(){this._listeners={},this.events=[]}/**
	 * Count listeners registered for the provided eventName
	 * 
	 * @param {string} eventName 
	 */},{key:"listenerCount",value:function listenerCount(a){return this._listeners.has(a)?this._listeners.get(a).length:0}/**
     * Subscribes on event eventName specified function
	 * 
     * @param {string} eventName
     * @param {function} listener
     */},{key:"on",value:function on(a,b){this._addListener(a,b,!1)}/**
     * Subscribes on event name specified function to fire only once
	 * 
     * @param {string} eventName
     * @param {function} listener
     */},{key:"once",value:function once(a,b){this._addListener(a,b,!0)}/**
     * Removes event with specified eventName.
	 * 
     * @param {string} eventName
     */},{key:"off",value:function off(a){this._removeListeners(a)}/**
     * Emits event with specified name and params.
	 * 
     * @param {string} eventName
     * @param eventArgs
     */},{key:"emit",value:function emit(a){for(var b=arguments.length,c=Array(1<b?b-1:0),d=1;d<b;d++)c[d-1]=arguments[d];return this._applyEvents(a,c)}/**
	 * Register a new listener
	 * 
	 * @param {string} eventName 
	 * @param {function} listener 
	 * @param {bool} once 
	 */},{key:"_addListener",value:function _addListener(a,b){var c=this,d=!!(2<arguments.length&&void 0!==arguments[2])&&arguments[2];if(Array.isArray(a))a.forEach(function(a){return c._addListener(a,b,d)});else{a=a.toString();var e=a.split(/,|, | /);1<e.length?e.forEach(function(a){return c._addListener(a,b,d)}):(!Array.isArray(this._listeners.get(a))&&this._listeners.set(a,[]),this._listeners.get(a).push({once:d,fn:b}))}}/**
	 * 
	 * @param {string|null} eventName 
	 */},{key:"_removeListeners",value:function _removeListeners(){var a=this,b=0<arguments.length&&void 0!==arguments[0]?arguments[0]:null;if(null===b)this._listeners=new Map;else if(Array.isArray(b))name.forEach(function(b){return a.removeListeners(b)});else{b=b.toString();var c=b.split(/,|, | /);1<c.length?c.forEach(function(b){return a.removeListeners(b)}):this._listeners["delete"](b)}}/**
     * Applies arguments to specified event
	 * 
     * @param {string} eventName
     * @param {*[]} eventArguments
     * @protected
     */},{key:"_applyEvents",value:function _applyEvents(a,b){var c=b;if(this._listeners.has(a)){var d=this._listeners.get(a),e=[];return d.forEach(function(a,d){(c=a.fn.apply(null,b))&&a.once&&e.unshift(d)}),e.forEach(function(a){d.splice(a,1)}),c}return c[0]}}]),EventEmitter}();exports["default"]=EventEmitter;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithoutHoles = __webpack_require__(20);

var iterableToArray = __webpack_require__(21);

var unsupportedIterableToArray = __webpack_require__(22);

var nonIterableSpread = __webpack_require__(23);

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
}

module.exports = _toConsumableArray;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(10);

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return arrayLikeToArray(arr);
}

module.exports = _arrayWithoutHoles;

/***/ }),
/* 21 */
/***/ (function(module, exports) {

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

module.exports = _iterableToArray;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(10);

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}

module.exports = _unsupportedIterableToArray;

/***/ }),
/* 23 */
/***/ (function(module, exports) {

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

module.exports = _nonIterableSpread;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=void 0;var _default=function _default(){var a=0<arguments.length&&arguments[0]!==void 0?arguments[0]:"";return a+"10000000-1000-4000-8000-100000000000".replace(/[018]/g,function(a){return(a^crypto.getRandomValues(new Uint8Array(1))[0]&15>>a/4).toString(16)})};exports["default"]=_default;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _interopRequireDefault=__webpack_require__(0);Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=void 0;var _tag=_interopRequireDefault(__webpack_require__(12)),defaultOptions={allowDuplicates:!1,// Are duplicate tags allowed ?
caseSensitive:!0,// Is duplicate tags identification case sensitive ?
clearSelectionOnTyping:!1,// Should selected tag be cleared when typing a new input ?
closeDropdownOnItemSelect:!0,// Should dropdown be closed once an item has been clicked ?
delimiter:",",// Multiple tags delimiter
freeInput:!0,// Should user be able to input new tag manually ?
highlightDuplicate:!0,// Should we temporarly highlight identified duplicate tags ?
highlightMatchesString:!0,// Should we highlight identified matches strings when searching ?
itemValue:void 0,// What is the object property to use as value when we work with Object tags ?
itemText:void 0,// What is the object property to use as text when we work with Object tags ?
maxTags:void 0,// Maximum number of tags allowed
maxChars:void 0,// Maximum of characters allowed for a single tag
minChars:1,// Minimum of characters before processing a new tag
noResultsLabel:"No results found",// Customize the dropdown placecholer when no results found
placeholder:"",// Customize the input placholder
removable:!0,// Are tags removable ?
searchMinChars:1,// How many characters should we enter before starting dynamic search ?
searchOn:"text",// On what dropdown item data do we search the entered value : 'value' or 'text' ?
selectable:!0,// Are tags selectable ?
source:void 0,// Array/Function/Promise to get external data
tagClass:"is-rounded",// Customize tags style by passing classes - They will be added to the tag element
trim:!0// Should we trim value before processing them ?
},_default=defaultOptions;exports["default"]=_default;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=void 0;var _dom=__webpack_require__(1),_default=function _default(a){return"<div class=\"tags-input\">\n        <input class=\"input\" type=\"text\" placeholder=\"".concat((0,_dom.escape)(a.placeholder),"\">\n        <div id=\"").concat((0,_dom.escape)(a.uuid),"-list\" class=\"dropdown-menu\" role=\"menu\">\n            <div class=\"dropdown-content\">\n                <span class=\"dropdown-item empty-title\">").concat((0,_dom.escape)(a.emptyTitle),"</span>\n            </div>\n        </div>\n    </div>")};exports["default"]=_default;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=void 0;var _dom=__webpack_require__(1),_default=function _default(a){return"<a href=\"javascript:void(0);\" class=\"dropdown-item\" data-value=\"".concat((0,_dom.escape)(a.value),"\" data-text=\"").concat((0,_dom.escape)(a.text),"\">").concat((0,_dom.escape)(a.text),"</a>")};exports["default"]=_default;

/***/ })
/******/ ])["default"];
});