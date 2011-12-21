/*!
 * Wef
 * Copyright (c) 2011 Pablo Escalada
 * MIT Licensed
 */

/**
 * A private namespace
 */
(function(global) {
    var wef = {
        VERSION: "0.0.1"
    };

    if(global.wef) {
        throw new Error("wef has already been defined");
    } else {
        global.wef = wef;
    }
})(typeof window === 'undefined' ? this : window);
/*!
 * Wef plugins
 * Copyright (c) 2011 Pablo Escalada
 * MIT Licensed
 */

/**
 * The wef plugins module.
 */
(function () {
    var plugins = {
        registered:{},
        AlreadyRegisteredException:Error,
        NotFoundException:Error,
        WrongInterfaceException:Error,

        /**
         * Registers a plugin
         * @param name Plugin name
         * @param metadata The plugin
         * @throws plugins.AlreadyRegisteredException if a plugin with the same name has been registered
         * @throws plugins.WrongInterfaceException if a plugin doesn't have init() method
         */
        register:function (name, metadata) {
            if (plugins.registered.hasOwnProperty(name)) {
                throw new plugins.AlreadyRegisteredException('Plugin already registered: ' + name);
            }
            if(metadata["init"]===undefined) {
                throw new plugins.WrongInterfaceException('Plugin initialization incorrect: ' + name);
            }

            plugins.registered[name] = metadata;
            plugins.registered[name].init();
        },

        /**
         * Removes a plugins
         * @param name Plugin name
         * @throws plugins.NotFoundException if the plugin could not be found
         */
        remove:function (name) {
            if (!plugins.registered.hasOwnProperty(name)) {
                throw new plugins.NotFoundException('Plugin not found: ' + name);
            } else {
                delete plugins.registered[name];
            }
        }
    };

    //update namespaces
    wef.plugins = plugins;
    wef.fn = plugins.registered;
})();
/*!
 * Wef logger
 * Copyright (c) 2011 Pablo Escalada
 * MIT Licensed
 */

/**
 * The wef plugins module.
 */
(function () {
    var backend = console;

    var debug = function (message) {
        backend.debug.apply(this, arguments);
    };

    var error = function (message) {
        backend.error.apply(this, arguments);
    };

    var info = function (message) {
        backend.info.apply(this, arguments);
    };

    var warn = function (message) {
        backend.warn.apply(this, arguments);
    };

    var log = {
        debug:debug,
        info:info,
        warn:warn,
        error:error
    };

    //update namespace
    wef.log = log;
})();