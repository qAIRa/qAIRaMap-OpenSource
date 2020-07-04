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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/service_worker.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/service_worker.js":
/*!*******************************!*\
  !*** ./src/service_worker.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const cacheName = 'v1';\n\nconst cacheAssets = [\n    'index.html',\n    'style.css',\n    'index.bundle.js'\n];\n\n//Call Install Event\nself.addEventListener('install', e => {\n    console.log('Service Worker: Installed');\n    e.waitUntil(\n        caches\n        .open(cacheName)\n        .then(cache=>{\n            console.log('Service Worker: Caching Files');\n            cache.addAll(cacheAssets)\n        })\n        .then(()=>self.skipWaiting())\n    )\n    \n});\n\n//Call Activate Event\nself.addEventListener('activate', e => {\n    console.log('Service Worker: Activated');\n\n    e.waitUntil(\n        caches.keys().then(cacheNames=> {\n            return Promise.all(\n                cacheNames.map(cache =>{\n                    if (cache !== cacheName) {\n                        console.log('Service Worker: Clearing Old Cache');\n                        return caches.delete(cache);\n                    }\n                })\n            )\n        }\n\n        )\n    )\n    \n})\n\n// Call Fetch Event\nself.addEventListener('fetch', e=>{\n    console.log('Service Worker: Fetching');\n    e.respondWith(\n        fetch(e.request)\n        // .then(res => {\n        //     //Clone response\n        //     const resClone = res.clone();\n        //     //Open cache\n        //     caches\n        //     .open(cacheName)\n        //     .then(cache =>{\n        //         // Add response to cache\n        //         cache.put(e.request, resClone);\n        //     });\n        //     return res;\n        // })\n        .catch(() => caches.match(e.request))\n        // .then(res => res)\n    )\n    \n})//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvc2VydmljZV93b3JrZXIuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZV93b3JrZXIuanM/OGRhMCJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBjYWNoZU5hbWUgPSAndjEnO1xuXG5jb25zdCBjYWNoZUFzc2V0cyA9IFtcbiAgICAnaW5kZXguaHRtbCcsXG4gICAgJ3N0eWxlLmNzcycsXG4gICAgJ2luZGV4LmJ1bmRsZS5qcydcbl07XG5cbi8vQ2FsbCBJbnN0YWxsIEV2ZW50XG5zZWxmLmFkZEV2ZW50TGlzdGVuZXIoJ2luc3RhbGwnLCBlID0+IHtcbiAgICBjb25zb2xlLmxvZygnU2VydmljZSBXb3JrZXI6IEluc3RhbGxlZCcpO1xuICAgIGUud2FpdFVudGlsKFxuICAgICAgICBjYWNoZXNcbiAgICAgICAgLm9wZW4oY2FjaGVOYW1lKVxuICAgICAgICAudGhlbihjYWNoZT0+e1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1NlcnZpY2UgV29ya2VyOiBDYWNoaW5nIEZpbGVzJyk7XG4gICAgICAgICAgICBjYWNoZS5hZGRBbGwoY2FjaGVBc3NldHMpXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKCgpPT5zZWxmLnNraXBXYWl0aW5nKCkpXG4gICAgKVxuICAgIFxufSk7XG5cbi8vQ2FsbCBBY3RpdmF0ZSBFdmVudFxuc2VsZi5hZGRFdmVudExpc3RlbmVyKCdhY3RpdmF0ZScsIGUgPT4ge1xuICAgIGNvbnNvbGUubG9nKCdTZXJ2aWNlIFdvcmtlcjogQWN0aXZhdGVkJyk7XG5cbiAgICBlLndhaXRVbnRpbChcbiAgICAgICAgY2FjaGVzLmtleXMoKS50aGVuKGNhY2hlTmFtZXM9PiB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoXG4gICAgICAgICAgICAgICAgY2FjaGVOYW1lcy5tYXAoY2FjaGUgPT57XG4gICAgICAgICAgICAgICAgICAgIGlmIChjYWNoZSAhPT0gY2FjaGVOYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnU2VydmljZSBXb3JrZXI6IENsZWFyaW5nIE9sZCBDYWNoZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNhY2hlcy5kZWxldGUoY2FjaGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIClcbiAgICAgICAgfVxuXG4gICAgICAgIClcbiAgICApXG4gICAgXG59KVxuXG4vLyBDYWxsIEZldGNoIEV2ZW50XG5zZWxmLmFkZEV2ZW50TGlzdGVuZXIoJ2ZldGNoJywgZT0+e1xuICAgIGNvbnNvbGUubG9nKCdTZXJ2aWNlIFdvcmtlcjogRmV0Y2hpbmcnKTtcbiAgICBlLnJlc3BvbmRXaXRoKFxuICAgICAgICBmZXRjaChlLnJlcXVlc3QpXG4gICAgICAgIC8vIC50aGVuKHJlcyA9PiB7XG4gICAgICAgIC8vICAgICAvL0Nsb25lIHJlc3BvbnNlXG4gICAgICAgIC8vICAgICBjb25zdCByZXNDbG9uZSA9IHJlcy5jbG9uZSgpO1xuICAgICAgICAvLyAgICAgLy9PcGVuIGNhY2hlXG4gICAgICAgIC8vICAgICBjYWNoZXNcbiAgICAgICAgLy8gICAgIC5vcGVuKGNhY2hlTmFtZSlcbiAgICAgICAgLy8gICAgIC50aGVuKGNhY2hlID0+e1xuICAgICAgICAvLyAgICAgICAgIC8vIEFkZCByZXNwb25zZSB0byBjYWNoZVxuICAgICAgICAvLyAgICAgICAgIGNhY2hlLnB1dChlLnJlcXVlc3QsIHJlc0Nsb25lKTtcbiAgICAgICAgLy8gICAgIH0pO1xuICAgICAgICAvLyAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgLy8gfSlcbiAgICAgICAgLmNhdGNoKCgpID0+IGNhY2hlcy5tYXRjaChlLnJlcXVlc3QpKVxuICAgICAgICAvLyAudGhlbihyZXMgPT4gcmVzKVxuICAgIClcbiAgICBcbn0pIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/service_worker.js\n");

/***/ })

/******/ });