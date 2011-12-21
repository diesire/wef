/*!
 * wef.log tests
 * Copyright (c) 2011 Pablo Escalada
 * MIT Licensed
 */
TestCase("wef.log", {
    "test not null": function() {
        assertNotNull(wef.log);
    },
    "test log methods": function() {
        assertNotNull(wef.log.debug("debug"));
        assertNotNull(wef.log.info("info"));
        assertNotNull(wef.log.warn("warning"));
        assertNotNull(wef.log.error("error"));
    }
});