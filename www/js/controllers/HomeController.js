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

    home.loading = {};
    home.errorMessage = {};
    home.mealPoints = null;
    home.chapelCredits = {};
    home.userCredentials = StorageService.retrieveCredentials();
    home.hasBanner = false;
    home.scrollEnabled = false;

    // Retrieved stored modules or null if no stored modules
    $scope.modules = StorageService.retrieveModules();

    if (home.userCredentials) {

      var storedAppVersion = StorageService.get('version');
      if (storedAppVersion != AppVersion || !$scope.modules) {
        $scope.modules = Modules;
        $scope.modal.showModal('configuration');
        if (!$scope.modules) $scope.popup.showPopup('configuration');
      }
      $scope.updateModules();
      home.loadAllModules();

    } else {
      $state.go('login');
    }
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

  $scope.reorderModule = ModuleFactory.reorderModules();
  $scope.popup = PopupService;

  // Wait for modals to be created before initializing controller
  ModalService.createModals($scope).then(function (modalService) {
    $scope.modal = modalService;
    home.refreshAppInfo();
    home.resetScope();
  });
}]);
