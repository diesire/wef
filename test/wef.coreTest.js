/*!
 * wef.core tests
 * Copyright (c) 2011 Pablo Escalada
 * MIT Licensed
 */
TestCase("wef.core", {
    "test wef not null": function() {
        assertNotNull(window.wef);
    },
    "test global namespace": function() {
            assertNotNull(wef);
        },
    "test wef": function() {
        assertEquals("0.0.1", window.wef.VERSION);
    }
});