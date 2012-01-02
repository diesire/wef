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
        version: "0.0.1"
    };

    //registering global variable
    if(global.wef) {
        throw new Error("wef has already been defined");
    } else {
        global.wef = wef;
    }
})(window);
