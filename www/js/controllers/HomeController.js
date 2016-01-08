app.controller('HomeController', ['$rootScope', '$scope', '$state', '$timeout', '$filter', 'DataService', 'ModuleFactory', 'Modules', 'SettingsFactory', function ($rootScope, $scope, $state, $timeout, $filter, DataService, ModuleFactory, Modules, SettingsFactory) {

  var home = this;
  home.hasBanner = false;
  $scope.moduleControl = [];

  // Update selected modules
  home.updateModules = function () {
    ModuleFactory.getSelectedModules().then(function (selectedModules) {

      home.selectedModules = $filter('selectedModules')(Modules, selectedModules);
      return ModuleFactory.getModuleClass();

    }).then(function (moduleClass) {

      home.moduleClass = moduleClass;
      return SettingsFactory.get('loadOnLaunch');

    }).then(function (loadOnLaunch) {
      if (loadOnLaunch === true) {
        home.loadAllModules();
      }
    });
  };

  // Load data in all modules at once
  home.loadAllModules = function () {
    var pauseLengthMs = 500;

    // Load all modules with pauses in between
    // Taken from http://goo.gl/dPtJKM
    (function loadModule(i) {
      $timeout(function () {
        $scope.moduleControl[i](); // Load module

        // Increment i and load next module
        if (++i < $scope.moduleControl.length) {
          loadModule(i);
        }
      }, pauseLengthMs);
    })(0);
  };

  // Start refresh of all data then hide pull to refresh
  home.refresh = function () {
    home.loadAllModules();
    $scope.$broadcast('scroll.refreshComplete');
  };

  $scope.$on('modules:updated', home.updateModules);

  // Update modules on login
  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
    if (fromState.name == 'login') {
      home.updateModules();
      home.loadAllModules();
    }
  });

  $scope.$watch('banner', function () {
    if ($scope.banner) {
      home.hasBanner = true;
    }
  });

  home.updateModules();
}]);
