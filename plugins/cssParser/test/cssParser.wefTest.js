/*!
 * cssParser tests
 * Copyright (c) 2011 Pablo Escalada
 * MIT Licensed
 */
TestCase("cssParser", {
    "test cssParser registration":function () {
        assertNotUndefined(wef.plugins.registered.cssParser);
        assertEquals("cssParser", wef.plugins.registered["cssParser"].name);
    },
    "test cssParser namespace":function () {
        assertNotUndefined(wef.fn.cssParser);
        assertEquals("cssParser", wef.fn.cssParser.name);
    },
    "test cssParser method":function () {
        var text = "body {display-model: \"a (intrinsic), b (intrinsic)\";} div#uno {situated: a; display-model: \"123 (intrinsic)\";}";
        wef.plugins.registered.cssParser.parse(text);
    },
    "test cssParser complex expression": function() {
        var text = 'body { height: 100%; display: "a.b.c"  /2em "....."  /1em "d.e.f" "....."  /1em "g.h.i"  /2em 5em 1em  *  1em 10em}';
        wef.plugins.registered.cssParser.parse(text);
    }
});

AsyncTestCase("cssParserAsync", {
    "test cssParser events":function (queue) {
        //requires cssParser
        var text = "body {display: \"a\"}";
        var events = [];
        document.addEventListener(parser.events.PROPERTY_FOUND, function (e) {
            events.push(e.type);
        }, false);
        document.addEventListener(parser.events.CSSRULE_FOUND, function (e) {
                    events.push(e.type);
                }, false);
        document.addEventListener(parser.events.PARSER_START, function (e) {
                    events.push(e.type);
                }, false);
        document.addEventListener(parser.events.PARSER_DONE, function (e) {
                    events.push(e.type);
                }, false);
        queue.call(function (callbacks) {
            var myCallback = callbacks.add(function () {
                wef.fn.cssParser.parse(text);
            });
            window.setTimeout(myCallback, 1000);
        });

        queue.call(function () {
            assertEquals(4, events.length);
            assertEquals("parserStart", events.shift());
            assertEquals("cssRuleFound", events.shift());
            assertEquals("propertyFound", events.shift());
            assertEquals("parserDone", events.shift());
        })
    }
})