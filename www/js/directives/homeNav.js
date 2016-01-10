app.directive('homeNav', function () {
  return {
    templateUrl: 'html/directives/_homenav.html',
    controllerAs: 'homeNav',
    controller: ['$rootScope', 'ModuleFactory', function ($rootScope, ModuleFactory) {
      var homeNav = this;

      // Switch which module type is shown
      homeNav.switch = function (moduleType) {
        $rootScope.moduleTypeShown = moduleType;
      };
    }]
  };
});
