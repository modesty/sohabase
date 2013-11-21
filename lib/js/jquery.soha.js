/*!
 * Web App Common Tasks by jQuery
 * https://github.com/modesty/sohabase
 * http://www.codeproject.com/Articles/110076/Web-App-Common-Tasks-by-jQuery
 * Copyright 2013 Modesty Zhang
 * Released under the MIT license
 */

(function (factory) {
    "use strict";
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as anonymous module.
        var deps = ['underscore', 'jStorage'];
        if (!jQuery) {//some apps load jquery from CDN, not AMD
            deps.push('jquery');
        }
        define(deps, function(_){factory(_, jQuery);});
    } else { // Browser globals.
		factory(_, jQuery);
	}
}(function (_, $) {
    "use strict";

    var console = (window.console = window.console || {});
    if (!console.log) {
        console.log = function () {};
    }

    var genericErrorMsg = "Sorry, we're experiencing some issues right now. Please try again later.";
    var genericErrorService = "Sorry, we're in the middle of maintenance. Please try again later.";
    var SvcHelper = function(onSuccess, onError) {
        this.deferred = new $.Deferred();
        this.onSuccess = onSuccess;
        this.onError = onError;
    };

    //public static methods
    SvcHelper.getXHRErrorMsg = function(xhr) {
        var errMsg = genericErrorMsg;
        try {errMsg = $(xhr.responseText || xhr.statusText).text();}catch(err) {errMsg = genericErrorMsg;}
        return errMsg;
    };
    SvcHelper.getXHRStatusCode = function(xhr) {
        var statusCode = 709;
        try {if (xhr.status !== 200) {statusCode = xhr.status;}}catch(e){statusCode = 709;}
        return statusCode;
    };
    SvcHelper.getXHRErrorObj = function(xhr) {
        return {message: SvcHelper.getXHRErrorMsg(xhr), code: SvcHelper.getXHRStatusCode(xhr)};
    };
    SvcHelper.getResponseMsg = function(response){
        var errMsg = genericErrorService;
        try {errMsg = response.status.message;}catch(e){errMsg = genericErrorService;}
        return errMsg;
    };
    SvcHelper.getResponseCode = function(response){
        var errCode = 708;
        try {errCode = response.status.code;}catch(e){errCode = 708;}
        return errCode;
    };
    SvcHelper.getResponseErrorObj = function(response) {
        return {message: SvcHelper.getResponseMsg(response), code: SvcHelper.getResponseCode(response)};
    };
    SvcHelper.isBadResponse = function (response) {
        var responseCode = SvcHelper.getResponseCode(response);
        return (responseCode > 202 || responseCode < 200);
    };

    //public instance methods
    SvcHelper.prototype.promise = function() {
        return this.deferred.promise();
    };
    SvcHelper.prototype.onResponse = function(response, text, xhr) {
        if (SvcHelper.isBadResponse(response)) {
            var errObj = SvcHelper.getResponseErrorObj(response);
            if (_.isFunction(this.onError)) {
                _.defer(this.onError, errObj);
            }
            this.deferred.reject(errObj);
        }
        else {
            if (_.isFunction(this.onSuccess)) {
                _.defer(this.onSuccess, response);
            }
            this.deferred.resolve(response);
        }
    };

    SvcHelper.prototype.onXHRError = function(xhr, textStatus, errorThrown) {
        var errObj = SvcHelper.getXHRErrorObj(xhr);
        if (_.isFunction(this.onError)) {
            _.defer(this.onError, errObj);
        }
        this.deferred.reject(errObj);
    };

    var cls = function () {
        // static class with static methods, should never get called
    };

    // public static
    cls.SvcBase = SvcHelper;
    cls.isDirty = false;
    cls.refreshContent = function () {
        cls.isDirty = false;
        window.location.reload(true);
    };

    cls.navigate = function(newURL) {
        window.location.href = newURL;
    };

    cls.setDirtyFlag = function (docDirty) {
        $(window).unbind('beforeunload', cls.confirmExit);
        if (cls.isDirty) {
            $(window).bind('beforeunload', cls.confirmExit);
        }
    };

    cls.confirmExit = function() {
        if (cls.isDirty) {
            return "Are you sure you want to leave this page? If you haven't saved your info, it could be lost.";
        }
    };

    cls.onUnloadPage = function () {
    };

    cls.getPageName = function () {
        var retVal = '';
        var requestedPage = window.location.pathname;
        var pathParts = requestedPage.split('/');
        var pathPartsLength = pathParts.length;

        if (pathPartsLength > 1) {
            retVal = pathParts[pathPartsLength - 1];
            if (!retVal) {
                retVal = pathParts[pathPartsLength - 2];
            }
        }

        if (!retVal || retVal === 'zh-cn') {
            retVal = "index";
        }

        return retVal;
    };

    cls.getPathName = function () {
        var requestedPage = window.location.pathname;
        var endIdx = requestedPage.lastIndexOf("/");
        var pathStr = requestedPage.substring(1, endIdx);

        if (pathStr === '/') {
            pathStr = 'home';
        }

        return pathStr.replace(/\//g, '_');
    };

    cls.loadPageScript = function(jsUrl, onSuccess, onError) {
        $.ajax({
            type: "GET",
            url: jsUrl,
            dataType: "script",
            cache: true,
            timeout: 90000,
            success: onSuccess, //Function( PlainObject data, String textStatus, jqXHR jqXHR )
            error: onError //Function( jqXHR jqXHR, String textStatus, String errorThrown )
        });
    };

    cls.loadPageCSS = function (cssUrl, noVerInfo) {
        var preLink = $('head').find('link[href^="' + cssUrl + '"]');
        if (preLink.length > 0) {
            preLink.remove();
            preLink = null;
        }

        var hrefStr = cssUrl;
        if (!_.isBoolean(noVerInfo) || (noVerInfo === false)) {
            hrefStr += cls.getVerInfoQueryString();
        }

        $('<link>').appendTo('head').attr({
            rel: "stylesheet",
            type: "text/css",
            href: hrefStr
        });
    };

    cls.loadContentHTML = function (containerID, htmlURL, onResult) {
        $('#' + containerID).load(htmlURL, null, onResult);
    };

    cls.loadTemplateNData = function (jsonURL, templateURL, onResult) {
        function onSuccessRes(jsonRes, templateRes) {
            var json = _.first(jsonRes);
            var template = _.first(templateRes);
            onResult(json, template);
        }

        function onErrorRes(err) {
            console.log('failed to load template and data!' + err);
        }

        $.when(
            $.ajax(jsonURL),
            $.ajax(templateURL)
        ).then(onSuccessRes, onErrorRes);
    };

    cls.isCookieEnabled = function () {
        // Quick test if browser has cookieEnabled host property
        if (navigator.cookieEnabled) {
            return true;
        }
        // Create cookie
        document.cookie = "cookieTest=1";
        var ret = document.cookie.indexOf("cookieTest=") !== -1;
        // Delete cookie
        document.cookie = "cookieTest=1; expires=Thu, 01-Jan-1970 00:00:01 GMT";
        return ret;
    };

    cls.getQueryString = function () {
        var qs = window.location.search;
        if (qs.length <= 1) {
            return null;
        }

        qs = qs.substring(1, qs.length);
        var a = qs.split("&");
        var i, b = {};
        for (i = 0; i < a.length; ++i) {
            var p = a[i].split('=');
            b[p[0]] = decodeURIComponent(p[1]);
        }
        return b;
    };

    cls.getHashString = function() {
        var hs = window.location.hash;
        if (!!hs) {
            var qp = hs.indexOf('?');
            if (qp > 0) {
                hs = hs.substr(0, qp);
            }
        }
        else {
            hs = "";
        }
        return hs;
    };

    cls.xMethods = ["GET", "PUT", "DELETE"];
    cls.postJson = function (postURL, jsDataObj, onSuccess, onError, httpMethodOverride) {
        var beforeSendCallback = function (xhr) {
            xhr.withCredentials = true;
            if (_.indexOf(cls.xMethods, httpMethodOverride) >= 0) {
                xhr.setRequestHeader("X-HTTP-Method-Override", httpMethodOverride);
            }
        };

        var svcHelper = new SvcHelper(onSuccess, onError);

        $.ajax({
            type:"POST",
            beforeSend:beforeSendCallback,
            contentType:"application/json",
            dataType:"json",
            timeout: 90000,
            cache: false,
            url:postURL,
            data: JSON.stringify(jsDataObj),
            async:true
        }).then(_.bind(svcHelper.onResponse, svcHelper), _.bind(svcHelper.onXHRError, svcHelper));

        return svcHelper.promise();
    };

    var _sessionItems = {};
    cls.setSessionStorageItem = function(key, strVal) {
        //HTML5 sessionStorage doesn't persist across browser tabs, use localStorage for cross-session non-expire data
        $.jStorage.set(key, strVal);
        _sessionItems[key] = strVal;
    };

    cls.getSessionStorageItem = function(key) {
        if (!_sessionItems[key]) {
            _sessionItems[key] = $.jStorage.get(key);
        }
        return _sessionItems[key];
    };

    cls.clearSessionStorageItem = function(key) {
        $.jStorage.deleteKey(key);
        _sessionItems[key] = undefined;
    };

    cls.resetSessionStorage = function() {
        for (var key in _sessionItems) {
            if (_sessionItems.hasOwnProperty(key)) {
                $.jStorage.deleteKey(key);
            }
        }
        _sessionItems = {};
    };

    cls.getDeviceId = function() {
        var _deviceKey = "sohaDeviceID";
        var dId = $.jStorage.get(_deviceKey);
        if (!dId) {
            dId = Math.random() * 1000000000000;
            $.jStorage.set(_deviceKey, dId);
        }
        return dId;
    };

    cls.getRequireJSConfig = function() {
        if (_.isObject(window.requirejs) && _.has(window.requirejs, 's')) {
            return window.requirejs.s.contexts._.config;
        }

        return undefined;
    };

    cls.getVerInfoQueryString = function() {
        var verQS = "?";
        var jsConf = cls.getRequireJSConfig();
        if (_.isObject(jsConf) && _.has(jsConf,"urlArgs")){
            verQS += jsConf.urlArgs;
        }
        else {
            verQS += "v=0.0.0";
        }
        return verQS;
    };

    cls.createjQueryObject = function(htmlString) {
        return $('<div/>').html(htmlString).contents();
    };

    $(window).bind('unload', function (evt) {
        cls.onUnloadPage();
    });

    $.soha = cls;

}));
