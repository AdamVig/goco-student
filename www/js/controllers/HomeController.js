app.controller('HomeController', ['$rootScope', '$scope', '$state', '$window', '$filter', '$ionicScrollDelegate', '$timeout', 'Modules', 'DataService', 'ModalService', 'ModuleFactory', 'PopoverService', 'PopupService', 'StorageService', 'ApiUrl', 'AppInfoRefreshTime', 'AppVersion', function ($rootScope, $scope, $state, $window, $filter, $ionicScrollDelegate, $timeout, Modules, DataService, ModalService, ModuleFactory, PopoverService, PopupService, StorageService, ApiUrl, AppInfoRefreshTime, AppVersion) {

  var home = this;
  $scope.moduleControl = [];
  StorageService.store('lastAppInfoRefresh', new Date(0));

  // Disable scroll dynamically
  document.addEventListener("dragstart", function( event ) {
    $ionicScrollDelegate.freezeAllScrolls(!home.scrollEnabled);
  }, false);

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
    if (!StorageService.retrieveCredentials()) $state.go('login');
    home.hasBanner = false;
    home.scrollEnabled = false;

    $scope.updateModules();
    home.loadAllModules();
  };

  // Update selected modules
  $scope.updateModules = function () {
    $scope.selectedModules = ModuleFactory.getSelectedModules();
    home.moduleClass = ModuleFactory.getModuleClass();
    home.scrollEnabled = ModuleFactory.isScrollEnabled();
  };

  // Load data in all modules at once
  home.loadAllModules = function () {
    var delayModuleLoad = 500;
    var i = 0;

    // Load all modules with set delay time in between
    (function loadModule () {
      $timeout(function () {
        if (i < $scope.moduleControl.length) {
          $scope.moduleControl[i]();
          i++;
          loadModule();
        }
      }, delayModuleLoad);
    })();
  };

  $scope.popup = PopupService;

  // Wait for modals to be created before initializing controller
  ModalService.createModals($scope).then(function (modalService) {
    $scope.modal = modalService;
    home.refreshAppInfo();
    home.resetScope();
  });
}]);
