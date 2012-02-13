/*!
 * wef.net tests
 * Copyright (c) 2011 Pablo Escalada
 * MIT Licensed
 */
module("net");

test("namespace", function () {
    notEqual(wef.net, undefined, "is wef.net namespace defined?");
    equal(typeof wef.net, "object", "is wef.net an object?");
});

test("public properties", function () {
    equal(typeof wef.net.version, "string", "wef.net.version");
});

asyncTest("public methods", function () {
    expect(1);
    wef.net.ajax("template.css", {
        success: function() {
            ok(true, "wef.net.ajax() success OK");
        }
    });

    setTimeout(function () {
        start();
    }, 100);
});