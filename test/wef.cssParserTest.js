/*!
 * wef.cssParser tests
 * Copyright (c) 2011 Pablo Escalada
 * MIT Licensed
 */
module("cssParser");
test("namespace", function() {
    notEqual(wef.cssParser , undefined, "is wef.cssParser namespace defined?");
    equal(typeof wef.cssParser, "function", "is wef.cssParser a function?");
});

test("constructor", function() {
    equal(typeof wef.cssParser(), "object", "empty constructor returns an object");
});

test("public properties", function() {
    equal(typeof wef.cssParser().version, "string", "wef.cssParser().version");
});

test("pubic methods", function() {
    var text = 'body { height: 100%; display: "a.b.c"  /2em "....."  /1em "d.e.f" "....."  /1em "g.h.i"  /2em 5em 1em  *  1em 10em}';
    notEqual(wef.cssParser().parse(text), null, "parse(string) ok");
});

test("parse", function() {
    notEqual(wef.cssParser().parse("asd"), null, "parse(empty string) ok");
    equals(wef.cssParser().parse(444), null, "parse(number) returns null");
    equals(wef.cssParser().parse(), null, "parse() returns null");
    equals(wef.cssParser().parse(null), null, "parse(null) returns null");
    notEqual(wef.cssParser().parse(""), null, "parse(empty string) ok");
});