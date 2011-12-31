/*!
 * Wef logger
 * Copyright (c) 2011 Pablo Escalada
 * MIT Licensed
 */
(function () {

    var LOGLEVEL = {
        all:-1,
        trace:1,
        debug:2,
        log:2,
        info:3,
        warn:4,
        error:5,
        none:100
    };

    var textFormatter = function() {
        return this;
    };

    textFormatter.prototype.format = function (messages, indentationLevel, type) {
        var tmp = [],
            levelMarks = "                                                                                            ",
            levelText, typeText;
        tmp = Array.prototype.slice.call(messages, tmp);
        if (indentationLevel) {
            levelText = levelMarks.slice(0, indentationLevel);
            tmp.unshift(levelText);
        }
        if (type) {
            typeText = "[" + type + "]";
            tmp.unshift(levelText);
        }
        return tmp;
    };

    var logger = function() {
        return new logger.prototype.init();
    },
        logLevel = LOGLEVEL.all,
        indentationLevel = 0;

    logger.prototype.constructor = logger;
    logger.prototype.version = "0.0.1";
    logger.prototype.formatter = new textFormatter();
    logger.prototype.init = function () {
        return this;
    };
    logger.filter = logger.prototype.filter = function (limit) {
        logLevel = LOGLEVEL[limit] || LOGLEVEL.all;
        return this;
    };

    logger.prototype.backend = window.console || {};
    logger.prototype.backend.failSafe = function () {
        //silent
    };
    logger.prototype.backend.failSafeGroup = function () {
        indentationLevel++;
    };
    logger.prototype.backend.failSafeGroupEnd = function () {
        indentationLevel--;
    };
    logger.prototype.backend.trace = window.console.trace || logger.prototype.backend.log;
    logger.prototype.backend.log = window.console.log || logger.prototype.backend.failSafe;
    logger.prototype.backend.debug = window.console.debug || logger.prototype.backend.log;
    logger.prototype.backend.info = window.console.info || logger.prototype.backend.log;
    logger.prototype.backend.warn = window.console.warn || logger.prototype.backend.log;
    logger.prototype.backend.error = window.console.error || logger.prototype.backend.log;
    logger.prototype.backend.group = window.console.group || logger.prototype.backend.failSafeGroup;
    logger.prototype.backend.groupCollapsed = window.console.groupCollapsed || window.console.group || logger.prototype.backend.failSafeGroup;
    logger.prototype.backend.groupEnd = window.console.groupEnd || logger.prototype.backend.failSafeGroupEnd;

    logger.prototype.init.prototype = logger.prototype;

    logger.prototype.init.prototype.debug = function (message) {
        if (logLevel > LOGLEVEL.debug) return this;
        this.backend.debug.apply(this.backend, this.formatter.format(arguments, indentationLevel));
        return this;
    };

    logger.prototype.init.prototype.error = function (message) {
        if (logLevel > LOGLEVEL.error) return this;
        this.backend.error.apply(this.backend, this.formatter.format(arguments, indentationLevel));
        return this;
    };

    logger.prototype.init.prototype.info = function (message) {
        if (logLevel > LOGLEVEL.info) return this;
        this.backend.info.apply(this.backend, this.formatter.format(arguments, indentationLevel));
        return this;
    };

    logger.prototype.init.prototype.warn = function (message) {
        if (logLevel > LOGLEVEL.warn) return this;
        this.backend.warn.apply(this.backend, this.formatter.format(arguments, indentationLevel));
        return this;
    };

    logger.prototype.init.prototype.log = function (message) {
        if (logLevel > LOGLEVEL.log) return this;
        this.backend.log.apply(this.backend, this.formatter.format(arguments, indentationLevel));
        return this;
    };

    logger.prototype.init.prototype.trace = function () {
        if (logLevel > LOGLEVEL.trace) return this;
        this.backend.trace.call(this.backend);
        return this;
    };

    logger.prototype.init.prototype.group = function (message) {
        this.backend.groupCollapsed.call(this.backend);
        if (logLevel > LOGLEVEL.log) return this;
        if (message) {
            this.log.apply(this, arguments);
        }
        return this;
    };

    logger.prototype.init.prototype.groupEnd = function (message) {
        this.backend.groupEnd.call(this.backend);
        if (logLevel > LOGLEVEL.trace) return this;
        if (message) {
            this.log.apply(this, arguments);
        }
        return this;
    };

    wef.fn.logger = logger;
})();