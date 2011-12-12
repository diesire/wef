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
        assertNotUndefined(wef.plugins.cssParser);
        assertEquals("cssParser", wef.plugins.cssParser.name);
    },
    "test cssParser method":function () {
        var text = "body {display-model: \"a (intrinsic), b (intrinsic)\";} div#uno {situated: a; display-model: \"123 (intrinsic)\";}";
        wef.plugins.registered.cssParser.cssParser().parse(text);
    }
});