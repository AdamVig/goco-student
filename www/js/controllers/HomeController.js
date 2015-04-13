app.controller('HomeController', ['$rootScope', '$scope', '$state', '$window', '$filter', 'Modules', 'DatabaseFactory', 'DataService', 'ModalService', 'ModuleService', 'PopoverService', 'LogoutService', 'StorageService', function ($rootScope, $scope, $state, $window, $filter, Modules, DatabaseFactory, DataService, ModalService, ModuleService, PopoverService, LogoutService, StorageService) {

  var home = this;

  // Refresh banner message
  home.refreshBanner = function () {
    DataService.getAppInfo().then(function (appInfo) {
      $scope.banner = appInfo.banner;
      home.appInfo = appInfo;
    });
  };

  // Instantiate/reset scope variables
  home.resetScope = function () {

    home.loading = {};
    home.errorMessage = {};
    home.mealPoints = null;
    home.chapelCredits = {};
    home.userCredentials = StorageService.retrieveCredentials();

    // Module settings
    $scope.modules = StorageService.retrieveModules();

    // Go to login page if no user credentials found
    if (!home.userCredentials) {
      $state.go('login');

    // Otherwise get stored modules or create new defaults
    } else {

      // No stored modules: set to default and show configuration
      if (!$scope.modules) {
        $scope.modules = Modules;
        $scope.modal.showModal('configuration');

      // Stored modules: reconcile with default modules and store again
      } else {
        $scope.modules = ModuleService.updateDefaultModules($scope.modules);
        StorageService.storeModules($scope.modules);
      }
      $scope.updateModules();
    }
  };

  // Reset scope variables and log user out
  $scope.logout = function () {
    home.resetScope();
    LogoutService.logout();
  };

  // Update selected modules
  $scope.updateModules = function () {
    $scope.selectedModules = ModuleService.getSelectedModules($scope.modules);
    home.moduleClass = ModuleService.makeModuleClass($scope.selectedModules.length);
    StorageService.storeModules($scope.modules);
  };

  // Reorder module in modules array
  $scope.reorderModule = function(item, fromIndex, toIndex) {
    $scope.modules.splice(fromIndex, 1);
    $scope.modules.splice(toIndex, 0, item);
    $scope.updateModules();
  };

  $scope.popover = PopoverService.createPopovers($scope);
  ModalService.createModals($scope).then(function (modalService) {
    $scope.modal = modalService;
    home.refreshBanner();
    home.resetScope();
  });
}]);
