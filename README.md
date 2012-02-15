![](http://ragefac.es/faces/f6c3f8542a2b995973393be7011b946f.png)

# Class

A simply (self-contained) javascript library to create and extend classes.

## Features

* Define classes
* Class inheritence
* Accessors for super classes
* Easily extend classes and objects

## Syntax

### Class([instance properties], [class properties]) _class_

Extend the current class with the given instance and class properties, returning a new class object.

### extend([class properties]) _class_

Extend the current class with the given class properties, returning the current class.

### include([instance properties]) _class_

Extend the current class with the given instance properties, returning the current class.

### superClass _class_

The super/parent class.

### \_super _object_

Accessor to the parent classs instance. Helpful when overriding methods and needed access to the previous definition.

## Usage
  
  ```
  var Post = Class({
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

* 0.2 - Added support for easily extending a class and its instance
* 0.1.1 - Fixed issue with AMD
* 0.1 - Big bang!


## TODO

+ Wider browser and environment testing