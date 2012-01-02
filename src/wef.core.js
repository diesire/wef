/*!
 * Wef
 * Copyright (c) 2011 Pablo Escalada
 * MIT Licensed
 */

/**
 * wef module
 */
(function(global) {
    var wef = {
        version: "0.0.1",
        extend: function (receiver, giver) {
            var tmp = receiver;
            //both must be objects
            if (typeof receiver == typeof giver == "object") {
                if (tmp == null) {
                    tmp = {};
                }
                if (receiver == null) {
                    return tmp;
                }
                for (var property in giver) {
                    tmp.property = giver.property;
                }
                return tmp
            }
            throw new Error("InvalidArgumentException: incorrect argument type");
        }
    };

    //registering global variable
    if (global.wef) {
        throw new Error("wef has already been defined");
    } else {
        global.wef = wef;
    }
})(window);
