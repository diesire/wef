/*!
 * cssParser Wef plugin
 * Copyright (c) 2011 Pablo Escalada
 * MIT Licensed
 */

//requires: wef.events, console, cssParser, wef
//exports: cssParser

/**
 * The cssParser plugin
 */


(function () {
    var cssParser = {
        name:"cssParser",
        version:"0.0.1",
        description:"A CSS Parser. Wraps excellent JSCSSP library <http://glazman.org/JSCSSP/>",
        authors:["Pablo Escalada <uo1398@uniovi.es>"],
        licenses:["MIT"], //TODO: Licenses
        events:{
            PROPERTY_FOUND:"propertyFound",
            CSSRULE_FOUND:"cssRuleFound",
            PARSER_START:"parserStart",
            PARSER_DONE:"parserDone"
        },
        init:function () {
            return cssParser;
        },
        parse:function (text) {
            var backend = jscssp.init();
            var sheet = backend.parse(text);
            var cssRuleEvent = document.createEvent("Event");
            cssRuleEvent.initEvent(cssParser.events.CSSRULE_FOUND, true, true);
            var propertyEvent = document.createEvent("Event");
            propertyEvent.initEvent(cssParser.events.PROPERTY_FOUND, true, true);

            var parserStartEvent = document.createEvent("Event");
            parserStartEvent.initEvent(cssParser.events.PARSER_START, true, true);
            parserStartEvent.date = new Date().toGMTString();
            document.dispatchEvent(parserStartEvent);

            sheet.cssRules.forEach(function (cssRule) {
                //workaround. Not very glad of firing document events
                cssRuleEvent.cssRule = cssRule;
                document.dispatchEvent(cssRuleEvent);
                console.debug(cssRuleEvent);

                cssRule.declarations.forEach(function (declaration) {
                    propertyEvent.data = {
                        selectorText:cssRule.selectorText(),
                        declaration:new StyleDeclaration(declaration.property, declaration.valueText)
                    };
                    document.dispatchEvent(propertyEvent);
                    console.debug(propertyEvent);
                });
            });

            var parserDoneEvent = document.createEvent("Event");
            parserDoneEvent.initEvent(cssParser.events.PARSER_DONE, true, true);
            parserDoneEvent.date = new Date().toGMTString();
            document.dispatchEvent(parserDoneEvent);
        }
    };

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

    wef.plugins.register("cssParser", cssParser);

})();

