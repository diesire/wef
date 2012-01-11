About Wef
=========

Wef is a Web Extensions Framework

*   License: [MIT License](https://github.com/diesire/wef/blob/master/LICENSE.txt)
*   Tests: [test](https://github.com/diesire/wef/tree/master/test)

Features
--------
*   Educational purposes: Because I'm learning JavaScript and `Hello, world! is mainstream.
*   Work in progress: You know, forever beta stage.
*   Eating your own dog food: Wef is used in my awesome
    [CSS Template Layout Module](https://github.com/diesire/cssTemplateLayout).
*   Plain JavaScript, no third party libraries: OK, Wef uses [JSCSSP](http://glazman.org/JSCSSP/), but no jQuery or
    other libraries.
*   Modular and extensible with plugins

Development
-----------

To build wef

    make build

For testing, wef uses [Qunit](http://docs.jquery.com/QUnit)

*   Open `test/test.html` in your browser

Changelog
---------

####v0.2####

*   Add more tests
*   Fix cssParser.callbacks persistence error
*   Unify wef.module.fn API (version, filter, loglevel)
*   Fix wef.fn.extend
*   Clean cssParser log messages
*   Delete log.filter call in cssParser

####v0.1####

*   First release
