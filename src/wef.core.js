/*!
 * Wef
 * Copyright (c) 2011 Pablo Escalada
 * MIT Licensed
 */

/**
 * wef module
 */
(function(global) {
    var wef = function() {
        return new wef.prototype.init();
    };
    wef.prototype = {
        constructor:wef,
        version: "0.0.1",
        init: function() {
            return this;
        }
    };
    wef.fn = wef.prototype;
    wef.prototype.init.prototype = wef.prototype;

    wef.fn.extend = function (receiver, giver) {
        var tmp = receiver;
        //both must be objects
        if (typeof receiver === "object" && typeof giver === "object") {
            if (tmp == null) {
                tmp = {};
            }
            if (receiver == null) {
                return tmp;
            }
            for (var property in giver) {
                tmp[property] = giver[property];
            }
            return tmp
        }
        throw new Error("InvalidArgumentException: incorrect argument type");
    };

    wef.fn.isFunction = function (obj) {
        return typeof obj == "function";
    };

    wef.fn.isString = function (obj) {
        return typeof obj == "string";
    };

    wef.fn.error = function (message) {
        throw new Error(message);   
    };

    //registering global variable
    if (global.wef) {
        throw new Error("wef has already been defined");
    } else {
        global.wef = wef();
    }
})(window);
