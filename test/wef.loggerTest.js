/*!
 * wef.core tests
 * Copyright (c) 2011 Pablo Escalada
 * MIT Licensed
 */
module("logger");
test("namespace", function() {
    notEqual(wef.logger, undefined, "is wef.logger namespace defined?");
    equal(typeof wef.logger, "function", "is wef.logger a function?");

});

test("wef.logger.fn", function() {
    notEqual(typeof wef.logger.fn, undefined, "is wef.logger.fn defined ?");
});

test("constructor", function() {
    equal(typeof wef.logger(), "object", "empty constructor returns an object");

     equal(typeof wef.logger("test"), "object", "empty constructor returns an object");
});

test("public properties", function() {
    equal(typeof wef.logger().version, "string", "wef.logger().version");
});

test("pubic methods", function() {
    var msg = "qunit testing, don't worry";
    equal(typeof wef.logger().trace(), typeof wef.logger(), "trace()");
    equal(typeof wef.logger().log(), typeof wef.logger(), "log()");
    equal(typeof wef.logger().debug(msg, ": debug"), typeof wef.logger(), "debug()");
    equal(typeof wef.logger().info(msg, ": info"), typeof wef.logger(), "info()");
    equal(typeof wef.logger().warn(msg, ": warn"), typeof wef.logger(), "warn()");
    equal(typeof wef.logger().error(msg, ": error"), typeof wef.logger(), "error()");
    equal(typeof wef.logger().group(msg, ": group"), typeof wef.logger(), "group()");
    equal(typeof wef.logger().groupEnd(msg, ": endGroup"), typeof wef.logger(), "groupEnd()");
    equal(typeof wef.logger().filter("all"), typeof wef.logger(), "filter()");

    equal(typeof wef.logger.filter("all"), typeof wef.logger, "logger.filter()");
});

test("chaining", function() {
    var msg = "qunit testing, don't worry";
    equal(typeof wef.logger().trace(msg).log(msg).debug(msg).info(msg).warn(msg).error(msg).group(msg).groupEnd(msg).filter("all").info(msg), typeof wef.logger(), "logger() chaining calls");
});

test("filter", function() {
    var msg = "qunit testing, don't worry";
    equal(wef.logger().info("filter - message 1").filter("none").info("message 2")._filteredLogs(), 1, "One message has been filtered");
    equal(wef.logger().filter("all").info("message 3")._filteredLogs(), 0, "No messages has been filtered");
});

test("groups", function() {
    var msg = "qunit testing, don't worry";
    equal(wef.logger().info("groups - message 1")._getIndentLevel("default"), 0, "Nesting level 0");
    equal(wef.logger().group().info("message 2")._getIndentLevel("default"), 1, "Nesting level 1");
    equal(wef.logger().group().info("message 3")._getIndentLevel("default"), 2, "Nesting level 2");
    equal(wef.logger().groupEnd()._getIndentLevel("default"), 1, "Nesting level 1");
    equal(wef.logger().groupEnd().info("message 4")._getIndentLevel("default"), 0, "Nesting level 0");

    //works with multiple logger() calls because stores level in logger class
    wef.logger().info("groups 2 - message 1");
    wef.logger().group();
    wef.logger().info("message 2");
    wef.logger().group();
    wef.logger().info("message 3");
    wef.logger().groupEnd();
    wef.logger().groupEnd();
    wef.logger().info("message 4");
    (true,"README: this test needs visual confirmation: message 2 is nested into message 1, message 3 is nested into message 2");
});