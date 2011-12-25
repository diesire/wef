/*!
 * Wef logger
 * Copyright (c) 2011 Pablo Escalada
 * MIT Licensed
 */

/**
 * The wef plugins module.
 */
(function () {
    console.info("loading wef.log module...");
    var backend = console;

    var debug = function (message) {
        backend.debug.apply(backend, arguments);
    };

    var error = function (message) {
        backend.error.apply(backend, arguments);
    };

    var info = function (message) {
        backend.info.apply(backend, arguments);
    };

    var warn = function (message) {
        backend.warn.apply(backend, arguments);
    };

    var log = {
        debug:debug,
        info:info,
        warn:warn,
        error:error
    };

    //update namespace
    wef.log = log;
    console.info("wef.log module loaded OK");
})();