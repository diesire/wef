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
        events: {
            PROPERTY_FOUND: "propertyFound",
            CSSRULE_FOUND: "cssRuleFound"
        },
        init:function () {
            return cssParser;
        },
        parse:function (text) {
            var backend = new CSSParser();
            var sheet = backend.parse(text);

            sheet.cssRules.forEach(function (cssRule) {
                //workaround. Not very glad of firing document events
                var cssRuleEvent = document.createEvent("Event");
                cssRuleEvent.initEvent(cssParser.events.CSSRULE_FOUND, true, true);
                cssRuleEvent.cssRule = cssRule;

                document.dispatchEvent(cssRuleEvent);

                cssRule.declarations.forEach(function (declaration) {
                    var propertyEvent = document.createEvent("Event");
                    propertyEvent.initEvent(cssParser.events.PROPERTY_FOUND, true, true);
                    propertyEvent.declaration = declaration;
                    document.dispatchEvent(propertyEvent);
                });
            });
        }
    };

    wef.plugins.register("cssParser", cssParser);
})();