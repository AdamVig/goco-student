app.directive('homeNav', function () {
  return {
    templateUrl: 'html/directives/_homenav.html',
    controllerAs: 'homeNav',
    controller: ['ModuleFactory', function (ModuleFactory) {
      var homeNav = this;

      // Switch which module type is shown
      homeNav.switch = function (moduleType) {
        ModuleFactory.changeModuleTypeShown(moduleType);
      };

      // Get whether or not module type is shown
      homeNav.isShown = function (moduleType) {
        return ModuleFactory.isModuleTypeShown(moduleType);
      };
    }]
  };
});
