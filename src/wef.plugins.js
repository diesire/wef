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

        /**
         * Registers a plugin
         * @param name Plugin name
         * @param metadata The plugin
         * @throws wef.plugins.AlreadyRegisteredException if a plugin with the same name has been registered
         */
        register:function (name, metadata) {
            if (plugins.registered.hasOwnProperty(name)) {
                throw new plugins.AlreadyRegisteredException('Plugin already registered: ' + name);
            }
            plugins.registered[name] = metadata;
            //TODO: register functions, events...
        },

        /**
         * Removes a plugins
         * @param name Plugin name
         * @throws wef.plugins.NotFoundException if the plugin could not be found
         */
        remove:function (name) {
            if (!plugins.registered.hasOwnProperty(name)) {
                throw new plugins.NotFoundException('Plugin not found: ' + name);
            } else {
                delete plugins.registered[name];
                //TODO: delete functions, events...
            }
        }
    };

    //update namespaces
    wef.plugins = plugins;
    wef.fn = plugins.registered; //shortcut, may change plugins.registered to private
})();