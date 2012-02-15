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
  });
  it("should extend the class", function() {
    Class.extend({
      baseExtendTest: true
    });
    expect(Class.baseExtendTest).toEqual(true);
  });
  describe("creating a new class", function() {
    var A;
    beforeEach(function() {
      A = Class({
        definedTest: true,
        protoTest: '1'
      }, {
        definedTest: true,
        staticTest: '1'
      });
    });
    it("should set the super class to Class", function() {
      expect(A.superClass).toBe(Class);
    });
    it("should have defined class method", function() {
      expect(A.definedTest).toBeDefined();
    });
    it("should extend the class", function() {
      A.extend({
        extendTestA: true
      });
      expect(A.extendTestA).toEqual(true);
    });
    it("should include the extension on the instance", function() {
      A.include({
        includeTestA: true
      });
      expect(new A().includeTestA).toEqual(true);
    });
    describe("instantiating", function() {
      var a;
      beforeEach(function() {
        a = new A();
      });
      it("should be an instance of the new class", function() {
        expect(a).toBeAnInstanceOf(A);
      });
      it("should be an instance of the base class", function() {
        expect(a).toBeAnInstanceOf(Class);
      });
      it("should have defined instance method", function() {
        expect(a.definedTest).toBeDefined();
      });
    });
    describe("extending", function() {
      var B;
      beforeEach(function() {
        B = A({
          protoTest: '2',
          extendedDefinedTest: true
        }, {
          staticTest: '2',
          extendedDefinedTest: true
        });
      });
      it("should set the super class to NewClass", function() {
        expect(B.superClass).toBe(A);
      });
      it("should have defined class method", function() {
        expect(A.extendedDefinedTest).not.toBeDefined();
        expect(B.extendedDefinedTest).toBeDefined();
      });
      it("should override the class method if the super class has defined a method of the same name", function() {
        expect(A.staticTest).toEqual('1');
        expect(B.staticTest).toEqual('2');
      });
      it("should extend the class", function() {
        B.extend({
          extendTestB: true
        });
        expect(B.extendTestB).toEqual(true);
      });
      it("should include the extension on the instance", function() {
        B.include({
          includeTestB: true
        });
        expect(new B().includeTestB).toEqual(true);
      });
      describe("instantiating", function() {
        var b;
        beforeEach(function() {
          b = new B();
        });
        it("should be an instance of the extended class", function() {
          expect(b).toBeAnInstanceOf(B);
        });
        it("should be an instance of the new class", function() {
          expect(b).toBeAnInstanceOf(A);
        });
        it("should be an instance of the base class", function() {
          expect(b).toBeAnInstanceOf(Class);
        });
        it("should have defined instance method", function() {
          expect(b.definedTest).toBeDefined();
          expect(b.extendedDefinedTest).toBeDefined();
        });
      });
    });
  });
});