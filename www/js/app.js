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
    .state('home', {
      url: '/',
      templateUrl: 'html/home.html',
      controller: 'HomeController as home'
    })
    .state('mealpoints', {
      url: '/mealpoints',
      templateUrl: 'html/mealpoints.html',
      controller: 'MealPointsController as meal'
    })
    .state('chapelcredit', {
      url: '/chapelcredit',
      templateUrl: 'html/chapelcredit.html',
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
