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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/dom_node_collection.js":
/*!************************************!*\
  !*** ./lib/dom_node_collection.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class DOMNodeCollection {\n  constructor(array) {\n    this.$els = array;\n\n  }\n\n  html(string) {\n    if (typeof string === 'undefined') {\n      return this.$els[0].innerHTML;\n    } else {\n      this.$els.forEach((el) => {\n        el.innerHTML = string;\n      });\n    }\n  }\n\n  empty() {\n    this.$els.forEach((el) => {\n      el.innerHTML = \"\";\n    });\n  }\n\n  append(element) {\n    this.$els.forEach(el => {\n      if (typeof element === 'string') {\n        el.innerHTML += element;\n      } else if (element instanceof HTMLElement) {\n        el.innerHTML += element.outerHTML;\n      } else {\n        element.forEach(el2 => {\n          el.innerHTML += el2.outerHTML;\n        });\n      }\n    });\n  }\n\n  attr(attribute){\n    return this.$els[0].getAttribute(attribute);\n  }\n\n  addClass(className) {\n    this.$els.forEach(el => {\n      el.classList.add(className);\n    });\n    return this;\n  }\n\n  removeClass(className) {\n    this.$els.forEach(el => {\n      el.classList.remove(className);\n    });\n    return this;\n  }\n\n  children() {\n    let children = [];\n    this.$els.forEach( el => {\n      for(let i = 0; i < el.children.length;i++) {\n        children.push(el.children[i]);\n      }\n    });\n\n    return new DOMNodeCollection(children);\n  }\n\n  parent() {\n    let parents = [];\n    this.$els.forEach(el => {\n      parents.push(el.parentNode);\n    });\n    return new DOMNodeCollection(parents);\n  }\n\n  find(selector) {\n    let arr = [];\n    this.$els.forEach(el => {\n      let nodeList = el.querySelectorAll(selector);\n      arr = arr.concat(Array.from(nodeList));\n    });\n    return new DOMNodeCollection(arr);\n  }\n\n  remove() {\n    this.$els.forEach(el => {\n      el.innerHTML = \"\";\n      el.remove();\n    });\n  }\n\n  on(type, listener) {\n    this.$els.forEach(el => {\n      el.addEventListener(type, listener);\n      let funkyName = `event-${type}`;\n      if (el[funkyName] === undefined) {\n        el[funkyName] = [];\n      }\n      el[funkyName].push(listener);\n    });\n  }\n\n  off(type) {\n    this.$els.forEach(el => {\n\n      el[`event-${type}`].forEach((callback) => {\n        el.removeEventListener(type, callback);\n      });\n    });\n  }\n}\n\nmodule.exports = DOMNodeCollection;\n\n\n//# sourceURL=webpack:///./lib/dom_node_collection.js?");

/***/ }),

/***/ "./lib/main.js":
/*!*********************!*\
  !*** ./lib/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const DOMNodeCollection = __webpack_require__(/*! ./dom_node_collection.js */ \"./lib/dom_node_collection.js\");\n\nfunction $l(selector, callback) {\n  const waitingCallbacks = [];\n  document.addEventListener('DOMContentLoaded', () => {\n    waitingCallbacks.forEach((callback) => {\n      callback();\n    });\n  });\n\n\n  if (callback) {\n    if (document.readyState === 'complete') {\n      callback();\n    } else {\n      waitingCallbacks.push(callback);\n    }\n  }\n\n  if (typeof selector === 'string') {\n    let nodeList = document.querySelectorAll(selector);\n    const arr = Array.from(nodeList);\n    return new DOMNodeCollection(arr);\n  } else if (selector instanceof HTMLElement) {\n    return new DOMNodeCollection([selector]);\n  }\n\n}\n\n\n\n// $l.extend = function(obj1, ...otherObjs){\n//   otherObjs.forEach(obj => {\n//     obj1 = Object.assign(obj1, obj);\n//   });\n//\n//   return obj1;\n// };\n\n$l.ajax = function(options) {\n  let defaults = {\n    type: \"GET\",\n\n  };\n  const xhr = new XMLHttpRequest();\n  const method = options.method;\n  const url = options.url;\n  xhr.open(method, url);\n  xhr.onload = function() {\n    console.log(xhr.status);\n    console.log(xhr.responseType);\n    console.log(xhr.response);\n  };\n  // success, error, url, method, data, and contentType.\n  // xhr.onreadystatechange = function() {\n  //   if(this.readyState === 4) {\n  //     if(this.status === 200) {\n  //       url\n      // }\n    // }\n  // };\n};\n\n\nwindow.$l = $l;\n\n\n//# sourceURL=webpack:///./lib/main.js?");

/***/ })

/******/ });