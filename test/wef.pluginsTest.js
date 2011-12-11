/*!
 * wef.plugins tests
 * Copyright (c) 2011 Pablo Escalada
 * MIT Licensed
 */
var aPlugin = {
    name:"examplePlugin",
    description:"An example plugin",
    examplePlugin:function () {
        return this.name;
    }
};

TestCase("wef.plugins", {
    "test plugins not null":function () {
        assertNotNull(wef.plugins);
    },
    "test plugin register":function () {
        wef.plugins.register("examplePlugin", aPlugin);
        assertNotUndefined(wef.plugins.registered["examplePlugin"]);
    },
    "test plugin already registered":function () {
        assertNotUndefined(wef.plugins.registered["examplePlugin"]);
        //not obvious
        assertException(function () {
            wef.plugins.register("examplePlugin", aPlugin)
        });
    },
    "test plugin remove":function () {
        wef.plugins.remove("examplePlugin");
        assertUndefined(wef.plugins.registered["examplePlugin"]);
    },
    "test not found plugin remove":function () {
        assertUndefined(wef.plugins.registered["examplePlugin"]);
        assertException(function () {
            wef.plugins.remove("examplePlugin")
        });
    }
});