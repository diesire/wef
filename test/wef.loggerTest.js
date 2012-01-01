/*!
 * wef.core tests
 * Copyright (c) 2011 Pablo Escalada
 * MIT Licensed
 */
module("logger");
test("namespace", function() {
    notEqual(wef.fn.logger, undefined, "is wef.fn.logger namespace defined?");
    equal(typeof wef.fn.logger, "function", "is wef.fn.logger a function?");
    equal(typeof wef().logger, "function", "is wef().wef a function?");
});

test("wef.logger.fn", function() {
    notEqual(typeof wef.fn.logger.fn, undefined, "is wef.logger.fn defined ?");
});

test("constructor", function() {
    equal(typeof wef.fn.logger(), "object", "empty constructor returns an object");
    equal(typeof wef().logger(), "object", "empty constructor returns an object");
    equal(typeof wef().logger("test"), "object", "empty constructor returns an object");
});

test("public properties", function() {
    equal(typeof wef.fn.logger().version, "string", "wef.logger().version");
});

test("pubic methods", function() {
    var msg = "qunit testing, don't worry";
    equal(typeof wef.fn.logger().trace(), typeof wef.fn.logger(), "trace()");
    equal(typeof wef.fn.logger().log(), typeof wef.fn.logger(), "log()");
    equal(typeof wef.fn.logger().debug(msg, ": debug"), typeof wef.fn.logger(), "debug()");
    equal(typeof wef.fn.logger().info(msg, ": info"), typeof wef.fn.logger(), "info()");
    equal(typeof wef.fn.logger().warn(msg, ": warn"), typeof wef.fn.logger(), "warn()");
    equal(typeof wef.fn.logger().error(msg, ": error"), typeof wef.fn.logger(), "error()");
    equal(typeof wef.fn.logger().group(msg, ": group"), typeof wef.fn.logger(), "group()");
    equal(typeof wef.fn.logger().groupEnd(msg, ": endGroup"), typeof wef.fn.logger(), "groupEnd()");
    equal(typeof wef.fn.logger().filter("all"), typeof wef.fn.logger(), "filter()");

    equal(typeof wef.fn.logger.filter("all"), typeof wef.fn.logger, "logger.filter()");
});

test("chaining", function() {
    var msg = "qunit testing, don't worry";
    equal(typeof wef.fn.logger().trace(msg).log(msg).debug(msg).info(msg).warn(msg).error(msg).group(msg).groupEnd(msg).filter("all").info(msg), typeof wef.fn.logger(), "logger() chaining calls");
});

test("filter", function() {
    var msg = "qunit testing, don't worry";
    equal(wef.fn.logger().info("filter - message 1").filter("none").info("message 2")._filteredLogs(), 1, "One message has been filtered");
    equal(wef.fn.logger().filter("all").info("message 3")._filteredLogs(), 0, "No messages has been filtered");
});

test("groups", function() {
    var msg = "qunit testing, don't worry";
    equal(wef.fn.logger().info("groups - message 1")._getIndentLevel("default"), 0, "Nesting level 0");
    equal(wef.fn.logger().group().info("message 2")._getIndentLevel("default"), 1, "Nesting level 1");
    equal(wef.fn.logger().group().info("message 3")._getIndentLevel("default"), 2, "Nesting level 2");
    equal(wef.fn.logger().groupEnd()._getIndentLevel("default"), 1, "Nesting level 1");
    equal(wef.fn.logger().groupEnd().info("message 4")._getIndentLevel("default"), 0, "Nesting level 0");

    //works with multiple logger() calls because stores level in logger class
    wef.fn.logger().info("groups 2 - message 1");
    wef.fn.logger().group();
    wef.fn.logger().info("message 2");
    wef.fn.logger().group();
    wef.fn.logger().info("message 3");
    wef.fn.logger().groupEnd();
    wef.fn.logger().groupEnd();
    wef.fn.logger().info("message 4");
    (true,"README: this test needs visual confirmation: message 2 is nested into message 1, message 3 is nested into message 2");
});