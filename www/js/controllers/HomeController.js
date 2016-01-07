app.controller('HomeController', ['$rootScope', '$scope', '$state', '$timeout', 'DataService', 'ModuleFactory', 'PopupService', 'AppInfoRefreshTime', 'SettingsFactory', function ($rootScope, $scope, $state, $timeout, DataService, ModuleFactory, PopupService, AppInfoRefreshTime, SettingsFactory) {

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
    });

    if (SettingsFactory.get('loadOnLaunch') === true) {
      home.loadAllModules();
    }
  };

  // Load data in all modules at once
  home.loadAllModules = function () {
    var delayModuleLoad = 500;
    var i = 0;

    // Load all modules with set delay time in between
    (function loadModule() {
      $timeout(function () {
        if (i < $scope.moduleControl.length) {
          $scope.moduleControl[i]();
          i++;
          loadModule();
        }
      }, delayModuleLoad);
    })();
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

  $scope.popup = PopupService;

  home.updateModules();
}]);
