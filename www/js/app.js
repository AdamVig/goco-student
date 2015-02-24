var app = angular.module('gocostudent', ['ionic', 'ngMessages']);

app.run(['$ionicPlatform', function($ionicPlatform) {
  $ionicPlatform.ready(function() {

    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }

    if (window.admob) {
      admob.createBannerView({
        isTesting: false,
        publisherId: "ca-app-pub-9660792847854450/1366364053"
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

constant('DatabaseConstant', {
  'url': 'https://adamvig.cloudant.com',
  'username': 'tedifertordshomilsescepr',
  'password': 'BbvwmD0wrMTJmbF2HMNQRbn1'
}).
constant('ApiUrl', 'http://data.adamvig.com/');
