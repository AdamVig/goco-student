app.controller('HomeController', ['$rootScope', '$scope', '$state', '$window', '$filter', 'Modules', 'DataService', 'ModalService', 'ModuleService', 'PopoverService', 'PopupService', 'LogoutService', 'StorageService', 'ApiUrl', 'AppInfoRefreshTime', function ($rootScope, $scope, $state, $window, $filter, Modules, DataService, ModalService, ModuleService, PopoverService, PopupService, LogoutService, StorageService, ApiUrl, AppInfoRefreshTime) {

  var home = this,
      lastAppInfoRefresh = new Date(0); // Some day in 1970

  // Refresh app info including banner
  home.refreshAppInfo = function () {
    var now = Date.now();
    var timeDiff = now - lastAppInfoRefresh;

    // Refresh if it has been more than five seconds since last refresh
    if (timeDiff > AppInfoRefreshTime) {
      DataService.get('AppInfo').then(function (response) {
        $scope.banner = response.data.banner;
        home.appInfo = response.data;
        lastAppInfoRefresh = now;
      });
    }
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
        $scope.popup.showPopup('configuration');

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
  $scope.popup = PopupService;
  ModalService.createModals($scope).then(function (modalService) {
    $scope.modal = modalService;
    home.refreshAppInfo();
    home.resetScope();
  });
}]);
