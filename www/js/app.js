var app = angular.module('gocostudent', ['ionic', 'ngMessages']);

app.run(['$ionicPlatform', function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
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

constant('ApiUrl', 'https://adamvigdata.herokuapp.com/');
