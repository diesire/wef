/*!
 * cssParser Wef plugin
 * Copyright (c) 2011 Pablo Escalada
 * MIT Licensed
 */

//requires: wef.events, console, cssParser
//exports: cssParser

/**
 * The cssParser plugin
 */
(function () {
    //TODO: CssParserAdapter
    var cssParser = {
        name:"cssParser",
        version:"0.0.1",
        description:"A CSS Parser. Wraps excellent JSCSSP library <http://glazman.org/JSCSSP/>",
        authors:["Pablo Escalada <uo1398@uniovi.es>"],
        licenses:["MIT"], //TODO: Licenses
        init:function () {
            return cssParser;
        },
        parse:function (text) {
            var backend = new CSSParser();
            var sheet = backend.parse(text);

            sheet.cssRules.forEach(function (cssRule) {
                //workaround. Not very glad of firing document events
                var cssRuleEvent = document.createEvent("Event");
                cssRuleEvent.initEvent("cssRuleFound", true, true);
                cssRuleEvent.selectorText = cssRule.mSelectorText;
                document.dispatchEvent(cssRuleEvent);

                cssRule.declarations.forEach(function (declaration) {
                    var propertyEvent = document.createEvent("Event");
                    propertyEvent.initEvent("propertyFound", true, true);
                    propertyEvent.property = declaration.property;
                    document.dispatchEvent(propertyEvent);
                });
            });
        }
    };

    wef.plugins.register("cssParser", cssParser);
})();