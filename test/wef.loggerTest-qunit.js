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
});

test("public properties", function() {
    equal(typeof wef.fn.logger().version, "string", "wef.logger().version");
});

test("pubic methods", function() {
    var msg = "qunit testing, don't worry";
    equal(typeof wef.fn.logger().log(msg, ": log"), "object", "log()");
    equal(typeof wef.fn.logger().trace(msg, ": trace"), "object", "trace()");
    equal(typeof wef.fn.logger().group(msg, ": group"), "object", "error()");
    equal(typeof wef.fn.logger().debug(msg, ": debug"), "object", "debug()");
    equal(typeof wef.fn.logger().info(msg, ": info"), "object", "info()");
    equal(typeof wef.fn.logger().warn(msg, ": warn"), "object", "warn()");
    equal(typeof wef.fn.logger().error(msg, ": error"), "object", "error()");
    equal(typeof wef.fn.logger().endGroup(msg, ": endGroup"), "object", "error()");
});

test("chaining", function() {
    var msg = "qunit testing, don't worry";
    equal(typeof wef.fn.logger().debug(msg).group(msg).info(msg).endGroup(msg).warn(msg).error(msg), "object", "chaining calls");
});