module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../ssr-module-cache.js');
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
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./pages/api/new-meetup.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./pages/api/new-meetup.js":
/*!*********************************!*\
  !*** ./pages/api/new-meetup.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongodb */ \"mongodb\");\n/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongodb__WEBPACK_IMPORTED_MODULE_0__);\n// api/new-meetup\n\n\nasync function handler(req, res) {\n  if (req.method === \"POST\") {\n    // only execute the function if it is a POST request\n    const data = req.body; // the body of the incoming request = the data of the incoming request (those image, title and stuff)\n    // what you fill in when filling in the newMeetupForm\n    //const { image, title, address, description } = data; //object destructuring, also what the data(req.body) consist\n\n    console.log(\"Connecting MongoDB ...\");\n    const client = await mongodb__WEBPACK_IMPORTED_MODULE_0__[\"MongoClient\"].connect(\"mongodb+srv://writeUser:qcBtbpVwU3MZ1MaT@cluster0.jnmkq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority\");\n    console.log(\"Succesffuly connected to MongoDB\"); //establish a connection with the database\n    // dont forget to replace the user & password, and database name (name it 'meetups' here)\n\n    const db = client.db(); // to access the databse we're connecting here\n\n    const meetupsCollection = db.collection(\"meetups\"); // and named the collection as 'meetups'\n    // overall the collection holds multiple meetups, each meetups will be a single documents in the collection(the database table)\n\n    const result = await meetupsCollection.insertOne(data); // insertOne(): insert one new document into the collection\n    // the document is just an object, hence should include the '{}'\n    // can directly insert 'data'(without {}) for that, since 'data' consists of the 'data(line12)' we need\n\n    console.log(result);\n    client.close(); // close the databse collection after we're done\n\n    res.status(201).json({\n      message: \"Meetup inserted!\"\n    }); // need to send back a response too\n    // .status() : to set a HTTP status code that will be returned, as a JSON response consist of the 'message: Meetup...!'\n    // 201 status code: indicates something was inserted successfully\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (handler);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wYWdlcy9hcGkvbmV3LW1lZXR1cC5qcz84Yjg2Il0sIm5hbWVzIjpbImhhbmRsZXIiLCJyZXEiLCJyZXMiLCJtZXRob2QiLCJkYXRhIiwiYm9keSIsImNvbnNvbGUiLCJsb2ciLCJjbGllbnQiLCJNb25nb0NsaWVudCIsImNvbm5lY3QiLCJkYiIsIm1lZXR1cHNDb2xsZWN0aW9uIiwiY29sbGVjdGlvbiIsInJlc3VsdCIsImluc2VydE9uZSIsImNsb3NlIiwic3RhdHVzIiwianNvbiIsIm1lc3NhZ2UiXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUE7O0FBRUEsZUFBZUEsT0FBZixDQUF1QkMsR0FBdkIsRUFBNEJDLEdBQTVCLEVBQWlDO0FBQy9CLE1BQUlELEdBQUcsQ0FBQ0UsTUFBSixLQUFlLE1BQW5CLEVBQTJCO0FBQ3pCO0FBQ0EsVUFBTUMsSUFBSSxHQUFHSCxHQUFHLENBQUNJLElBQWpCLENBRnlCLENBR3pCO0FBQ0E7QUFFQTs7QUFDQUMsV0FBTyxDQUFDQyxHQUFSLENBQVksd0JBQVo7QUFDQSxVQUFNQyxNQUFNLEdBQUcsTUFBTUMsbURBQVcsQ0FBQ0MsT0FBWixDQUNuQixpSEFEbUIsQ0FBckI7QUFHQUosV0FBTyxDQUFDQyxHQUFSLENBQVksa0NBQVosRUFYeUIsQ0FZekI7QUFDQTs7QUFFQSxVQUFNSSxFQUFFLEdBQUdILE1BQU0sQ0FBQ0csRUFBUCxFQUFYLENBZnlCLENBZUQ7O0FBRXhCLFVBQU1DLGlCQUFpQixHQUFHRCxFQUFFLENBQUNFLFVBQUgsQ0FBYyxTQUFkLENBQTFCLENBakJ5QixDQWtCekI7QUFDQTs7QUFFQSxVQUFNQyxNQUFNLEdBQUcsTUFBTUYsaUJBQWlCLENBQUNHLFNBQWxCLENBQTRCWCxJQUE1QixDQUFyQixDQXJCeUIsQ0FzQnpCO0FBQ0E7QUFDQTs7QUFFQUUsV0FBTyxDQUFDQyxHQUFSLENBQVlPLE1BQVo7QUFFQU4sVUFBTSxDQUFDUSxLQUFQLEdBNUJ5QixDQTRCVDs7QUFFaEJkLE9BQUcsQ0FBQ2UsTUFBSixDQUFXLEdBQVgsRUFBZ0JDLElBQWhCLENBQXFCO0FBQUVDLGFBQU8sRUFBRTtBQUFYLEtBQXJCLEVBOUJ5QixDQStCekI7QUFDQTtBQUNBO0FBQ0Q7QUFDRjs7QUFFY25CLHNFQUFmIiwiZmlsZSI6Ii4vcGFnZXMvYXBpL25ldy1tZWV0dXAuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBhcGkvbmV3LW1lZXR1cFxuXG5pbXBvcnQgeyBNb25nb0NsaWVudCB9IGZyb20gXCJtb25nb2RiXCI7XG5cbmFzeW5jIGZ1bmN0aW9uIGhhbmRsZXIocmVxLCByZXMpIHtcbiAgaWYgKHJlcS5tZXRob2QgPT09IFwiUE9TVFwiKSB7XG4gICAgLy8gb25seSBleGVjdXRlIHRoZSBmdW5jdGlvbiBpZiBpdCBpcyBhIFBPU1QgcmVxdWVzdFxuICAgIGNvbnN0IGRhdGEgPSByZXEuYm9keTtcbiAgICAvLyB0aGUgYm9keSBvZiB0aGUgaW5jb21pbmcgcmVxdWVzdCA9IHRoZSBkYXRhIG9mIHRoZSBpbmNvbWluZyByZXF1ZXN0ICh0aG9zZSBpbWFnZSwgdGl0bGUgYW5kIHN0dWZmKVxuICAgIC8vIHdoYXQgeW91IGZpbGwgaW4gd2hlbiBmaWxsaW5nIGluIHRoZSBuZXdNZWV0dXBGb3JtXG5cbiAgICAvL2NvbnN0IHsgaW1hZ2UsIHRpdGxlLCBhZGRyZXNzLCBkZXNjcmlwdGlvbiB9ID0gZGF0YTsgLy9vYmplY3QgZGVzdHJ1Y3R1cmluZywgYWxzbyB3aGF0IHRoZSBkYXRhKHJlcS5ib2R5KSBjb25zaXN0XG4gICAgY29uc29sZS5sb2coXCJDb25uZWN0aW5nIE1vbmdvREIgLi4uXCIpO1xuICAgIGNvbnN0IGNsaWVudCA9IGF3YWl0IE1vbmdvQ2xpZW50LmNvbm5lY3QoXG4gICAgICBcIm1vbmdvZGIrc3J2Oi8vd3JpdGVVc2VyOnFjQnRicFZ3VTNNWjFNYVRAY2x1c3RlcjAuam5ta3EubW9uZ29kYi5uZXQvbXlGaXJzdERhdGFiYXNlP3JldHJ5V3JpdGVzPXRydWUmdz1tYWpvcml0eVwiXG4gICAgKTtcbiAgICBjb25zb2xlLmxvZyhcIlN1Y2Nlc2ZmdWx5IGNvbm5lY3RlZCB0byBNb25nb0RCXCIpO1xuICAgIC8vZXN0YWJsaXNoIGEgY29ubmVjdGlvbiB3aXRoIHRoZSBkYXRhYmFzZVxuICAgIC8vIGRvbnQgZm9yZ2V0IHRvIHJlcGxhY2UgdGhlIHVzZXIgJiBwYXNzd29yZCwgYW5kIGRhdGFiYXNlIG5hbWUgKG5hbWUgaXQgJ21lZXR1cHMnIGhlcmUpXG5cbiAgICBjb25zdCBkYiA9IGNsaWVudC5kYigpOyAvLyB0byBhY2Nlc3MgdGhlIGRhdGFic2Ugd2UncmUgY29ubmVjdGluZyBoZXJlXG5cbiAgICBjb25zdCBtZWV0dXBzQ29sbGVjdGlvbiA9IGRiLmNvbGxlY3Rpb24oXCJtZWV0dXBzXCIpO1xuICAgIC8vIGFuZCBuYW1lZCB0aGUgY29sbGVjdGlvbiBhcyAnbWVldHVwcydcbiAgICAvLyBvdmVyYWxsIHRoZSBjb2xsZWN0aW9uIGhvbGRzIG11bHRpcGxlIG1lZXR1cHMsIGVhY2ggbWVldHVwcyB3aWxsIGJlIGEgc2luZ2xlIGRvY3VtZW50cyBpbiB0aGUgY29sbGVjdGlvbih0aGUgZGF0YWJhc2UgdGFibGUpXG5cbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBtZWV0dXBzQ29sbGVjdGlvbi5pbnNlcnRPbmUoZGF0YSk7XG4gICAgLy8gaW5zZXJ0T25lKCk6IGluc2VydCBvbmUgbmV3IGRvY3VtZW50IGludG8gdGhlIGNvbGxlY3Rpb25cbiAgICAvLyB0aGUgZG9jdW1lbnQgaXMganVzdCBhbiBvYmplY3QsIGhlbmNlIHNob3VsZCBpbmNsdWRlIHRoZSAne30nXG4gICAgLy8gY2FuIGRpcmVjdGx5IGluc2VydCAnZGF0YScod2l0aG91dCB7fSkgZm9yIHRoYXQsIHNpbmNlICdkYXRhJyBjb25zaXN0cyBvZiB0aGUgJ2RhdGEobGluZTEyKScgd2UgbmVlZFxuXG4gICAgY29uc29sZS5sb2cocmVzdWx0KTtcblxuICAgIGNsaWVudC5jbG9zZSgpOyAvLyBjbG9zZSB0aGUgZGF0YWJzZSBjb2xsZWN0aW9uIGFmdGVyIHdlJ3JlIGRvbmVcblxuICAgIHJlcy5zdGF0dXMoMjAxKS5qc29uKHsgbWVzc2FnZTogXCJNZWV0dXAgaW5zZXJ0ZWQhXCIgfSk7XG4gICAgLy8gbmVlZCB0byBzZW5kIGJhY2sgYSByZXNwb25zZSB0b29cbiAgICAvLyAuc3RhdHVzKCkgOiB0byBzZXQgYSBIVFRQIHN0YXR1cyBjb2RlIHRoYXQgd2lsbCBiZSByZXR1cm5lZCwgYXMgYSBKU09OIHJlc3BvbnNlIGNvbnNpc3Qgb2YgdGhlICdtZXNzYWdlOiBNZWV0dXAuLi4hJ1xuICAgIC8vIDIwMSBzdGF0dXMgY29kZTogaW5kaWNhdGVzIHNvbWV0aGluZyB3YXMgaW5zZXJ0ZWQgc3VjY2Vzc2Z1bGx5XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgaGFuZGxlcjtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/api/new-meetup.js\n");

/***/ }),

/***/ "mongodb":
/*!**************************!*\
  !*** external "mongodb" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"mongodb\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtb25nb2RiXCI/ZGVmZiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiJtb25nb2RiLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibW9uZ29kYlwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///mongodb\n");

/***/ })

/******/ });