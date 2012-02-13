/*!
 * Wef crossBrowser
 * Copyright (c) 2011 Pablo Escalada
 * MIT Licensed
 */
(function (wef) {

    if (!("map" in Array.prototype)) {
        /**
         * Crossbrowser implementation of Array.map().
         *
         * More info http://stackoverflow.com/questions/2790001/fixing-javascript-array-functions-in-internet-explorer-indexof-foreach-etc
         * </p>
         * Copyright (c) 2010 bobince [http://stackoverflow.com/users/18936/bobince]
         * </p>
         * Public Domain Licensed
         *
         * @param {Array}mapper the source array
         * @param [that] "this" object reference
         */
        Array.prototype.map = function (mapper, that) {
            var other, i;
            other = new Array(this.length);
            for (i = 0, n = this.length; i < n; i++)
                if (i in this)
                    other[i] = mapper.call(that, this[i], i, this);
            return other;
        };
    }

})(window.wef);