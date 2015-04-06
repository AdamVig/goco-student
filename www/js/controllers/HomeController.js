app.controller('HomeController', ['$rootScope', '$scope', '$state', '$window', '$filter', 'Modules', 'DatabaseFactory', 'DataService', 'ModalService', 'ModuleService', 'PopoverService', 'LogoutService', 'StorageService', 'UsageService', function ($rootScope, $scope, $state, $window, $filter, Modules, DatabaseFactory, DataService, ModalService, ModuleService, PopoverService, LogoutService, StorageService, UsageService) {

  var home = this;

  // Refresh banner message
  home.refreshBanner = function () {
    DataService.getBanner().then(function (banner) {
      $scope.banner = banner;
    });
  };

  // Instantiate/reset scope variables
  home.resetScope = function () {

    // Status
    home.loading = {};
    home.errorMessage = {};

    // Data
    home.mealPoints = null;
    home.chapelCredits = {};

    // User credentials
    home.userCredentials = StorageService.retrieveCredentials();

    // Module settings
    $scope.modules = StorageService.retrieveModules() || Modules;
    $scope.modules = ModuleService.addMissingModules($scope.modules);
    StorageService.storeModules($scope.modules);
    $scope.updateModules();

    // Go to login page if no user credentials found
    if (!home.userCredentials) {
      $state.go('login');

    // Set user ID in analytics
    } else if ($window.analytics) {
      $window.analytics.setUserId(home.userCredentials.username);
    }
  };

  // Reset scope variables and log user out
  $scope.logout = function () {
    home.resetScope();
    LogoutService.logout();
  };

  // Update selected modules
  $scope.updateModules = function () {
    home.selectedModules = ModuleService.getSelectedModules($scope.modules);
    home.moduleClass = ModuleService.makeModuleClass(home.selectedModules.length);
    StorageService.storeModules($scope.modules);
  };

  // Reorder module in modules array
  $scope.reorderModule = function(item, fromIndex, toIndex) {
    $scope.modules.splice(fromIndex, 1);
    $scope.modules.splice(toIndex, 0, item);
    $scope.updateModules();
  };

  home.refreshBanner();
  home.resetScope();

  $scope.modal = ModalService.createModals($scope);
  $scope.popover = PopoverService.createPopovers($scope);
}]);
