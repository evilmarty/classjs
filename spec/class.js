beforeEach(function() {
  this.addMatchers({
    toBeAnInstanceOf: function(klass) {
      return this.actual instanceof klass;
    }
  });
});

describe("Class", function() {
  it("should not have a superclass", function() {
    expect(Class.superClass).toBeNull();
  });
  it("should be a blank object when instantiated", function() {
    expect(new Class()).toEqual({});
  })
  describe("creating a new class", function() {
    var NewClass;
    beforeEach(function() {
      NewClass = Class.extend({
        definedTest: true,
        protoTest: '1'
      }, {
        definedTest: true,
        staticTest: '1'
      });
    });
    it("should set the super class to Class", function() {
      expect(NewClass.superClass).toBe(Class);
    });
    it("should have defined class method", function() {
      expect(NewClass.definedTest).toBeDefined();
    });
    describe("instantiating", function() {
      var newObject;
      beforeEach(function() {
        newObject = new NewClass();
      });
      it("should be an instance of the new class", function() {
        expect(newObject).toBeAnInstanceOf(NewClass);
      });
      it("should be an instance of the base class", function() {
        expect(newObject).toBeAnInstanceOf(Class);
      });
      it("should have defined instance method", function() {
        expect(newObject.definedTest).toBeDefined();
      });
    });
    describe("extending", function() {
      var ExtendedClass;
      beforeEach(function() {
        ExtendedClass = NewClass.extend({
          protoTest: '2',
          extendedDefinedTest: true
        }, {
          staticTest: '2',
          extendedDefinedTest: true
        });
      });
      it("should set the super class to NewClass", function() {
        expect(ExtendedClass.superClass).toBe(NewClass);
      });
      it("should have defined class method", function() {
        expect(NewClass.extendedDefinedTest).not.toBeDefined();
        expect(ExtendedClass.extendedDefinedTest).toBeDefined();
      });
      it("should override the class method if the super class has defined a method of the same name", function() {
        expect(NewClass.staticTest).toEqual('1');
        expect(ExtendedClass.staticTest).toEqual('2');
      });
      describe("instantiating", function() {
        var extendedObject;
        beforeEach(function() {
          extendedObject = new ExtendedClass();
        });
        it("should be an instance of the extended class", function() {
          expect(extendedObject).toBeAnInstanceOf(ExtendedClass);
        });
        it("should be an instance of the new class", function() {
          expect(extendedObject).toBeAnInstanceOf(NewClass);
        });
        it("should be an instance of the base class", function() {
          expect(extendedObject).toBeAnInstanceOf(Class);
        });
        it("should have defined instance method", function() {
          expect(extendedObject.definedTest).toBeDefined();
          expect(extendedObject.extendedDefinedTest).toBeDefined();
        });
      });
    });
  });
});