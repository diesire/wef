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
 * Wef logger
 * Copyright (c) 2011 Pablo Escalada
 * MIT Licensed
 */

/**
 * The wef plugins module.
 */
(function () {
    console.info("loading wef.log module...");
    var backend = console;

    var debug = function (message) {
        backend.debug.apply(backend, arguments);
    };

    var error = function (message) {
        backend.error.apply(backend, arguments);
    };

    var info = function (message) {
        backend.info.apply(backend, arguments);
    };

    var warn = function (message) {
        backend.warn.apply(backend, arguments);
    };

    var log = {
        debug:debug,
        info:info,
        warn:warn,
        error:error
    };

    //update namespace
    wef.log = log;
    console.info("wef.log module loaded OK");
})();/*!
 * Wef plugins
 * Copyright (c) 2011 Pablo Escalada
 * MIT Licensed
 */

/**
 * The wef plugins module.
 */
(function () {
    wef.log.info("loading wef.plugins module...");
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
            wef.log.info("registering plugin: ", name);
            if (plugins.registered.hasOwnProperty(name)) {
                wef.log.info("error registering plugin: ", name);
                throw new plugins.AlreadyRegisteredException('Plugin already registered: ' + name);
            }
            if(metadata["init"]===undefined) {
                wef.log.info("error registering plugin: ", name);
                throw new plugins.WrongInterfaceException('Plugin initialization incorrect: ' + name);
            }

            plugins.registered[name] = metadata;
            wef.log.info("initializing plugin: ", name);
            plugins.registered[name].init();
            wef.log.info("plugin ", name, " is ready");
        },

        /**
         * Removes a plugins
         * @param name Plugin name
         * @throws plugins.NotFoundException if the plugin could not be found
         */
        remove:function (name) {
            wef.log.info("removing plugin: ", name);
            if (!plugins.registered.hasOwnProperty(name)) {
                wef.log.info("error removing plugin: ", name);
                throw new plugins.NotFoundException('Plugin not found: ' + name);
            } else {
                delete plugins.registered[name];
            }
            wef.log.info("plugin ", name, " removed");
        }
    };

    //update namespaces
    wef.plugins = plugins;
    wef.fn = plugins.registered;
    wef.log.info("wef.plugins module loaded OK");
})();
