var app = angular.module('gocostudent', ['ionic', 'ngMessages']);

app.run(['$ionicPlatform', 'StorageService', 'AppVersion', function($ionicPlatform, StorageService, AppVersion) {
  $ionicPlatform.ready(function() {

    var storedAppVersion = StorageService.retrieveAppVersion();

    // Reset stored data and force user to re-login if app is updated
    if (storedAppVersion != AppVersion) {
      console.info("App version mismatch.");
      StorageService.eraseCredentials();
      StorageService.eraseModules();
    }

    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }

    if (window.analytics) {
      window.analytics.startTrackerWithId(analyticsId);
    }
  });
}]).

config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'html/login.html',
      controller: 'LoginController as login'
    })
    .state('postLogin', {
      url: '/postlogin',
      templateUrl: 'html/postlogin.html',
      controller: 'PostLoginController as postLogin'
    })
    .state('home', {
      url: '/',
      templateUrl: 'html/home.html',
      controller: 'HomeController as home'
    });

  $urlRouterProvider.otherwise('/');
}]);
