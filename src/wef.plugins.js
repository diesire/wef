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
    plugins.AlreadyRegisteredException = Error;
    plugins.NotFoundException = Error;

    /**
     * Registers a plugin
     * @param name Plugin name
     * @param metadata The plugin
     * @throws wef.plugins.AlreadyRegisteredException if a plugin with the same name has been registered
     */
    plugins.register = function (name, metadata) {
        if (plugins.registered.hasOwnProperty(name)) {
            throw new plugins.AlreadyRegisteredException('Plugin already registered: ' + name);
        }
        plugins.registered[name] = metadata;
        //TODO: register functions, events...
    };

    /**
     * Removes a plugins
     * @param name Plugin name
     * @throws wef.plugins.NotFoundException if the plugin could not be found
     */
    plugins.remove = function (name) {
        if (!plugins.registered.hasOwnProperty(name)) {
            throw new plugins.NotFoundException('Plugin not found: ' + name);
        } else {
            delete plugins.registered[name];
            //TODO: delete functions, events...
        }
    };

    wef.plugins = plugins;
})();