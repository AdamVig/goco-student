var app = angular.module('gocostudent', ['ionic', 'ngMessages']);

app.run(['$ionicPlatform', function($ionicPlatform) {
  $ionicPlatform.ready(function() {

    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }

    var admobPublisherId, analyticsId;

    if (ionic.Platform.isIOS()) {
      admobPublisherId = "ca-app-pub-9660792847854450/5221580058";
      analyticsId = "UA-60428326-3";
    } else {
      admobPublisherId = "ca-app-pub-9660792847854450/1366364053";
      analyticsId = "UA-60428326-2";
    }

    if (window.analytics) {
      window.analytics.startTrackerWithId(analyticsId);
    }

    if (window.admob) {
      admob.createBannerView({
        isTesting: false,
        publisherId: admobPublisherId
      });
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
    .state('home', {
      url: '/',
      templateUrl: 'html/home.html',
      controller: 'HomeController as home'
    });

  $urlRouterProvider.otherwise('/');
}]).

constant('DatabaseConstant', {
  'url': 'https://adamvig.cloudant.com',
  'username': 'tedifertordshomilsescepr',
  'password': 'BbvwmD0wrMTJmbF2HMNQRbn1'
}).
constant('ApiUrl', 'http://data.adamvig.com/');
