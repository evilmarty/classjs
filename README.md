![](http://ragefac.es/faces/f6c3f8542a2b995973393be7011b946f.png)

# Class

A simply (self-contained) javascript library to create and extend classes.

## Features

* Define classes
* Class inheritence
* Accessors for super classes

## Syntax

### extend([instance properties], [class properties]) _class_

Extend the current class with the given instance and class properties, returning a new class object.

### superClass _class_

The super/parent class.

### \_super _object_

Accessor to the parent classs instance. Helpful when overriding methods and needed access to the previous definition.

## Usage
  
  ```
  var Post = Class.extend({
    initialize: function(msg) {
      this.msg = msg;
    },
    message: function() {
      return this.msg;
    }
  }, {
    fetch: function() {
      return new this('first!');
    }
  });
  ```
## Changelog

* 0.1.1 - Fixed issue with AMD
* 0.1 - Big bang!


## TODO

+ Add support for extensions and inclusions