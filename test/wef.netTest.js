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
    expect(3);

    wef.net.ajax('template.css', {
        success: function(r) { ok(true, "async ajax() ok"); }
    });


    setTimeout(function () {
        raises(function() {
            wef.net.ajax('templateNotFound.css', {
                failure: function(r) { ok(true, "async ajax() error ok"); }
            })
        }, "ok, resource not found");
        start();
    }, 100);
});