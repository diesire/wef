/*!
 * wef.cssParser
 * Copyright (c) 2011 Pablo Escalada
 * MIT Licensed
 *
 * Uses JSCSSP by Daniel Glazman <daniel.glazman@disruptive-innovations.com> licensed under MPL 1.1/GPL 2.0/LGPL 2.1
 */
(function (wef) {
    /**
     * CSS Style declaration
     * @param property property name
     * @param valueText property value
     */
    function StyleDeclaration(property, valueText) {
        this.property = property;
        this.valueText = valueText;
    }

    StyleDeclaration.prototype = {
        property:"",
        valueText:"",
        toString:function () {
            return this.property + ": " + this.valueText;
        }
    };

    var callbacks = {
        parserStar:undefined,
        parserStop:undefined,
        cssRuleFound:undefined,
        propertyFound:undefined,
        error:undefined
    }, cssParser, logger, CssParserInstance;

    cssParser = function () {
        return new cssParser.prototype.init();
    };

    logger = wef.logger("cssParser").filter("none");

    cssParser.prototype.constructor = cssParser;

    CssParserInstance = function () {
        return this;
    };

    CssParserInstance.prototype.version = "0.0.1";

    CssParserInstance.prototype.backend = null;

    CssParserInstance.prototype.whenStart = function (callback) {
        if (wef.isFunction(callback)) {
            callbacks.parserStar = callback;
            logger.debug("when parserStar => ", callback);
        }
        return this;
    };

    CssParserInstance.prototype.backend = undefined;

    CssParserInstance.prototype.whenStop = function (callback) {
        if (wef.isFunction(callback)) {
            callbacks.parserStop = callback;
            logger.debug("when parserStop => ", callback);
        }
        return this;
    };

    CssParserInstance.prototype.whenCssRule = function (callback) {
        if (wef.isFunction(callback)) {
            callbacks.cssRuleFound = callback;
            logger.debug("when CssRuleFound => ", callback);
        }
        return this;
    };

    CssParserInstance.prototype.whenProperty = function (callback) {
        if (wef.isFunction(callback)) {
            callbacks.propertyFound = callback;
            logger.debug("when propertyFound => ", callback);
        }
        return this;
    };

    CssParserInstance.prototype.whenError = function (callback) {
        if (wef.isFunction(callback)) {
            callbacks.error = callback;
            logger.debug("when error -> ", callback);
        }
        return this;
    };

    CssParserInstance.prototype.parse = function (data) {
        try {
            if (!data || !wef.isString(data) || data === "") {
                var message = "InvalidArgumentExcetion - data must be a non empty string";
                logger.error(message);
                throw new Error(message);
            }
            if (callbacks.parserStar) {
                logger.info("parserStart callback");
                callbacks.parserStar.call();
            }
            var sheet = new this.backend().parse(data, false, false), property;
            //start
            sheet.cssRules.forEach(function (cssRule) {
                logger.debug("cssRule:", cssRule);
                if (callbacks.cssRuleFound) {
                    logger.info("cssRuleFound callback");
                    callbacks.cssRuleFound.call(cssRule);
                }
                //ErrorRule
                if (cssRule.type === 0) {
                    var message = "ParserException - Error in line " + cssRule.currentLine + ": " + cssRule.parsedCssText;
                    logger.error(message);
                    throw new Error(message);
                }
                cssRule.declarations.forEach(function (declaration) {
                    property = {selectorText:cssRule.selectorText(),
                        declaration:new StyleDeclaration(declaration.property, declaration.valueText)};
                    logger.debug("property:", property);
                    if (callbacks.propertyFound) {
                        logger.info("propoertyFound callback");
                        callbacks.propertyFound.call(property);
                    }
                });
            });
            //done
            if (callbacks.parserStop) {
                logger.info("parserStop callback");
                callbacks.parserStop.call();
            }
        } catch (e) {
            if (callbacks.error) {
                logger.error("error callback:", e);
                callbacks.error.call(e.message);
                return this;
            } else {
                logger.error("error -> wef.error:", e);
                wef.error(e.message);
                return null;
            }
        }
        return this;
    };

    cssParser.prototype.init = CssParserInstance;

    wef.cssParser = cssParser;

    logger.info("cssParser plugged to wef.cssParser")

})(window.wef);