/*!
 * wef.plugins tests
 * Copyright (c) 2011 Pablo Escalada
 * MIT Licensed
 */
var correctPlugin = {
    name:"correctPlugin",
    version:"0.0.1",
    description:"An example plugin",
    init:function () {
        return this.name;
    }
};

var noInitPlugin = {
    name:"noInitPlugin",
    version:"0.0.1",
    description:"An example plugin without init() method"
};

TestCase("wef.plugins", {
    "test plugins not null":function () {
        assertNotNull(wef.plugins);
    },
    "test plugin register":function () {
        wef.plugins.register("correctPlugin", correctPlugin);
        assertNotUndefined(wef.plugins.registered["correctPlugin"]);
    },
    "test plugin namespace":function () {
        assertNotUndefined(wef.fn.correctPlugin);
    },
    "test plugin already registered":function () {
        assertNotUndefined(wef.plugins.registered["correctPlugin"]);
        //not obvious
        assertException(function () {
            wef.plugins.register("correctPlugin", correctPlugin)
        });
    },
    "test plugin remove":function () {
        wef.plugins.remove("correctPlugin");
        assertUndefined(wef.correctPlugin);
    },
    "test not found plugin remove":function () {
        assertUndefined(wef.fn.correctPlugin);
        assertException(function () {
            wef.plugins.remove("correctPlugin");
        });
    },
    "test no init() plugin":function () {
        assertException(function () {
            wef.plugins.register("noInitPlugin", noInitPlugin);
        });
    }
});