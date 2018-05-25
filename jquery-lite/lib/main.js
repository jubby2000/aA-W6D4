const DOMNodeCollection = require("./dom_node_collection.js");

function $l(selector, callback) {
  const waitingCallbacks = [];
  document.addEventListener('DOMContentLoaded', () => {
    waitingCallbacks.forEach((callback) => {
      callback();
    });
  });


  if (callback) {
    if (document.readyState === 'complete') {
      callback();
    } else {
      waitingCallbacks.push(callback);
    }
  }

  if (typeof selector === 'string') {
    let nodeList = document.querySelectorAll(selector);
    const arr = Array.from(nodeList);
    return new DOMNodeCollection(arr);
  } else if (selector instanceof HTMLElement) {
    return new DOMNodeCollection([selector]);
  }

}



// $l.extend = function(obj1, ...otherObjs){
//   otherObjs.forEach(obj => {
//     obj1 = Object.assign(obj1, obj);
//   });
//
//   return obj1;
// };

$l.ajax = function(options) {
  let defaults = {
    type: "GET",

  };
  const xhr = new XMLHttpRequest();
  const method = options.method;
  const url = options.url;
  xhr.open(method, url);
  xhr.onload = function() {
    console.log(xhr.status);
    console.log(xhr.responseType);
    console.log(xhr.response);
  };
  // success, error, url, method, data, and contentType.
  // xhr.onreadystatechange = function() {
  //   if(this.readyState === 4) {
  //     if(this.status === 200) {
  //       url
      // }
    // }
  // };
};


window.$l = $l;
