class DOMNodeCollection {
  constructor(array) {
    this.$els = array;
  }

  html(string) {
    if (typeof string === 'undefined') {
      return this.$els[0].innerHTML;
    } else {
      this.$els.forEach((el) => {
        el.innerHTML = string;
      });
    }
  }

  empty() {
    this.$els.forEach((el) => {
      el.innerHTML = "";
    });
  }

  append(element) {
    this.$els.forEach(el => {
      if (typeof element === 'string') {
        el.innerHTML += element;
      } else if (element instanceof HTMLElement) {
        el.innerHTML += element.outerHTML;
      } else {
        element.forEach(el2 => {
          el.innerHTML += el2.outerHTML;
        });
      }
    });
  }

  attr(attribute){
    return this.$els[0].getAttribute(attribute);
  }

  addClass(className) {
    this.$els.forEach(el => {
      el.classList.add(className);
    });
    return this;
  }

  removeClass(className) {
    this.$els.forEach(el => {
      el.classList.remove(className);
    });
    return this;
  }

  children() {
    let children = [];
    this.$els.forEach( el => {
      for(let i = 0; i < el.children.length;i++) {
        children.push(el.children[i]);
      }
    });

    return new DOMNodeCollection(children);
  }

  parent() {
    let parents = [];
    this.$els.forEach(el => {
      parents.push(el.parentNode);
    });
    return new DOMNodeCollection(parents);
  }

  find(selector) {
    let arr = [];
    this.$els.forEach(el => {
      let nodeList = el.querySelectorAll(selector);
      arr = arr.concat(Array.from(nodeList));
    });
    return new DOMNodeCollection(arr);
  }

  remove() {
    this.$els.forEach(el => {
      el.innerHTML = "";
      el.remove();
    });
  }


}

module.exports = DOMNodeCollection;
