app.controller('ConfigController', ['$rootScope', '$filter', 'ModuleFactory', 'Modules', function ($rootScope, $filter, ModuleFactory, Modules) {
  var config = this;

  config.allModules = Modules;

  config.selectedModuleObjects = [];
  config.selectedModules = [];
  config.checkboxes = {};

  // Update list of module definitions from constant
  var updateSelectedModuleObjects = function () {
    config.selectedModuleObjects = $filter('selectedModules')(config.allModules,
        config.selectedModules);
  };

  // Update list of selected module endpoint names
  var updateSelectedModules = function () {
    config.moduleTypeShown = $rootScope.moduleTypeShown;
    ModuleFactory.getSelectedModules().then(function (selectedModules) {
      config.selectedModules = selectedModules;
      updateSelectedModuleObjects();
    });
  };

  updateSelectedModules();

  // Add or remove a module from the list of selected modules
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

  // Tell whether or not an object is selected
  config.isSelected = function (module) {
    return config.selectedModuleObjects.indexOf(module) != -1;
  };

  // Tell whether or not an object is the only selected object
  config.isOnlyModule = function (module) {
    return config.selectedModules.length == 1 && config.isSelected(module);
  };

  // Update modules when moduleTypeShown changes
  $rootScope.$on('modules:updated', updateSelectedModules);
}]);
