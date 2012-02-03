/*!
 * wef.core tests
 * Copyright (c) 2011 Pablo Escalada
 * MIT Licensed
 */
module("core");

test("namespace", function() {
    notEqual(wef, undefined, "is wef namespace defined?");
    equal(typeof wef, "object", "is wef an object?");
});

test("public properties", function() {
    equal(typeof wef.version, "string", "wef.version");
});