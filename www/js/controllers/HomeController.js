app.controller('HomeController', ['$rootScope', '$scope', '$state', '$timeout', 'ModuleFactory', 'Modules', 'SettingsFactory', 'DbFactory', function ($rootScope, $scope, $state, $timeout, ModuleFactory, Modules, SettingsFactory, DbFactory) {

  var home = this;
  $scope.moduleControl = [];

  // Update selected modules
  home.updateModules = function () {
    ModuleFactory.getModuleSettings().then(function (moduleSettings) {

      home.moduleSettings = moduleSettings;
      return ModuleFactory.getSelectedModuleObjects();

    }).then(function (selectedModuleObjects) {

      home.selectedModules = selectedModuleObjects;
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

  DbFactory.checkCredentials().then(function (loggedIn) {
    if (loggedIn) {
      home.updateModules();
    } else {
      console.error('No saved credentials. Returning to login screen.');
      $state.go('login');
    }
  });
}]);
