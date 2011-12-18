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
            CSSRULE_FOUND:"cssRuleFound"
        },
        init:function () {
            return cssParser;
        },
        parse:function (text) {
            var backend = jscssp.init();
            var sheet = backend.parse(text);

            sheet.cssRules.forEach(function (cssRule) {
                //workaround. Not very glad of firing document events
                var cssRuleEvent = document.createEvent("Event");
                cssRuleEvent.initEvent(cssParser.events.CSSRULE_FOUND, true, true);
                cssRuleEvent.cssRule = cssRule; //TODO: data exchange interface
                document.dispatchEvent(cssRuleEvent);
                console.log(cssRule.cssText());

                cssRule.declarations.forEach(function (declaration) {
                    var propertyEvent = document.createEvent("Event");
                    propertyEvent.initEvent(cssParser.events.PROPERTY_FOUND, true, true);
                    console.log(declaration.cssText());
                    propertyEvent.data = {
                        selectorText:cssRule.selectorText(),
                        declaration:new StyleDeclaration(declaration.property, declaration.valueText)
                    };
                    document.dispatchEvent(propertyEvent);
                });
            });
        }
    };

    wef.plugins.register("cssParser", cssParser);


})();

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