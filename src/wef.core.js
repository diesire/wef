/*!
 * Wef
 * Copyright (c) 2011 Pablo Escalada
 * MIT Licensed
 */

/**
 * A private namespace
 */
(function(global) {
    var wef = {
        VERSION: "0.0.1"
    };

    if(global.wef) {
        throw new Error("wef has already been defined");
    } else {
        global.wef = wef;
    }
})(typeof window === 'undefined' ? this : window);
