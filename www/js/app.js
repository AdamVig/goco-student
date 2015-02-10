var app = angular.module('gocostudent', ['ionic']);

app.run(['$ionicPlatform', function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    if (window.AdMob) {
      AdMob.prepareInterstitial({
        adId: 'ca-app-pub-9660792847854450/1366364053',
        autoShow: false
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
    .state('main', {
      url: '/',
      templateUrl: 'html/main.html',
      controller: 'ChapelCreditController as chapel'
    });

  $urlRouterProvider.otherwise('/');
}]).

constant('ApiUrl', 'http://data.adamvig.com:5000');
