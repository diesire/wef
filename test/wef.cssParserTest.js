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

test("parse exceptions", function() {
    raises(function() {
        wef.cssParser().parse("asd");
    }, "invalid css data throws an exception");
    raises(function() {
        wef.cssParser().parse(444);
    }, "parse(number) throws an exception");
    raises(function() {
        wef.cssParser().parse()
    }, "parse(undefined) throws an exception");
    raises(function() {
        wef.cssParser().parse(null)
    }, "parse(null) throws an exception");
    raises(function() {
        wef.cssParser().parse("")
    }, "empty data throws an exception");
    notEqual(wef.cssParser().parse("body{}"), null, "empty cssRule ok");
    notEqual(wef.cssParser().parse("body{234}"), null, "invalid cssRule declaration ok");
    notEqual(wef.cssParser().parse("body{} h1{display:none}"), null, "empty cssRule ok");
});