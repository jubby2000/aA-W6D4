const DOMNodeCollection = require("./dom_node_collection.js");

const $l = function(selector) {
  if (typeof selector === 'string') {
    let nodeList = document.querySelectorAll(selector);
    const arr = Array.from(nodeList);
    return new DOMNodeCollection(arr);
  } else if (selector instanceof HTMLElement) {
    return new DOMNodeCollection([selector]);
  }

};

window.$l = $l;
