/*!
 * Wef pattern
 * Copyright (c) 2011 Pablo Escalada
 * MIT Licensed
 */

/**
 * The wef patterns module.
 */
(function () {
    var patterns = {
    };

    function Pattern(regExp) {
        this.regExp = regExp;
    }

    Pattern.prototype = {
        regExp: RegExp,
        subPattern: [],
        add: function(pattern) {
            this.subPattern.push(pattern);
        },
        match: function(string) {
            var currentString = string;
            return this.subPattern.map(function(element) {
                currentString.match(this.regExp);
            });
        }
    };
    //update namespaces
    wef.patterns = this;
})();

