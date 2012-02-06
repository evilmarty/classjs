/*!
Copyright (c) 2012 by Marty Zalega

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */
(function(window) {
  // Helper function to extend one object with the properties from other objects
  var extend = function(dest) {
    var i, k;
    for (i = 1; i < arguments.length; ++i) {
      var obj = arguments[i];
      for (k in obj) {
        if (obj.hasOwnProperty(k)) {
          dest[k] = obj[k];
        }
      }
    }
    return dest;
  };
  
  // Full credit to https://github.com/documentcloud/backbone/
  var ctor = function() {};
  var inherits = function(parent, protoProps, staticProps) {
    var child;
    if (protoProps && protoProps.hasOwnProperty('constructor')) {
      child = protoProps.constructor;
    } else {
      child = function() { parent.apply(this, arguments); };
    }
    
    extend(child, parent);
    
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    
    if (protoProps) { extend(child.prototype, protoProps); }
    if (staticProps) { extend(child, staticProps); }
    
    child.prototype.constructor = child;
    child.prototype._super = parent.prototype;
    child.superClass = parent;

    return child;
  };
  
  var Class = function() {
    if (this.initialize) { this.initialize.apply(this, arguments); }
    return this;
  };
  extend(Class, {
    superClass: null, // set superclass to Class to be blank
    extend: function(protoProps, staticProps) {
      var child = inherits(this, protoProps, staticProps);
      child.extend = this.extend;
      return child;
    } 
  })
  
  window.Class = Class;
  
  // Expose Class as an AMD module
  if (typeof define === 'function' && define.amd) {
    define([], function() { return Class; });
  }
})(window);
