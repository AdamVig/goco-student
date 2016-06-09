var app = angular.module("gocostudent", ["ionic", "ngMessages", "sc.twemoji", "ngIOS9UIWebViewPatch"]);

app.run(["$ionicPlatform", "$rootScope", function($ionicPlatform, $rootScope) {

  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
  });

  // Set default view
  $rootScope.moduleTypeShown = "info";
}]).

config(["$stateProvider", "$urlRouterProvider", "twemojiProvider", function($stateProvider, $urlRouterProvider, twemojiProvider) {
  $stateProvider
    .state("login", {
      url: "/login",
      templateUrl: "html/login.html",
      controller: "LoginController as login"
    })
    .state("privacyPolicy", {
      url: "/privacypolicy",
      templateUrl: "html/privacypolicy.html",
      controller: "PrivacyPolicyController as privacyPolicy"
    })
    .state("moduleView", {
      url: "/moduleview/:endpoint?icon&color&label",
      templateUrl: "html/moduleview.html",
      controller: "ModuleViewController as moduleView"
    })
    .state("options", {
      url: "/options",
      templateUrl: "html/options.html",
      controller: "OptionsController as options"
    })
    .state("home", {
      url: "/",
      templateUrl: "html/home.html",
      controller: "HomeController as home"
    });

  twemojiProvider.setOptions({
    base: "lib/twemoji/",
    ext: ".svg",
    size: "svg"
  });

  $urlRouterProvider.otherwise("/");
}]);
