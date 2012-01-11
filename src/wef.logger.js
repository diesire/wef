/*!
 * Wef logger
 * Copyright (c) 2011 Pablo Escalada
 * MIT Licensed
 */
(function (wef) {
    var LOGLEVEL = {
        all:-1,
        trace:1,
        debug:2,
        log:2,
        info:3,
        warn:4,
        error:5,
        none:100
    }, textFormatter, registered = {}, lastLogger, failSafeIndentation = false, logger, filteredLogs = 0;

    textFormatter = function () {
        return this;
    };

    textFormatter.prototype = {
        format:function (messages, indentationLevel, type) {
            var tmp = [], levelMarks = "                                                                                            ", levelText, typeText;
            tmp = Array.prototype.slice.call(messages, tmp);
            if (failSafeIndentation && indentationLevel) {
                levelText = levelMarks.slice(0, indentationLevel);
                tmp.unshift(levelText);
            }
            if (type) {
                typeText = "[" + type + "]";
                tmp.unshift(typeText);
            }
            return tmp;
        }
    };

    logger = function (logName) {
        var tmpLogger;
        if (!logName || logName === "") {
            logName = "default";
        }
        lastLogger = logName;
        if (registered[lastLogger]) {
            return registered[lastLogger].logger;
        } else {
            tmpLogger = new logger.prototype.init(lastLogger);
            registered[lastLogger] = {
                logLevel:LOGLEVEL.all,
                indentationLevel:0,
                logger:tmpLogger
            };
            return tmpLogger;
        }
    };

    logger.prototype = {
        constructor:logger,
        version:"0.1.0",
        loglevel: LOGLEVEL,
        formatter:new textFormatter(),
        init:function (logName) {
            this.logName = logName;
            return this;
        },
        _filteredLogs:function () {
            return filteredLogs;
        },
        _getIndentLevel:function (logName) {
            return registered[logName].indentationLevel;
        },
        /**
         * Filter current loggers by name and priority level.
         * Only log entries from matched loggers and priority > filter level are allowed. Filtered logs are lost.
         *
         * @param {Object|string} options Filter options. There are two shortcuts :
         * string "all" activate all loggers (logLevel: -1, pattern: ".*")
         * string "none" deactivate all loggers (logLevel: 100, pattern: ".*")
         * @param {number} options.logLevel Priority level
         * @param {string} options.pattern Pattern that matches against current registered loggers. Pattern must be regExp
         * compatible.
         * */
        filter:function (options) {
            var name, regExp, logLevel;
            if (!options) {
                return this;
            }

            if (options == "none" || options == "off") {
                options = {logLevel:LOGLEVEL.none, pattern:".*"};
            }

            if (options == "all" || options == "on") {
                options = {logLevel:LOGLEVEL.all, pattern:".*"};
            }

            if (!options.logLevel || typeof options.logLevel != "number" || !options.pattern || typeof options.pattern != "string") {
                //do nothing
                return this;
            }
            regExp = new RegExp(options.pattern);
            logLevel = options.logLevel;

            for (name in registered) {
                if (regExp.test(name)) {
                    registered[name].logLevel = logLevel;
                } else {
                    registered[name].logLevel = LOGLEVEL.none;
                }
            }
            filteredLogs = 0;
            return this;
        }
    };

    logger.filter = logger.prototype.filter;

    logger.version = logger.prototype.version;

    logger.prototype.backend = window.console || {};

    logger.prototype.backend.failSafe = function () {
        //silent
    };

    logger.prototype.backend.failSafeGroup = function () {
        failSafeIndentation = true;
    };

    logger.prototype.backend.failSafeGroupEnd = function () {
        failSafeIndentation = true;
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
        if (registered[lastLogger].logLevel > LOGLEVEL.debug) {
            filteredLogs++;
            return this;
        }
        this.backend.debug.apply(this.backend, this.formatter.format(arguments, registered[lastLogger].indentationLevel));
        return this;
    };

    logger.prototype.init.prototype.error = function (message) {
        if (registered[lastLogger].logLevel > LOGLEVEL.error) {
            filteredLogs++;
            return this;
        }
        this.backend.error.apply(this.backend, this.formatter.format(arguments, registered[lastLogger].indentationLevel));
        return this;
    };

    logger.prototype.init.prototype.info = function (message) {
        if (registered[lastLogger].logLevel > LOGLEVEL.info) {
            filteredLogs++;
            return this;
        }
        this.backend.info.apply(this.backend, this.formatter.format(arguments, registered[lastLogger].indentationLevel));
        return this;
    };

    logger.prototype.init.prototype.warn = function (message) {
        if (registered[lastLogger].logLevel > LOGLEVEL.warn) {
            filteredLogs++;
            return this;
        }
        this.backend.warn.apply(this.backend, this.formatter.format(arguments, registered[lastLogger].indentationLevel));
        return this;
    };

    logger.prototype.init.prototype.log = function (message) {
        if (registered[lastLogger].logLevel > LOGLEVEL.log) {
            filteredLogs++;
            return this;
        }
        this.backend.log.apply(this.backend, this.formatter.format(arguments, registered[lastLogger].indentationLevel));
        return this;
    };

    logger.prototype.init.prototype.trace = function () {
        if (registered[lastLogger].logLevel > LOGLEVEL.trace) {
            filteredLogs++;
            return this;
        }
        this.backend.trace.call(this.backend);
        return this;
    };

    logger.prototype.init.prototype.group = function (message) {
        registered[lastLogger].indentationLevel++;
        this.backend.groupCollapsed.call(this.backend);
        if (registered[lastLogger].logLevel > LOGLEVEL.log) {
            filteredLogs++;
            return this;
        }
        if (message) {
            this.log.apply(this, arguments);
        }
        return this;
    };

    logger.prototype.init.prototype.groupEnd = function (message) {
        registered[lastLogger].indentationLevel--;
        this.backend.groupEnd.call(this.backend);
        if (registered[lastLogger].logLevel > LOGLEVEL.trace) {
            filteredLogs++;
            return this;
        }
        if (message) {
            this.log.apply(this, arguments);
        }
        return this;
    };

    wef.logger = logger;

})(window.wef);