const jsdom = require('jsdom').jsdom;

const exposedProperties = ['window', 'navigator', 'document'];

global.document = jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
global.window.sessionStorage = { // Tricks to allow react router
  data: {},
  setItem: function(k,v) {
    this.data[k] = v;
  },
  removeItem: function(k) {
    delete this.data[k];
  },
  getItem: function(k){
    return this.data[k];
  }
}
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  // userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X) AppleWebKit/538.1 (KHTML, like Gecko) PhantomJS/2.0.0 Safari/538.1'
  userAgent: 'node.js'
};

var documentRef = document;