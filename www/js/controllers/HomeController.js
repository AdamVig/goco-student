app.controller('HomeController', ['$rootScope', '$scope', '$state', '$timeout', 'DataService', 'ModuleFactory', 'PopupService', 'StorageService', 'AppInfoRefreshTime', 'AppVersion', 'SettingsFactory', function ($rootScope, $scope, $state, $timeout, DataService, ModuleFactory, PopupService, StorageService, AppInfoRefreshTime, AppVersion, SettingsFactory) {

  var home = this;
  home.hasBanner = false;
  $scope.moduleControl = [];

  // Update selected modules
  home.updateModules = function () {
    home.selectedModules = ModuleFactory.getSelectedModules();
    home.moduleClass = ModuleFactory.getModuleClass();
    home.scrollEnabled = ModuleFactory.getScrollEnabled();
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

  $scope.$on('modules:updated', home.updateModules);

  // Update modules on login
  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
    if (fromState.name == 'login') {
      ModuleFactory.updateModules();
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

  // Reset scope if user is logged in
  if (StorageService.retrieveCredentials()) {
    home.updateModules();
    home.loadAllModules();
  } else {
    $state.go('login');
  }
}]);
