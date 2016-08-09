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
	          deselectable: true,
	          onSelect: null,
	          speed: 200
	        };

	        this.each(function initialize() {
	          var select = new _Select.Select(jQuery(this), jQuery.extend(defaults, options));
	          select.init();
	        });
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
	    this.$htmlBody = jQuery('html, body');
	    this.$items = null;
	    this.$label = $element.find('label');
	    this.$list = $element.find('ul');
	    this.deselectable = options.deselectable;
	    this.onSelect = options.onSelect;
	    this.speed = options.speed;
	  }

	  _createClass(Select, [{
	    key: 'init',
	    value: function init() {
	      this._updateItems();

	      if (this.deselectable) {
	        this._createDeselectable();
	      }

	      this._registerEvents();
	      this._populate();
	    }
	  }, {
	    key: '_updateItems',
	    value: function _updateItems() {
	      this.$items = this.$list.find('li');
	    }
	  }, {
	    key: '_createDeselectable',
	    value: function _createDeselectable() {
	      var label = this.$label.text();
	      this.$list.prepend('<li data-value="">' + label + '</li>');
	      this._updateItems();

	      if (!this.$field.val()) {
	        this._select(this.$items.first());
	      }
	    }
	  }, {
	    key: '_registerEvents',
	    value: function _registerEvents() {
	      var _this = this;

	      this.$document.on(this._getOutsideEvent(), function (event) {
	        if (!_this.$element.is(event.target) && _this.$element.has(event.target).length === 0) {
	          _this._close();
	        }
	      });

	      this.$element.on(this._getInsideEvent(), function (event) {
	        _this._maybeScrollToElement();
	        _this._toggle();

	        if (_this.$items.is(event.target)) {
	          _this._select(jQuery(event.target));
	        }
	      });
	    }
	  }, {
	    key: '_getOutsideEvent',
	    value: function _getOutsideEvent() {
	      return this._isTouch() ? 'touchstart' : 'mousedown';
	    }
	  }, {
	    key: '_getInsideEvent',
	    value: function _getInsideEvent() {
	      return this._isTouch() ? 'click' : 'mousedown';
	    }
	  }, {
	    key: '_populate',
	    value: function _populate() {
	      var value = this.$field.val();

	      if (value) {
	        var $selected = this.$items.filter('[data-value="' + value + '"]').first();

	        if ($selected.length) {
	          this._select($selected);
	        }
	      }
	    }
	  }, {
	    key: '_toggle',
	    value: function _toggle() {
	      this.$element.toggleClass('open');
	      this.$list.slideToggle(this.speed);
	    }
	  }, {
	    key: '_maybeScrollToElement',
	    value: function _maybeScrollToElement() {
	      if (this._isTouch() && !this.$element.hasClass('open')) {
	        this.$htmlBody.animate({
	          scrollTop: this.$element.offset().top
	        });
	      }
	    }
	  }, {
	    key: '_close',
	    value: function _close() {
	      this.$element.removeClass('open');
	      this.$list.slideUp(this.speed);
	    }
	  }, {
	    key: '_select',
	    value: function _select($item) {
	      var label = $item.text();
	      var value = $item.data('value');

	      this.$label.text(label);

	      this.$items.removeClass('active');
	      $item.addClass('active');

	      this.$field.val(value);

	      if (typeof this.onSelect === 'function') {
	        this.onSelect($item);
	      }
	    }
	  }, {
	    key: '_isTouch',
	    value: function _isTouch() {
	      return 'ontouchstart' in window || window.DocumentTouch && document instanceof DocumentTouch;
	    }
	  }]);

	  return Select;
	}();

/***/ }
/******/ ]);