/*!
 * wef.cssParser tests
 * Copyright (c) 2011 Pablo Escalada
 * MIT Licensed
 */
module("cssParser");

test("namespace", function () {
    notEqual(wef.cssParser, undefined, "is wef.cssParser namespace defined?");
    equal(typeof wef.cssParser, "function", "is wef.cssParser a function?");
});

test("constructor", function () {
    equal(typeof wef.cssParser(), "object", "empty constructor returns an object");
});

test("public properties", function () {
    equal(typeof wef.cssParser().version, "string", "wef.cssParser().version");
});

test("pubic methods", function () {
    var text = 'body { height: 100%; display: "a.b.c"  /2em "....."  /1em "d.e.f" "....."  /1em "g.h.i"  /2em 5em 1em  *  1em 10em}';
    notEqual(wef.cssParser().parse(text), null, "parse(string) ok");
});

test("parse exceptions", function () {
    raises(function () {
        wef.cssParser().parse("asd");
    }, "invalid css data throws an exception");
    raises(function () {
        wef.cssParser().parse(444);
    }, "parse(number) throws an exception");
    raises(function () {
        wef.cssParser().parse();
    }, "parse(undefined) throws an exception");
    raises(function () {
        wef.cssParser().parse(null);
    }, "parse(null) throws an exception");
    raises(function () {
        wef.cssParser().parse("");
    }, "empty data throws an exception");

    notEqual(wef.cssParser().parse("body{}"), null, "empty cssRule ok");
    notEqual(wef.cssParser().parse("body{234}"), null, "invalid cssRule declaration ok");
    notEqual(wef.cssParser().parse("body{} h1{display:none}"), null, "empty cssRule ok");

    notEqual(wef.cssParser().whenError(
        function () {
        }).parse("asd"), null, "error callback catches exception");
    notEqual(wef.cssParser().whenError(
        function () {
        }).parse("asd").parse("body{}"), null, "error callback allows chaining");
});

asyncTest("events", function () {
    var text = "body {display: \"a\"}", events = [];
    expect(10);
    wef.cssParser().whenStart(function (o) {
        equal(typeof o.time, "number", "start time in milliseconds");
        events.push("start");
    });
    wef.cssParser().whenProperty(function (property) {
        notEqual(property.selectorText, undefined, "is property.selectorText valid?");
        notEqual(property.declaration.property, undefined, "is declaration.property valid?")
        notEqual(property.declaration.valueText, undefined, "is declaration.valueText valid?")
        events.push("prop");
    });
    wef.cssParser().whenCssRule(function (cssRule) {
        notEqual(cssRule.currentLine, undefined, "is cssRule data valid?");
        events.push("css");
    });
    wef.cssParser().whenStop(function (o) {
        equal(typeof o.time, "number", "stop time in milliseconds");
        events.push("stop");
    });
    wef.cssParser().parse(text);

    setTimeout(function () {
        equal("start", events.shift());
        equal("css", events.shift());
        equal("prop", events.shift());
        equal("stop", events.shift());
        start();
    }, 100);
});

asyncTest("error event", function () {
    var text = "", events = [];

    wef.cssParser().whenStart(function () {
        events.push("start");
    });
    wef.cssParser().whenProperty(function () {
        events.push("prop");
    });
    wef.cssParser().whenCssRule(function () {
        events.push("css");
    });
    wef.cssParser().whenStop(function () {
        events.push("stop");
    });
    wef.cssParser().whenError(function () {
            events.push("error");
        });
    wef.cssParser().parse(text);

    setTimeout(function () {
        expect(1);
        equal("error", events.shift());
        start();
    }, 100);
});