/*!
 * cssParser Wef plugin
 * Copyright (c) 2011 Pablo Escalada
 * MIT Licensed
 */

//requires: wef.events, console, cssParser
//exports: cssParser
//events: onSelector, onProperty

/**
 * The cssParser plugin
 */
(function () {
    var cssParser = {
        name:"cssParser",
        version:"0.0.1",
        description:"A CSS Parser ;-)",
        authors:["Pablo Escalada <uo1398@uniovi.es>"],
        licenses:["MIT"], //TODO: Licenses
        cssParser:function () {
            return cssParser;
        },
        parse:function (text) {
            var backend = new CSSParser();
            var sheet = backend.parse(text);

            sheet.cssRules.forEach(function (cssRule) {
                //workaround. No very glad of firing document events
                var selectorEvent = document.createEvent("Event");
                selectorEvent.initEvent("selectorFound", true, true);
                selectorEvent.selectorText = cssRule.mSelectorText;
                document.dispatchEvent(selectorEvent);

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