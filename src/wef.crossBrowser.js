/*!
 * Wef crossBrowser
 * Copyright (c) 2011 Pablo Escalada
 * MIT Licensed
 */
(function (wef) {

    if (!('map' in Array.prototype)) {
        Array.prototype.map = function (mapper, that /*opt*/) {
            var other = new Array(this.length);
            for (var i = 0, n = this.length; i < n; i++)
                if (i in this)
                    other[i] = mapper.call(that, this[i], i, this);
            return other;
        };
    }

})(window.wef);