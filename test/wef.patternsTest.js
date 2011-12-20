/*!
 * wef.plugins tests
 * Copyright (c) 2011 Pablo Escalada
 * MIT Licensed
 */
TestCase("wef.patterns", {
    "test not null":function () {
        assertNotNull(wef.patterns);
    },
    "test not constructor":function () {
        assertNotNull(new wef.patterns.Pattern());
        assertNotNull(new wef.patterns.Pattern(/hola/));
    },
    "test not null":function () {
        assertNotUndefined(new wef.patterns.Pattern().add(new wef.patterns.Pattern()));
        assertNotUndefined(new wef.patterns.Pattern().add(new wef.patterns.Pattern(/hola/)).match("hola"));
    }
});