var facebook_client_id = "facebook_clientId";
var twitter_consumer_key = "twitter_consumerKey";
var twitter_consumer_secret = "twitter_consumerSecret";
var google_client_id = "google_clientId";

angular.module('starter', ['ionic', 'ngCordova', 'ngStorage'])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'LoginController'
      })
      .state('fProfile', {
        url: '/FacebookProfile',
        templateUrl: 'templates/fprofile.html',
        controller: 'FProfileController'
      })
      .state('tProfile', {
        url: '/TwitterProfile',
        templateUrl: 'templates/tprofile.html',
        controller: 'TProfileController'
      })
      .state('gProfile', {
        url: '/GoogleProfile',
        templateUrl: 'templates/gprofile.html',
        controller: 'GProfileController'
      });
  $urlRouterProvider.otherwise('/login');
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller("LoginController", function($scope, $cordovaOauth, $localStorage, $location) {
  $scope.fLogin = function() {
    $cordovaOauth.facebook(facebook_client_id, ["email", "read_stream", "user_website", "user_location", "user_relationships"]).then(function(result) {
      $localStorage.accessToken = result.access_token;
      $location.path("/FacebookProfile");
    }, function(error) {
      alert(error);
    });
  },
  $scope.tLogin = function() {
    $cordovaOauth.twitter(twitter_consumer_key, twitter_consumer_secret).then(function(result) {
      $localStorage.accessToken = result;
      $location.path("/TwitterProfile")
    }, function(error) {
      alert(error);
    });
  },
  $scope.gLogin = function() {
    $cordovaOauth.google(google_client_id, ["email", "profile"]).then(function(result) {
      $localStorage.accessToken = result.access_token;
      $location.path("/GoogleProfile")
    }, function(error) {
      alert(error);
    });
  }
})

.controller("FProfileController", function($scope, $http, $localStorage, $location) {
  $scope.init = function() {
    if($localStorage.hasOwnProperty("accessToken") === true) {
      $http.get("https://graph.facebook.com/v2.2/me", { params: { access_token: $localStorage.accessToken, fields: "id,name,gender,location,website,picture,relationship_status", format: "json" }}).then(function(result) {
        $scope.profileData = result.data;
      }, function(error) {
        alert(error);
      });
    } else {
      alert("Not signed in");
      $location.path("/login");
    }
  };
})

.controller("TProfileController", function($scope, $http, $cordovaOauthUtility, $localStorage, $location) {
  $scope.init = function() {
    if ($localStorage.hasOwnProperty("accessToken") === true) {
      var user_profile_url = 'https://api.twitter.com/1.1/users/show.json';
      var token = $localStorage.accessToken;
      var oauthObject = {
        oauth_consumer_key: twitter_consumer_key,
        oauth_nonce: $cordovaOauthUtility.createNonce(10),
        oauth_signature_method: "HMAC-SHA1",
        oauth_token: token.oauth_token,
        oauth_timestamp: Math.round((new Date()).getTime() / 1000.0),
        oauth_version: "1.0"
      };
      var signatureObj = $cordovaOauthUtility.createSignature('GET', user_profile_url, oauthObject, {user_id : token.user_id}, twitter_consumer_secret, token.oauth_token_secret);
      $http.defaults.headers.common.Authorization = signatureObj.authorization_header;
      $http.get(user_profile_url, { params: { user_id : token.user_id }}).then(function(result) {
        $scope.profileData = result.data;
    }, function(error) {
        alert(error);
      });
    } else {
      alert("Not signed in");
      $location.path("/login");
    }
  }
})

.controller("GProfileController", function($scope, $http, $localStorage, $location) {
  $scope.init = function() {
    if($localStorage.hasOwnProperty("accessToken") === true) {
      $http.get("https://www.googleapis.com/oauth2/v1/userinfo?alt=json", { params: { access_token: $localStorage.accessToken}}).then(function(result) {
        $scope.profileData = result.data;
      }, function(error) {
        alert(error);
      });
    } else {
      alert("Not signed in");
      $location.path("/login");
    }
  };
});
