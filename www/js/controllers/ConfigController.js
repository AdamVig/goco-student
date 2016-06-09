app.controller("ConfigController", ["$rootScope", "$scope", "ModuleFactory", "Modules", function ($rootScope, $scope, ModuleFactory, Modules) {
  var config = this;

  config.allModules = Modules;
  config.moduleTypeShown = $rootScope.moduleTypeShown;

  config.selectedModules = [];
  config.checkboxes = {};

  // Update list of selected module endpoint names
  var updateSelectedModules = function () {
    ModuleFactory.getSelectedModules().then(function (selectedModules) {
      config.selectedModules = selectedModules;
    });
  };

  // Add or remove a module from the list of selected modules
  config.updateModules = function (endpoint) {
    var endpointIndex = config.selectedModules.indexOf(endpoint);
    if (endpointIndex === -1) {
      config.selectedModules.push(endpoint);
    } else {
      config.selectedModules.splice(endpointIndex, 1);
    }
    ModuleFactory.updateSelectedModules(config.selectedModules);
  };

  // Tell whether or not an object is selected
  config.isSelected = function (module) {
    return config.selectedModules.indexOf(module) !== -1;
  };

  // Tell whether or not an object is the only selected object
  config.isOnlyModule = function (module) {
    return config.selectedModules.length === 1 && config.isSelected(module);
  };

  updateSelectedModules();
  $scope.$on("modules:typeChanged", function (event, moduleTypeShown) {
    config.moduleTypeShown = moduleTypeShown;
    updateSelectedModules();
  });
}]);
