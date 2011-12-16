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
        var text = 'body { height: 100%; display: "a   .   b   .   c"  /2em ".   .   .   .   ."  /1em "d   .   e   .   f" ".   .   .   .   ."  /1em "g   .   h   .   i"  /2em 5em 1em  *  1em 10em}';
        wef.plugins.registered.cssParser.parse(text);
    }
});