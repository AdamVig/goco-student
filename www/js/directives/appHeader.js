app.directive('appHeader', function () {
  return {
    restrict: 'E',
    scope: {
      'backButton': '=',
      'allowConfiguration': '='
    },
    templateUrl: 'html/directives/_appheader.html',
    controller: ['$rootScope', '$state', '$scope', '$ionicPopover', '$ionicModal', 'StorageService', 'ModuleFactory', function ($rootScope, $state, $scope, $ionicPopover, $ionicModal, StorageService, ModuleFactory) {

      $scope.selectedModules = ModuleFactory.getSelectedModules();

      $scope.updateModules = function () {
        $scope.selectedModules = ModuleFactory.updateModules($scope.modules);
      };

      $ionicPopover.fromTemplateUrl('html/_menu.html', {
        scope: $scope,
      }).then(function(popover) {
        $scope.menu = popover;
      });

      var configPromise = $ionicModal.fromTemplateUrl(
        'html/_configuration.html',
        {scope: $scope})
      .then(function (modal) {
        $scope.configurationModal = modal;
      });

      $scope.logout = function () {
        $scope.hideMenu();
        StorageService.eraseCredentials();
        $state.go('login');
        $rootScope.$broadcast('modules:reset');
      };

      $scope.go = function (destination) {
        $state.go(destination);
      };

      $scope.showMenu = function ($event) {
        $scope.menu.show($event);
      };

      $scope.hideMenu = function () {
        $scope.menu.hide();
      };

      $scope.showConfigurationModal = function ($event) {
        // Update list of modules
        $scope.modules = ModuleFactory.getAllShownModules();

        // Show modal
        configPromise.then(function () {
          $scope.configurationModal.show($event);
        });
      };

      $scope.hideConfigurationModal = function ($event) {
        $scope.configurationModal.hide($event);
      };
    }]
  };
});
