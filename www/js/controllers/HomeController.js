app.controller('HomeController', ['$rootScope', '$scope', '$state', '$window', '$filter', '$ionicScrollDelegate', 'Modules', 'DataService', 'ModalService', 'ModuleService', 'PopoverService', 'PopupService', 'StorageService', 'ApiUrl', 'AppInfoRefreshTime', 'AppVersion', function ($rootScope, $scope, $state, $window, $filter, $ionicScrollDelegate, Modules, DataService, ModalService, ModuleService, PopoverService, PopupService, StorageService, ApiUrl, AppInfoRefreshTime, AppVersion) {

  var home = this;
  StorageService.store('lastAppInfoRefresh', new Date(0));

  // Refresh app info including banner
  home.refreshAppInfo = function () {
    var request = DataService.refreshAppInfo();

    // If request is a promise
    if (request !== false) {
      request.then(function (appInfo) {
        home.appInfo = appInfo;

        // Set banner if it exists
        if (home.appInfo.banner.title){
          home.hasBanner = true;
          $scope.banner = home.appInfo.banner;
        }
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
    home.hasBanner = false;
    home.scrollEnabled = false;

    // Module settings
    $scope.modules = StorageService.retrieveModules();

    // Go to login page if no user credentials found
    if (!home.userCredentials) {
      $state.go('login');

    // Otherwise get stored modules or create new defaults
    } else {

      var storedAppVersion = StorageService.retrieveAppVersion();

      if (!$scope.modules) {
        $scope.modules = Modules;
        $scope.modal.showModal('configuration');
        $scope.popup.showPopup('configuration');
      } else if (storedAppVersion != AppVersion) {
        $scope.modules = Modules;
        $scope.modal.showModal('configuration');
      } else {
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
    home.scrollEnabled = $scope.selectedModules.length > 5;
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
