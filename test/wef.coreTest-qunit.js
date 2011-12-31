/*!
 * wef.core tests
 * Copyright (c) 2011 Pablo Escalada
 * MIT Licensed
 */
module("core");
test("namespace", function() {
    notEqual(wef, undefined, "is wef namespace defined?");
    equal(typeof wef, "function", "is wef a function?");
});

test("wef.fn", function() {
    notEqual(typeof wef.fn, undefined, "is wef.fn defined ?");
});

test("constructor", function() {
    equal(typeof wef(), "object", "empty constructor returns an object")
});

test("public properties", function() {
    equal(typeof wef.fn.version, "string", "wef().version");
});