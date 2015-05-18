Oauth Example For Ionic Framework
==============================

Basic example showing how to use ngCordova to authenticate with Facebook, Twitter and Google and retrieve an access token to use with each REST API.
This example is based on [Nic Raboy's post](https://blog.nraboy.com/2015/02/make-facebook-mobile-app-ionic-framework/) and [Simon Reiler's post](http://blog.ionic.io/displaying-the-twitter-feed-within-your-ionic-app/). You can also find sources of Nic's post on [GitHub](https://github.com/nraboy/ng-cordova-facebook-example).


Requirements
-------------

* Apache Cordova 3.5+
* [Apache Cordova InAppBrowser Plugin](http://cordova.apache.org/docs/en/3.0.0/cordova_inappbrowser_inappbrowser.md.html)
* [Apache Cordova White-list Plugin](https://github.com/apache/cordova-plugin-whitelist)
* [ngCordova](http://www.ngcordova.com)
* [jsSHA](https://github.com/Caligatio/jsSHA)


Configuration
-------------

This example application requires you to have you own Facebook, Twitter and Google applications registered with each provider. Doing so will provide you either a client id (Google, Facebook) or a consumer key and consumer secret (Twitter).

When registering each application, make sure to set the callback uri to **http://localhost/callback**, otherwise ngCordova will not function. As this is currently not possible via Twitter, make yourself a [tiny URL](https://tinyurl.com/), and insert that one instead.

With your credentials in hand, open **www/js/app.js** and replace the following lines with your own keys:

    var facebook_client_id = "facebook_clientId";
    var twitter_consumer_key = "twitter_consumerKey";
    var twitter_consumer_secret = "twitter_consumerSecret";
    var google_client_id = "google_clientId";



Resources
-------------

Ionic Framework - [http://www.ionicframework.com](http://www.ionicframework.com)

AngularJS - [http://www.angularjs.org](http://www.angularjs.org)

Apache Cordova - [http://cordova.apache.org](http://cordova.apache.org)

ngCordova - [http://www.ngcordova.com](http://www.ngcordova.com)

Nic Raboy's Code Blog - [https://blog.nraboy.com](https://blog.nraboy.com)
