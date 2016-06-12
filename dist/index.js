module.exports =
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

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Promise = __webpack_require__(1);

	var Nightmare = __webpack_require__(2);

	var signinFormSelector = 'form[action*="/users/sign_in"]';
	var signinFormEmailInputSelector = signinFormSelector + ' [name="user[email]"]';
	var signinFormPasswordInputSelector = signinFormSelector + ' [name="user[password]"]';
	var signinFormSubmitButtonSelector = signinFormSelector + ' [type="submit"]';

	var SemaphoreCi = function () {
	  function SemaphoreCi() {
	    var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    _classCallCheck(this, SemaphoreCi);

	    this.config = {};
	    this.config.email = config.email;
	    this.config.password = config.password;
	  }

	  _createClass(SemaphoreCi, [{
	    key: 'doesProjectExist',
	    value: function doesProjectExist(projectName) {
	      var _this = this;

	      console.log('Verifying that project \'' + projectName + '\' exists...');
	      return new Promise(function (resolve, reject) {
	        if (!_this.config.email && !_this.config.password) {
	          console.log("Must provide email and password");
	          return;
	        }
	        var nightmare = Nightmare({ show: true });
	        nightmare.goto('https://semaphoreci.com/users/sign_in').cookies.clear("remember_user_token").cookies.clear("_semaphoreappdotcom_session").goto('https://google.com').goto('https://semaphoreci.com/users/sign_in').insert(signinFormEmailInputSelector, _this.config.email).insert(signinFormPasswordInputSelector, _this.config.password).click(signinFormSubmitButtonSelector).wait('body#projects-index').click("#new-project-button").wait('a#refreshProjects').click("a#refreshProjects").wait(5000).type('input#search_projects', projectName).wait(1000).evaluate(function () {
	          return document.querySelectorAll('.repositoryList li:not([style="display: none;"]')[0].querySelectorAll(".repositoryName")[0].childNodes[0].nodeValue.trim();
	        }).end().then(function (firstProjectName) {
	          resolve(firstProjectName === projectName);
	        }).catch(function (error) {
	          reject(new Error('Nighmare failed:' + error));
	        });
	      });
	    }
	  }, {
	    key: 'createProject',
	    value: function createProject(projectName) {
	      var _this2 = this;

	      console.log("Staring to create the project...");
	      return new Promise(function (resolve, reject) {
	        if (!_this2.config.email && !_this2.config.password) {
	          console.log("Must provide email and password");
	          return;
	        }
	        _this2.doesProjectExist(projectName).then(function (exists) {
	          if (!exists) {
	            console.log('Project does not exist');
	          }
	          if (exists) {
	            console.log('Verified that project \'' + projectName + '\' does exist.');
	            var nightmare = Nightmare({ show: true });
	            nightmare.goto('https://semaphoreci.com/users/sign_in').cookies.clear("remember_user_token").cookies.clear("_semaphoreappdotcom_session").goto('https://google.com').goto('https://semaphoreci.com/users/sign_in').insert(signinFormEmailInputSelector, _this2.config.email).insert(signinFormPasswordInputSelector, _this2.config.password).click(signinFormSubmitButtonSelector).wait('body#projects-index').click("#new-project-button").wait('a#refreshProjects').click("a#refreshProjects").wait(1000).click(".repositoryList li:first-child a").inject('input#search_projects', projectName).wait('a[data-branch-name="master"]').click('a[data-branch-name="master"]')
	            // TODO: Why isn't this working
	            // .wait('a[data-owner-username="joegesualdo"]')
	            .wait(3000).click('a[data-owner-username="joegesualdo"]').wait('body.analysisResults').wait('select[name="language"]').select('select[name="language"]', "object:57").wait('select[name="language_version"]').select('select[name="language_version"]', "string:6.1").click('a[href$="/settings/collaborators/set_up"]').wait(5000).end().then(function (v) {
	              resolve();
	            }).catch(function (error) {
	              reject('Nighmare failed:' + error);
	            });
	          }
	        });
	      });
	    }
	  }]);

	  return SemaphoreCi;
	}();

	exports.default = SemaphoreCi;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("bluebird");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("nightmare");

/***/ }
/******/ ]);