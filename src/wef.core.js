/*!
 * Wef
 * Copyright (c) 2011 Pablo Escalada
 * MIT Licensed
 */

/**
 * wef module
 */
(function () {
    var wef = function () {
        return new wef.prototype.init();
    };

    wef.prototype = {
        constructor:wef,
        version:"0.2.0",
        init:function () {
            return this;
        }
    };

    wef.fn = wef.prototype;

    wef.prototype.init = function () {
        return this;
    };

    wef.prototype.init.prototype = wef.prototype;

    wef.fn.extend = function (receiver, giver, filter) {
        var tmp = receiver, property, propertyList;
        //both must be objects
        if (typeof receiver === "object" && typeof giver === "object") {
            if (tmp === null) {
                tmp = {};
            }
            if (receiver === null) {
                return tmp;
            }
            propertyList = filter || giver;
            for (property in propertyList) {
                if (giver.hasOwnProperty(property) && giver[property] !== undefined) {
                    tmp[property] = giver[property];
                }
            }
            return tmp;
        }
        wef.fn.error("InvalidArgumentException: incorrect argument type");
        return null;
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
    if (window.wef) {
        throw new Error("wef has already been defined");
    } else {
        window.wef = wef();
    }

})();
