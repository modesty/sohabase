sohabase
======

A jQuery Plugin for [Service Oriented HTML Application](http://www.codeproject.com/Articles/118683/SOHA-Service-Oriented-HTML-Application-Concepts-an), and [Web App Common Tasks](http://www.codeproject.com/Articles/110076/Web-App-Common-Tasks-by-jQuery).

##Installation

          git clone https://github.com/modesty/sohabase

##Dependencies

          "jquery" : ">=1.9.0",
          "underscore": ">=1.4.2"

##Main Features

###Extended Ajax for page content and service integration
* Ajax Content: dynamic loading/assembling page content

          $.soha.loadContentHTML : function (containerID, htmlURL, onResult)

* Ajax Content and templating: dynamically loading data driven (json) content, depends on underscore's template to generate final output

          $.soha.loadTemplateNData : function (jsonURL, templateURL, onResult)

* Ajax with httpMethodOverride and response/error parsering

          $.soha.postJson : function (postURL, jsDataObj, onSuccess, onError, httpMethodOverride)

* Dynamically loading page script

          $.soha.loadPageScript : function(jsUrl, onSuccess, onError)

* Dynamically loading page CSS

          $.soha.loadPageCSS : function (cssUrl, noVerInfo)


###HTML5 Session Storage
* Create string value to session storage with key

          $.soha.setSessionStorageItem : function(key, strVal)

* Read string value from session storage by key

          $.soha.getSessionStorageItem : function(key)

* Delete string value from session storage by key

          $.soha.clearSessionStorageItem : function(key)

###URL Parser
* Return an object hash for query string name-value pairs or null if no query string in current url

          $.soha.getQueryString : function ()

* Return hash string, handling query string in url as well

          $.soha.getHashString : function()

* Return current url's path (without host), handles default path for home path

          $.soha.getPathName: function()

* Return current page name base on url path, handles default page for index.html

          $.soha.getPageName: function()

###Detectors
* Detect user's browser's cookie without depending on other plugins

          $.soha.isCookieEnabled : function ()

          //In lib/css/jquery.sohabase.css:

          html.no-cookies #contentContainer:before {
             content: "You don't have browser cookie enabled. In order to view our website, enable Cookie in your browser settings and then refresh this page.";
          }


* CSS based JavaScript detector, see lib/css/jquery.sohabase.css for details

          html.no-js #contentContainer:before, html.no-cookies #contentContainer:before, .errorMsgBox {
             content: "You don't have JavaScript enabled. In order to view our website, enable JavaScript in your browser settings and then refresh this page.";
             display: block;
             border: solid 2px red;
             padding: 10px;
             margin: 10px;
             color: maroon;
             font-size: 1.2em;
             background-color: #ffffe0;
             -moz-border-radius: 10px;
             -webkit-border-radius: 10px;
             border-radius: 10px;
          }


###Warn the User Before Navigate
* Call with docFirty to be true to warn user when navigate away from current page or shutting down browser

          $.soha.setDirtyFlag : function (docDirty)

* Default event handler when user navigate away

          $.soha.confirmExit : function ()

* Refresh current page regardless docDirty flag

          $.soha.refreshContent : function ()

* Navigate to new url with full control of url and docDirty flag

          $.soha.navigate : function(newURL)

##More Info

[Sample App](http://www.hanray.com/sites/WebAppCommonTasksByjQuery/)

[Web App Common Tasks by jQuery](http://www.codeproject.com/Articles/110076/Web-App-Common-Tasks-by-jQuery)

[SOHA - Service Oriented HTML Application (Concepts and Principles)](http://www.codeproject.com/Articles/118683/SOHA-Service-Oriented-HTML-Application-Concepts-an)
