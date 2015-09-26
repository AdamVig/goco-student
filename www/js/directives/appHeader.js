app.directive('appHeader', function () {
  return {
    restrict: 'E',
    scope: {
      'backButton': '=',
      'allowConfiguration': '='
    },
    templateUrl: 'html/directives/_appheader.html',
    controller: ['$state', '$scope', '$ionicPopover', '$ionicModal', 'StorageService', 'ModuleFactory', function ($state, $scope, $ionicPopover, $ionicModal, StorageService, ModuleFactory) {

      $scope.modules = ModuleFactory.getAllModules();
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
      };

      $scope.goHome = function () {
        $state.go('home');
      };

      $scope.showMenu = function ($event) {
        $scope.menu.show($event);
      };

      $scope.hideMenu = function () {
        $scope.menu.hide();
      };

      $scope.showConfigurationModal = function ($event) {
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
