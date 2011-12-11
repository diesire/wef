/*!
 * Wef plugins
 * Copyright (c) 2011 Pablo Escalada
 * MIT Licensed
 */

/**
 * The wef plugins module.
 */
(function () {
    var plugins = {};
    plugins.registered = {};
    plugins.AlreadyRegistered = Error;
    plugins.NotFound = Error;

    /**
     * Registers a plugin
     * @param name Plugin name
     * @param metadata The plugin
     * @throws wef.plugins.AlreadyRegistered if a plugin with the same name has been registered
     */
    plugins.register = function (name, metadata) {
        if (plugins.registered.hasOwnProperty(name)) {
            plugins.AlreadyRegistered = new Error('Plugin already registered: ' + name);
            throw plugins.AlreadyRegistered;
        }
        plugins.registered[name] = metadata;
        //TODO: register functions, events...
    };

    /**
     * Removes a plugins
     * @param name Plugin name
     * @throws wef.plugins.NotFound if the plugin could not be found
     */
    plugins.remove = function (name) {
        if (!plugins.registered.hasOwnProperty(name)) {
            throw new plugins.NotFound('Plugin not found: ' + name);
        } else {
            delete plugins.registered[name];
            //TODO: delete functions, events...
        }
    };

    wef.plugins = plugins;
})();