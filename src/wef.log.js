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
        backend.debug(message);
    };

    var error = function (message) {
        backend.error(message);
    };

    var info = function (message) {
        backend.info(message);
    };

    var warn = function (message) {
        backend.warn(message);
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