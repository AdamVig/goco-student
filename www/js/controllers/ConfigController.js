app.controller('ConfigController', ['$rootScope', '$filter', 'ModuleFactory', 'Modules', function ($rootScope, $filter, ModuleFactory, Modules) {
  var config = this;

  config.allModules = Modules;
  config.moduleTypeShown = $rootScope.moduleTypeShown;
  
  config.selectedModuleObjects = [];
  config.selectedModules = [];
  config.checkboxes = {};

  var updateSelectedModuleObjects = function () {
    config.selectedModuleObjects = $filter('selectedModules')(config.allModules,
        config.selectedModules);
  };

  var dataPromise = ModuleFactory.getSelectedModules().then(function (selectedModules) {
    config.selectedModules = selectedModules;
    updateSelectedModuleObjects();
  });

  config.updateModules = function (endpoint) {
    if (config.checkboxes[endpoint] === true) {
      config.selectedModules.push(endpoint);
    } else {
      var endpointIndex = config.selectedModules.indexOf(endpoint);
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

}]);
