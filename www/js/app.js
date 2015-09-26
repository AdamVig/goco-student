var app = angular.module('gocostudent', ['ionic', 'ngMessages', 'sc.twemoji', 'ngIOS9UIWebViewPatch']);

app.run(['$ionicPlatform', 'StorageService', 'AppVersion', function($ionicPlatform, StorageService, AppVersion) {
  $ionicPlatform.ready(function() {

    var storedAppVersion = StorageService.get('version');
    var analyticsID;

    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }

    if (ionic.Platform.isIOS()) {
      analyticsId = "UA-60428326-3";
    } else {
      analyticsId = "UA-60428326-2";
    }

    if (window.analytics) {
      window.analytics.startTrackerWithId(analyticsID);
    }
  });
}]).

config(['$stateProvider', '$urlRouterProvider', 'twemojiProvider', function($stateProvider, $urlRouterProvider, twemojiProvider) {
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'html/login.html',
      controller: 'LoginController as login'
    })
    .state('privacyPolicy', {
      url: '/privacypolicy',
      templateUrl: 'html/privacypolicy.html',
      controller: 'PrivacyPolicyController as privacyPolicy'
    })
    .state('moduleView', {
      url: '/moduleview/:endpoint',
      templateUrl: 'html/moduleview.html',
      controller: 'ModuleViewController as moduleView'
    })
    .state('home', {
      url: '/',
      templateUrl: 'html/home.html',
      controller: 'HomeController as home'
    });

  twemojiProvider.setOptions({
    base: '/lib/twemoji/',
    ext: '.svg',
    size: 'svg'
  });

  $urlRouterProvider.otherwise('/');
}]);
