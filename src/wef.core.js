/*!
 * Wef
 * Copyright (c) 2011 Pablo Escalada
 * MIT Licensed
 */

/**
 * wef module
 */
(function(global) {
    var wef = function () {
        return new wef.fn.init();
    };

    wef.fn = wef.prototype;

    wef.prototype.constructor = wef;

    wef.prototype.init = function () {
        return this;
    };

    //class properties
    wef.prototype.version = "0.0.1";

    wef.fn.init.prototype = wef.fn;

    //registering global variable
    if(global.wef) {
        throw new Error("wef has already been defined");
    } else {
        global.wef = wef;
    }
})(window);
