/*!
 * wef.logger tests
 * Copyright (c) 2011 Pablo Escalada
 * MIT Licensed
 */
module("logger");

test("namespace", function () {
    notEqual(wef.logger, undefined, "is wef.logger namespace defined?");
    equal(typeof wef.logger, "function", "is wef.logger a function?");
});

test("wef.logger.fn", function () {
    notEqual(wef.logger.fn, undefined, "is wef.logger.fn defined ?");
});

test("constructor", function () {
    equal(typeof wef.logger(), "object", "empty constructor returns an object");
    equal(typeof wef.logger("test"), "object", "empty constructor returns an object");
});

test("public properties", function () {
    equal(typeof wef.logger().version, "string", "wef.logger().version");
    equal(wef.logger.version, undefined, "NO wef.logger.version");
    equal(typeof wef.logger.fn.version, "string", "wef.logger.fn.version");
    equal(wef.logger.LOGLEVEL, undefined, "NO wef.logger.LOGLEVEL");
    equal(wef.logger().LOGLEVEL, undefined, "NO wef.logger().LOGLEVEL");
    equal(typeof wef.logger.fn.loglevel.all, "number", "wef.logger.fn.loglevel.all");
    equal(typeof wef.logger().loglevel.all, "number", "wef.logger().loglevel.all");
});

test("pubic methods", function () {
    var msg = "qunit testing, don't worry";
    deepEqual(wef.logger().trace(), wef.logger(), "trace()");
    deepEqual(wef.logger().log(), wef.logger(), "log()");
    deepEqual(wef.logger().debug(msg, ": debug"), wef.logger(), "debug()");
    deepEqual(wef.logger().info(msg, ": info"), wef.logger(), "info()");
    deepEqual(wef.logger().warn(msg, ": warn"), wef.logger(), "warn()");
    deepEqual(wef.logger().error(msg, ": error"), wef.logger(), "error()");
    deepEqual(wef.logger().group(msg, ": group"), wef.logger(), "group()");
    deepEqual(wef.logger().groupEnd(msg, ": endGroup"), wef.logger(), "groupEnd()");
    deepEqual(wef.logger().filter("all"), wef.logger(), "filter()");

    equal(wef.logger.filter, undefined, "NO logger.filter()");
    deepEqual(wef.logger.fn.filter("all"), wef.logger.fn, "logger.fn.filter()");
    deepEqual(wef.logger().filter({logLevel:wef.logger.fn.loglevel.all, pattern:".*"}), wef.logger(), "logger().filter()");
});

test("chaining", function () {
    var msg = "qunit testing, don't worry";
    equal(typeof wef.logger().trace(msg).log(msg).debug(msg).info(msg).warn(msg).error(msg).group(msg).groupEnd(msg).filter("all").info(msg), typeof wef.logger(), "logger() chaining calls");
});

test("filter", function () {
    equal(wef.logger().info("filter - message 1").filter("none").info("message 2")._filteredLogs(), 1, "One message has been filtered");
    equal(wef.logger().filter("all").info("message 3")._filteredLogs(), 0, "No messages has been filtered");
});

test("groups", function () {
    equal(wef.logger().info("groups - message 1")._getIndentLevel("default"), 0, "Nesting level 0");
    equal(wef.logger().group().info("message 2")._getIndentLevel("default"), 1, "Nesting level 1");
    equal(wef.logger().group().info("message 3")._getIndentLevel("default"), 2, "Nesting level 2");
    equal(wef.logger().groupEnd()._getIndentLevel("default"), 1, "Nesting level 1");
    equal(wef.logger().groupEnd().info("message 4")._getIndentLevel("default"), 0, "Nesting level 0");

    //TODO: add test for mixed loggers
});