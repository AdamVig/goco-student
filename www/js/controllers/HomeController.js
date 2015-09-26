app.controller('HomeController', ['$scope', '$state', '$timeout', 'DataService', 'ModuleFactory', 'PopupService', 'StorageService', 'AppInfoRefreshTime', 'AppVersion', function ($scope, $state, $timeout, DataService, ModuleFactory, PopupService, StorageService, AppInfoRefreshTime, AppVersion) {

  var home = this;
  home.hasBanner = false;
  $scope.moduleControl = [];

  // Update selected modules
  home.updateModules = function () {
    home.selectedModules = ModuleFactory.getSelectedModules();
    home.moduleClass = ModuleFactory.getModuleClass();
    home.scrollEnabled = ModuleFactory.getScrollEnabled();
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
