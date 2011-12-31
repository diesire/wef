/*!
 * Wef logger
 * Copyright (c) 2011 Pablo Escalada
 * MIT Licensed
 */

/**
 * The wef plugins module.
 */
(function () {

    var textFormatter = function() {
        return this;
    };

    textFormatter.prototype.format = function (messages, level, type) {
        var tmp = Array.prototype.slice.call(messages),
            levelMarks = "                                                                                            ",
            levelText, typeText;
        if (level) {
            levelText = levelMarks.splice(0, level);
            messages.shift(levelText);
        }
        if (type) {
            typeText = "[" + type + "]";
            messages.shift(levelText);
        }
        return tmp;
    };

    var logger = function() {
        console.warn(">>>>logger constructor");
        return new logger.prototype.init();
    };

    logger.prototype.constructor = logger;
    logger.prototype.level = 0;
    logger.prototype.version = "0.0.1";
    logger.prototype.formatter = new textFormatter();

    logger.prototype.init = function () {
        return this;
    };

    logger.prototype.backend = window.console || {};
    logger.prototype.backend.log = window.console.log || logger.prototype.backend.failSafe;
    logger.prototype.backend.info = window.console.info || logger.prototype.backend.log;
    logger.prototype.backend.debug = window.console.debug || logger.prototype.backend.log;
    logger.prototype.backend.trace = window.console.trace || logger.prototype.backend.log;
    logger.prototype.backend.error = window.console.error || logger.prototype.backend.log;
    logger.prototype.backend.warn = window.console.warn || logger.prototype.backend.log;
    logger.prototype.backend.group = window.console.group || logger.prototype.backend.failSafeGroup;
    logger.prototype.backend.groupCollapsed = window.console.groupCollapsed || logger.prototype.backend.group;
    logger.prototype.backend.groupEnd = window.console.groupEnd || logger.prototype.backend.failSafeGroupEnd;
    logger.prototype.backend.failSafe = function () {
    };
    logger.prototype.backend.failSafeGroup = function () {
        this.level++;
    };
    logger.prototype.backend.failSafeGroupEnd = function () {
        this.level--;
    };

    logger.prototype.init.prototype = logger.prototype;

    logger.prototype.init.prototype.debug = function (message) {
        this.backend.debug.apply(this.backend, this.formatter.format(arguments), this.level);
        return this;
    };

    logger.prototype.init.prototype.error = function (message) {
        this.backend.error.apply(this.backend, this.formatter.format(arguments), this.level);
        return this;
    };

    logger.prototype.init.prototype.info = function (message) {
        this.backend.info.apply(this.backend, this.formatter.format(arguments), this.level);
        return this;
    };

    logger.prototype.init.prototype.warn = function (message) {
        this.backend.warn.apply(this.backend, this.formatter.format(arguments), this.level);
        return this;
    };

    logger.prototype.init.prototype.log = function (message) {
        this.backend.log.apply(this.backend, this.formatter.format(arguments), this.level);
        return this;
    };

    logger.prototype.init.prototype.trace = function () {
        this.backend.trace.apply(this.backend);
        return this;
    };

    logger.prototype.init.prototype.group = function (message) {
        if (message) {
            this.log.apply(this, arguments);
        }
        this.backend.groupCollapsed.apply(this.backend)
        return this;
    };

    logger.prototype.init.prototype.endGroup = function (message) {
        if (message) {
            this.log.apply(this, arguments);
        }
        this.backend.groupEnd.apply(this.backend);
        return this;
    };

    wef.fn.logger = logger;
})();