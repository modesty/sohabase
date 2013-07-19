sohabase
======

A jQuery Plugin for [Service Oriented HTML Application](http://www.codeproject.com/Articles/118683/SOHA-Service-Oriented-HTML-Application-Concepts-an), and [Web App Common Tasks](http://www.codeproject.com/Articles/110076/Web-App-Common-Tasks-by-jQuery).

##Installation


          git clone https://github.com/modesty/sohabase

##Dependencies

          "jquery" : ">=1.9.0",
          "underscore": ">=1.4.2"

##Main Features

###Extended Ajax With Response Parser
* loadContentHTML : function (containerID, htmlURL, onResult)
* loadTemplateNData : function (jsonURL, templateURL, onResult)
* postJson : function (postURL, jsDataObj, onSuccess, onError, httpMethodOverride)

###HTML5 Session Storage
* setSessionStorageItem : function(key, strVal)
* getSessionStorageItem : function(key)
* clearSessionStorageItem : function(key)

###URL Parser
* getQueryString : function ()
* getHashString : function()
* getPathName: function()
* getPageName: function()

###Cookie Detector
* isCookieEnabled : function ()

###Dynamica Loading Script and CSS
* loadPageScript : function(jsUrl, onSuccess, onError)
* loadPageCSS : function (cssUrl, noVerInfo)

###Warn the User Before Navigate
* setDirtyFlag : function (docDirty)
* confirmExit : function ()
* refreshContent : function ()
* navigate : function(newURL)

##More Info

[Sample App](http://www.hanray.com/sites/WebAppCommonTasksByjQuery/)
[Web App Common Tasks by jQuery](http://www.codeproject.com/Articles/110076/Web-App-Common-Tasks-by-jQuery)
[SOHA - Service Oriented HTML Application (Concepts and Principles)](http://www.codeproject.com/Articles/118683/SOHA-Service-Oriented-HTML-Application-Concepts-an)
