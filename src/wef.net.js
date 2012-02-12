/*!
 * Wef net module
 * Copyright (c) 2011 Pablo Escalada
 * MIT Licensed
 */
(function (wef) {
    var net;

    /**
     * @namespace
     */
    net = function () {
        return new net.prototype.init();
    };

    net.prototype = {
        constructor:net,
        /**
         * Version number
         */
        version:"0.1.0",
        /**
         * @ignore
         */
        init:function () {
            return this;
        },
        /**
         * Launch an XMLHttpRequest, waiting the result
         * @param url request url
         * @param [options] additional arguments
         * @param {string}options.method request method, supports[get|post]
         * @param {boolean}options.asynchronous request type, synchronous or asynchronous
         * @param {string}options.postBody message, in post request
         * @param {Function}options.success success callback
         * @param {Function}options.failure
         */
        ajax:function (url, options) {
            var request;

            function isSuccessfulRequest(request) {
                return (request.status >= 200 && request.status < 300)
                           || request.status == 304
                    || (request.status == 0 && request.responseText);
            }

            function respondToReadyState() {
                if (request.readyState == 4) {
                    if (isSuccessfulRequest(request)) {
                        if (options.success) {
                            options.success(request);
                        }
                    } else {
                        if (options.failure) {
                            options.failure(request);
                        }
                    }
                }
            }

            function setHeaders() {
                var name, headers = {
                    "Accept":"text/javascript, text/html, application/xml, text/xml, */*"
                };
                for (name in headers) {
                    request.setRequestHeader(name, headers[name]);
                }
            }

            request = xhr();
            if (typeof options === "undefined") {
                options = {};
            }

            //TODO: refactor using wef.fn.extend
            options.method = options.method ? options.method.toLowerCase() : "get";
            options.asynchronous = options.asynchronous!=="undefined" ? options.asynchronous : true;
            options.postBody = options.postBody || "";

            request.onreadystatechange = respondToReadyState;
            request.open(options.method, url, options.asynchronous);
            setHeaders();
            request.send(options.postBody);
        }
    };

    function xhr() {
        if (typeof XMLHttpRequest !== "undefined" && (window.location.protocol !== "file:" || !window.ActiveXObject)) {
            return new XMLHttpRequest();
        } else {
            try {
                return new ActiveXObject("Msxml2.XMLHTTP.6.0");
            } catch (e) {
            }
            try {
                return new ActiveXObject("Msxml2.XMLHTTP.3.0");
            } catch (e) {
            }
            try {
                return new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
            }
        }
        return false;
    }

    /**
     * Extension point
     */
    net.fn = net.prototype;

    net.prototype.init.prototype = net.prototype;

    wef.net = net();

})(window.wef);
