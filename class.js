/*!
** class.js 0.2
** http://evilmarty.github.com/classjs/
**
** Copyright (c) 2012 by Marty Zalega
** 
** Permission is hereby granted, free of charge, to any person obtaining a 
** copy of this software and associated documentation files (the "Software"), 
** to deal in the Software without restriction, including without limitation 
** the rights to use, copy, modify, merge, publish, distribute, sublicense, 
** and/or sell copies of the Software, and to permit persons to whom the 
** Software is furnished to do so, subject to the following conditions:
** 
** The above copyright notice and this permission notice shall be included in
** all copies or substantial portions of the Software.
** 
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
** FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
** DEALINGS IN THE SOFTWARE.
*/
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
  
  var includeClass = function() {
    var args = Array.prototype.slice.call(arguments);
    args.unshift(this.prototype);
    extend.apply(null, args);
    return this;
  };
  
  var extendClass = function() {
    var args = Array.prototype.slice.call(arguments);
    args.unshift(this);
    extend.apply(null, args);
    return this;
  };
  
  var construct = function() {
    return function() {
      // check to see if invoked by constructor
      if (this.constructor === arguments.callee) {
        if (this.initialize) { this.initialize.apply(this, arguments); }
        return this;
      }
      else {
        return inherits(arguments.callee, arguments[0], arguments[1]);
      }
    };
  };
  
  // Full credit to https://github.com/documentcloud/backbone/
  var ctor = function() {};
  var inherits = function(parent, protoProps, staticProps) {
    var child = construct();
    
    extend(child, parent);
    
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    
    includeClass.call(child, protoProps, {
      constructor: child,
      _super: parent.prototype
    });
    extendClass.call(child, staticProps, {
      superClass: parent
    });

    return child;
  };
  
  var Class = construct();
  extend(Class, {
    superClass: null, // set superclass to Class to be blank
    include: includeClass,
    extend: extendClass
  });
  
  window.Class = Class;
  
  // Expose Class as an AMD module
  if (typeof define === 'function' && define.amd) {
    define([], function() { return Class; });
  }
})(window);
