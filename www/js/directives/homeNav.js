app.directive("homeNav", function () {
  return {
    templateUrl: "html/directives/_homenav.html",
    controllerAs: "homeNav",
    controller: ["$rootScope", function ($rootScope) {
      var homeNav = this;

      // Switch which module type is shown
      homeNav.switch = function (moduleType) {
        $rootScope.moduleTypeShown = moduleType;
        $rootScope.$broadcast("modules:typeChanged", moduleType);
      };
    }]
  };
});
