/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Plugin = __webpack_require__(1);

	var plugin = new _Plugin.Plugin();
	plugin.init();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Plugin = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Select = __webpack_require__(2);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Plugin = exports.Plugin = function () {
	  function Plugin() {
	    _classCallCheck(this, Plugin);
	  }

	  _createClass(Plugin, [{
	    key: 'init',
	    value: function init() {
	      jQuery.fn.asSelect = function asSelect(options) {
	        var defaults = {
	          speed: 100
	        };

	        var select = new _Select.Select(jQuery(this), jQuery.extend(defaults, options));
	        select.init();
	      };
	    }
	  }]);

	  return Plugin;
	}();

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Select = exports.Select = function () {
	  function Select($element, options) {
	    _classCallCheck(this, Select);

	    this.$document = jQuery(document);
	    this.$element = $element;
	    this.$field = $element.find('input[type="hidden"]');
	    this.$label = $element.find('label');
	    this.speed = options.speed;
	  }

	  _createClass(Select, [{
	    key: 'init',
	    value: function init() {
	      this._registerEvents();
	    }
	  }, {
	    key: '_registerEvents',
	    value: function _registerEvents() {
	      var _this = this;

	      this.$document.mousedown(function (event) {
	        if (!_this.$element.is(event.target) && _this.$element.has(event.target).length === 0) {
	          _this._close();
	        } else {
	          _this._toggle();

	          if (_this.$element.find('li').is(event.target)) {
	            _this._select(jQuery(event.target));
	          }
	        }
	      });
	    }
	  }, {
	    key: '_toggle',
	    value: function _toggle() {
	      this.$element.toggleClass('open');
	      this.$element.find('ul').slideToggle(this.speed);
	    }
	  }, {
	    key: '_close',
	    value: function _close() {
	      this.$element.removeClass('open');
	      this.$element.find('ul').slideUp(this.speed);
	    }
	  }, {
	    key: '_select',
	    value: function _select($item) {
	      var $allItems = this.$element.find('li');
	      var label = $item.text();
	      var value = $item.data('value');

	      this.$label.text(label);

	      $allItems.removeClass('active');
	      $item.addClass('active');

	      this.$field.val(value);
	    }
	  }]);

	  return Select;
	}();

/***/ }
/******/ ]);