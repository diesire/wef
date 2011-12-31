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
    equal(typeof wef.fn.logger().trace(msg, ": trace"), typeof wef.fn.logger(), "trace()");
    equal(typeof wef.fn.logger().log(msg, ": log"), typeof wef.fn.logger(), "log()");
    equal(typeof wef.fn.logger().debug(msg, ": debug"), typeof wef.fn.logger(), "debug()");
    equal(typeof wef.fn.logger().info(msg, ": info"), typeof wef.fn.logger(), "info()");
    equal(typeof wef.fn.logger().warn(msg, ": warn"), typeof wef.fn.logger(), "warn()");
    equal(typeof wef.fn.logger().error(msg, ": error"), typeof wef.fn.logger(), "error()");
    equal(typeof wef.fn.logger().group(msg, ": group"), typeof wef.fn.logger(), "group()");
    equal(typeof wef.fn.logger().groupEnd(msg, ": endGroup"), typeof wef.fn.logger(), "groupEnd()");
    equal(typeof wef.fn.logger().off(), typeof wef.fn.logger(), "off()");
    equal(typeof wef.fn.logger().on(), typeof wef.fn.logger(), "on()");

    equal(typeof wef.fn.logger.off(), typeof wef.fn.logger, "logger.off()");
    equal(typeof wef.fn.logger.on(), typeof wef.fn.logger, "logger.on()");
});

test("chaining", function() {
    var msg = "qunit testing, don't worry";
    equal(typeof wef.fn.logger().trace(msg).log(msg).debug(msg).info(msg).warn(msg).error(msg).group(msg).groupEnd(msg).off().on().info(msg), typeof wef.fn.logger(), "logger() chaining calls");
    equal(typeof wef.fn.logger.off().on(), typeof wef.fn.logger, "logger chaining calls");
});

test("on/off", function() {
    var msg = "qunit testing, don't worry";
    wef.fn.logger().info("message 1").off().info("message 2").on().info("message 3");
    ok(true, "README: this test needs visual confirmation. Last messages should be message 1 and message 3, message 2 can't exist");
});

test("groups", function() {
    var msg = "qunit testing, don't worry";
    wef.fn.logger().info("message 1").group().info("message 2").group().info("message 3").groupEnd().groupEnd().info("message 4");
    ok(true, "README: this test needs visual confirmation: message 2 is nested into message 1, message 3 is nested into message 2");
});