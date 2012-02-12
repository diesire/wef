/*!
 * Wef logger
 * Copyright (c) 2011 Pablo Escalada
 * MIT Licensed
 */
(function (wef) {

    var LOGLEVEL,textFormatter,registered = {},lastLogger,failSafeIndentation = false,logger,filteredLogs = 0;

    /**
     * @namespace  Log level constants
     */
    LOGLEVEL = {
        /**
         * @lends LOGLEVEL
         */
        /**
         * Max verbosity
         */
        all:-1,
        /**
         * Noisy
         */
        trace:1,
        /**
         * Useful for testing
         */
        debug:2,
        /**
         * Log and more important messages
         */
        log:2,
        /**
         * Info and more important messages
         */
        info:3,
        /**
         * Warn and error messages
         */
        warn:4,
        /**
         * Only error message
         */
        error:5,
        /**
         * Minimum verbosity. Zero logs
         */
        none:100
    }

    /**
     * Create a textFormatter
     *
     * @class Plain text logger formatter
     */
    textFormatter = function () {
        return this;
    };

    textFormatter.prototype = {

        /**
         * Formats logger messages
         * @param {Array-like}messages logger messages
         * @param {integer}indentationLevel indentation level
         * @param {string}type message type
         */
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

    /**
     * Creates a logger
     *
     * @param {string}[logName=default] Logger name
     *
     * @class Console logger withs vitamins.
     * </p>
     * Features:
     * <ul>
     *     <li>Named loggers</li>
     *     <li>Filters</li>
     *     <li>Failsafe logging functions</li>
     * </ul>
     */
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
        /**
         * Log level
         */
        loglevel: LOGLEVEL,
        /**
         * Version number
         */
        version:"0.2.0",
        /**
         * Logger formatter. Currently a plain text formatter
         */
        formatter:new textFormatter(),
        /**
         * @ignore
         */
        init:function (logName) {
            this.logName = logName;
            return this;
        },
        /**
         * Gets the number of filtered log messages. Only for testing purposes
         * @returns {integer} Number of Filtered messages
         */
        _filteredLogs:function () {
            return filteredLogs;
        },
        /**
         * Gets the indentation level of the specified logger. Only for testing
         * purposes
         *
         * @param {string}logName logger name
         * @returns {integer} indentation level
         */
        _getIndentLevel:function (logName) {
            return registered[logName].indentationLevel;
        },
        /**
         * Filter current loggers by name and priority level.
         * </p>
         * Only log entries from matched loggers and priority > filter level are
         * allowed. Filtered logs are lost.
         *
         * @param {Object|string} options filter options.
         * </p>
         * There are two shortcuts :
         * <ul>
         *     <li>"all": activates all loggers (logLevel: -1, pattern: ".*")</li>
         *     <li>"none": deactivates all loggers (logLevel: 100, pattern: ".*")</li>
         * </ul>
         * @param {integer} options.logLevel Priority level
         * @param {string} options.pattern Pattern that matches against current
         * registered loggers. Pattern must be regExp compatible.
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

    /**
     * Extension point
     */
    logger.fn = logger.prototype;

    /**
     * @namespace Output object. Currently window.console
     * </p>
     * Redefining backend allows logs redirection
     * </p>
     */
    logger.prototype.backend = window.console || {};

    /**
     * FailSafe output. Currently unused.
     * </p> window.console its the best option, alert messages are too intrusive
     */
    logger.prototype.backend.failSafe = function () {
        //silent
    };

    /**
     * FailSafe grouping activation
     */
    logger.prototype.backend.failSafeGroup = function () {
        failSafeIndentation = true;
    };

    /**
     * FailSafe ungrouping activation
     */
    logger.prototype.backend.failSafeGroupEnd = function () {
        failSafeIndentation = true;
    };

    /**
     * trace backend
     * @function
     */
    logger.prototype.backend.trace = window.console.trace || logger.prototype.backend.log;
    /**
     * log backend
     * @function
     */
    logger.prototype.backend.log = window.console.log || logger.prototype.backend.failSafe;
    /**
     * debug backend
     * @function
     */
    logger.prototype.backend.debug = window.console.debug || logger.prototype.backend.log;
    /**
     * info backend
     * @function
     */
    logger.prototype.backend.info = window.console.info || logger.prototype.backend.log;
    /**
     * warn backend
     * @function
     */
    logger.prototype.backend.warn = window.console.warn || logger.prototype.backend.log;
    /**
     * error backend
     * @function
     */
    logger.prototype.backend.error = window.console.error || logger.prototype.backend.log;
    /**
     * group backend
     * @function
     */
    logger.prototype.backend.group = window.console.group || logger.prototype.backend.failSafeGroup;
    /**
     * groupCollapsed backend
     * @function
     */
    logger.prototype.backend.groupCollapsed = window.console.groupCollapsed || window.console.group || logger.prototype.backend.failSafeGroup;
    /**
     * groupEnd backend
     * @function
     */
    logger.prototype.backend.groupEnd = window.console.groupEnd || logger.prototype.backend.failSafeGroupEnd;

    logger.prototype.init.prototype = logger.prototype;

    //TODO: refactor using wef.extend

    logger.prototype.init.prototype.debug =
    /**
     * Logs messages of logLevel=debug
     * @param {string}message
     * @param {string}[messages] more messages, comma separated
     * @memberOf logger#
     * @name debug
     * @function
     */
    function (message) {
        if (registered[lastLogger].logLevel > LOGLEVEL.debug) {
            filteredLogs++;
            return this;
        }
        //crossBrowser support
        if (Function.prototype.bind && console && typeof console.debug == "object") {
            var debug = Function.prototype.bind.call(console.debug, console);
            debug.apply(console, this.formatter.format(arguments, registered[lastLogger].indentationLevel));
            return this;
        } else {
            this.backend.debug.apply(this.backend, this.formatter.format(arguments, registered[lastLogger].indentationLevel));
            return this;
        }
    };

    logger.prototype.init.prototype.error =
    /**
     * Logs messages of logLevel=error
     * @param {string}message
     * @param {string}[messages] more messages, comma separated
     * @memberOf logger#
     * @name error
     * @function
     */
    function (message) {
        if (registered[lastLogger].logLevel > LOGLEVEL.error) {
            filteredLogs++;
            return this;
        }
        if (Function.prototype.bind && console && typeof console.error == "object") {
            var error = Function.prototype.bind.call(console.error, console);
            error.apply(console, this.formatter.format(arguments, registered[lastLogger].indentationLevel));
            return this;
        } else {
            this.backend.error.apply(this.backend, this.formatter.format(arguments, registered[lastLogger].indentationLevel));
            return this;
        }
    };

    logger.prototype.init.prototype.info =
    /**
     * Logs messages of logLevel=info
     * @param {string}message
     * @param {string}[messages] more messages, comma separated
     * @memberOf logger#
     * @name info
     * @function
     */
    function (message) {
        if (registered[lastLogger].logLevel > LOGLEVEL.info) {
            filteredLogs++;
            return this;
        }
        if (Function.prototype.bind && console && typeof console.info == "object") {
            var info = Function.prototype.bind.call(console.info, console);
            info.apply(console, this.formatter.format(arguments, registered[lastLogger].indentationLevel));
            return this;
        } else {
            this.backend.info.apply(this.backend, this.formatter.format(arguments, registered[lastLogger].indentationLevel));
            return this;
        }
    };

    logger.prototype.init.prototype.warn =
    /**
     * Logs messages of logLevel=warn
     * @param {string}message
     * @param {string}[messages] more messages, comma separated
     * @memberOf logger#
     * @name warn
     * @function
     */
    function (message) {
        if (registered[lastLogger].logLevel > LOGLEVEL.warn) {
            filteredLogs++;
            return this;
        }
        if (Function.prototype.bind && console && typeof console.warn == "object") {
            var warn = Function.prototype.bind.call(console.warn, console);
            warn.apply(console, this.formatter.format(arguments, registered[lastLogger].indentationLevel));
            return this;
        } else {
            this.backend.warn.apply(this.backend, this.formatter.format(arguments, registered[lastLogger].indentationLevel));
            return this;
        }
    };

    logger.prototype.init.prototype.log =
    /**
     * Logs messages of logLevel=log
     * @param {string}message
     * @param {string}[messages] more messages, comma separated
     * @memberOf logger#
     * @name log
     * @function
     */
    function (message) {
        if (registered[lastLogger].logLevel > LOGLEVEL.log) {
            filteredLogs++;
            return this;
        }
        if (Function.prototype.bind && console && typeof console.log == "object") {
            var log = Function.prototype.bind.call(console.log, console);
            log.apply(console, this.formatter.format(arguments, registered[lastLogger].indentationLevel));
            return this;
        } else {
            this.backend.log.apply(this.backend, this.formatter.format(arguments, registered[lastLogger].indentationLevel));
            return this;
        }
    };

    logger.prototype.init.prototype.trace =
    /**
     * Logs messages of logLevel=trace
     * @param {string}message
     * @param {string}[messages] more messages, comma separated
     * @memberOf logger#
     * @name trace
     * @function
     */
    function () {
        if (registered[lastLogger].logLevel > LOGLEVEL.trace) {
            filteredLogs++;
            return this;
        }
        if (Function.prototype.bind && console && typeof console.trace == "object") {
            var trace = Function.prototype.bind.call(console.trace, console);
            trace.apply(console, this.formatter.format(arguments, registered[lastLogger].indentationLevel));
            return this;
        } else {
            this.backend.trace.apply(this.backend, this.formatter.format(arguments, registered[lastLogger].indentationLevel));
            return this;
        }
    };

    logger.prototype.init.prototype.group =
    /**
     * Groups next messages until there is a call to groupEnd
     * and logs messages to logLevel=log
     * @param {string}[messages] more messages, comma separated
     * @memberOf logger#
     * @name group
     * @function
     */
    function (message) {
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

    logger.prototype.init.prototype.groupEnd =
    /**
     * Ungroup previously grouped messages
     * and logs messages to logLevel=log
     * @param {string}[messages] messages, comma separated
     * @memberOf logger#
     * @name groupEnd
     * @function
     */
    function (message) {
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