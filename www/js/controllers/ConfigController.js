app.controller('ConfigController', ['$rootScope', '$filter', 'ModuleFactory', 'Modules', function ($rootScope, $filter, ModuleFactory, Modules) {
  var config = this;

  config.allModules = Modules;

  config.selectedModuleObjects = [];
  config.selectedModules = [];
  config.checkboxes = {};

  var updateSelectedModuleObjects = function () {
    config.selectedModuleObjects = $filter('selectedModules')(config.allModules,
        config.selectedModules);
  };

  var updateSelectedModules = function () {
    config.moduleTypeShown = $rootScope.moduleTypeShown;
    ModuleFactory.getSelectedModules().then(function (selectedModules) {
      config.selectedModules = selectedModules;
      updateSelectedModuleObjects();
    });
  };

  updateSelectedModules();

  config.updateModules = function (endpoint) {
    var endpointIndex = config.selectedModules.indexOf(endpoint);
    if (endpointIndex == -1) {
      config.selectedModules.push(endpoint);
    } else {
      config.selectedModules.splice(endpointIndex, 1);
    }
    updateSelectedModuleObjects();
    ModuleFactory.updateSelectedModules(config.selectedModules);
  };

  config.isSelected = function (module) {
    return config.selectedModuleObjects.indexOf(module) != -1;
  };

  config.isOnlyModule = function (module) {
    return config.selectedModules.length == 1 && config.isSelected(module);
  };

  $rootScope.$on('modules:updated', updateSelectedModules);

}]);
