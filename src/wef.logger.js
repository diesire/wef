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
        return new logger.prototype.init();
    },
        active = true;

    logger.prototype.constructor = logger;
    logger.prototype.level = 0;
    logger.prototype.version = "0.0.1";
    logger.prototype.formatter = new textFormatter();
    logger.prototype.init = function () {
        return this;
    };
    logger.off = logger.prototype.off = function () {
        active = false;
        return this;
    };
    logger.on = logger.prototype.on = function () {
        active = true;
        return this;
    };

    logger.prototype.backend = window.console || {};
    logger.prototype.backend.failSafe = function () {
        //silent
    };
    logger.prototype.backend.failSafeGroup = function () {
        this.level++;
    };
    logger.prototype.backend.failSafeGroupEnd = function () {
        this.level--;
    };
    logger.prototype.backend.trace = window.console.trace || logger.prototype.backend.log;
    logger.prototype.backend.log = window.console.log || logger.prototype.backend.failSafe;
    logger.prototype.backend.debug = window.console.debug || logger.prototype.backend.log;
    logger.prototype.backend.info = window.console.info || logger.prototype.backend.log;
    logger.prototype.backend.error = window.console.error || logger.prototype.backend.log;
    logger.prototype.backend.warn = window.console.warn || logger.prototype.backend.log;
    logger.prototype.backend.group = window.console.group || logger.prototype.backend.failSafeGroup;
    logger.prototype.backend.groupCollapsed = window.console.groupCollapsed || window.console.group || logger.prototype.backend.failSafeGroup;
    logger.prototype.backend.groupEnd = window.console.groupEnd || logger.prototype.backend.failSafeGroupEnd;

    logger.prototype.init.prototype = logger.prototype;

    logger.prototype.init.prototype.debug = function (message) {
        if(!active) return this;
        this.backend.debug.apply(this.backend, this.formatter.format(arguments), this.level);
        return this;
    };

    logger.prototype.init.prototype.error = function (message) {
        if(!active) return this;
        this.backend.error.apply(this.backend, this.formatter.format(arguments), this.level);
        return this;
    };

    logger.prototype.init.prototype.info = function (message) {
        if(!active) return this;
        this.backend.info.apply(this.backend, this.formatter.format(arguments), this.level);
        return this;
    };

    logger.prototype.init.prototype.warn = function (message) {
        if(!active) return this;
        this.backend.warn.apply(this.backend, this.formatter.format(arguments), this.level);
        return this;
    };

    logger.prototype.init.prototype.log = function (message) {
        if(!active) return this;
        this.backend.log.apply(this.backend, this.formatter.format(arguments), this.level);
        return this;
    };

    logger.prototype.init.prototype.trace = function () {
        if(!active) return this;
        this.backend.trace.call(this.backend);
        return this;
    };

    logger.prototype.init.prototype.group = function (message) {
        if(!active) return this;
        if (message) {
            this.log.apply(this, arguments);
        }
        this.backend.groupCollapsed.call(this.backend);
        return this;
    };

    logger.prototype.init.prototype.groupEnd = function (message) {
        if(!active) return this;
        if (message) {
            this.log.apply(this, arguments);
        }
        this.backend.groupEnd.call(this.backend);
        return this;
    };

    wef.fn.logger = logger;
})();