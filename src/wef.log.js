/*!
 * Wef logger
 * Copyright (c) 2011 Pablo Escalada
 * MIT Licensed
 */

/**
 * The wef plugins module.
 */
(function () {
    var backend = console;

    var debug = function (message) {
        backend.debug.apply(this, arguments);
    };

    var error = function (message) {
        backend.error.apply(this, arguments);
    };

    var info = function (message) {
        backend.info.apply(this, arguments);
    };

    var warn = function (message) {
        backend.warn.apply(this, arguments);
    };

    var log = {
        debug:debug,
        info:info,
        warn:warn,
        error:error
    };

    //update namespace
    wef.log = log;
})();