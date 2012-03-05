/*!
 * Wef
 * Copyright (c) 2011-2012 Pablo Escalada
 *
 * Contributor(s):
 *   César Acebal
 *
 * MIT Licensed
 */

/**
 * wef module
 */
(function () {
    var wef;
    /**
     * @namespace
     */
    wef = function () {
        return new wef.prototype.init();
    };

    wef.prototype = {
        constructor:wef,
        /**
         * Version number
         */
        version:"0.2.0",
        /**
         * @ignore
         */
        init:function () {
            return this;
        }
    };

    /**
     * Extension point
     */
    wef.fn = wef.prototype;

    /**
     * @ignore
     */
    wef.prototype.init = function () {
        return this;
    };

    wef.prototype.init.prototype = wef.prototype;

    /**
     * Extends an object with other object properties
     * @param {Object}receiver receiver object
     * @param {Object}giver giver object
     * @param {string[]}[filter] array of strings. If giver property name is
     * contained in filter is added to receiver, else don't
     *
     * @memberOf wef
     */
    wef.fn.extend = function (receiver, giver, filter) {
        var tmp = receiver, property;
        //both must be objects
        if (typeof receiver === "object" && typeof giver === "object") {
            if (tmp === null) {
                tmp = {};
            }
            if (receiver === null) {
                return tmp;
            }

            for (property in giver) {
                if ((!filter || filter.indexOf(property) !== -1) && giver.hasOwnProperty(property) && giver[property] !== undefined) {
                    tmp[property] = giver[property];
                }
            }
            return tmp;
        }
        wef.fn.error("InvalidArgumentException: incorrect argument type");
        return null;
    };

    wef.fn.hasOwnProperty = function(o, property) {
        //literal objects in IE don't have hasOwnProperty
        //todo:delete????
        return Object.prototype.hasOwnProperty.call(o, property);
    };

    /**
     * Checks if param is a Function
     * @param obj object to check
     * @returns {boolean} true if a Function, false if not
     *
     * @memberOf wef
     */
    wef.fn.isFunction = function (obj) {
        return typeof obj == "function";
    };

    /**
     * Checks if param is a literal string
     * @param obj object to check
     * @returns {boolean} true if a literal string, false if not
     *
     * @memberOf wef
     */
    wef.fn.isString = function (obj) {
        return typeof obj == "string";
    };

    /**
     * Throws an Error
     * @param message error message
     *
     * @memberOf wef
     */
    wef.fn.error = function (message) {
        throw new Error(message);
    };

    //registering global variable
    if (window.wef) {
        throw new Error("wef has already been defined");
    } else {
        window.wef = wef();
    }

})();
