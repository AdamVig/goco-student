app.directive('appHeader', function () {
  return {
    restrict: 'E',
    scope: {
      'backButton': '=',
      'allowConfiguration': '='
    },
    templateUrl: 'html/directives/_appheader.html',
    controller: ['$rootScope', '$state', '$scope', '$ionicPopover', '$ionicModal', 'DbFactory', function ($rootScope, $state, $scope, $ionicPopover, $ionicModal, DbFactory) {

      // Prepare menu popover
      $ionicPopover.fromTemplateUrl('html/_menu.html', {
        scope: $scope,
      }).then(function(popover) {
        $scope.menu = popover;
      });

      $scope.showMenu = function ($event) {
        $scope.menu.show($event);
      };

      $scope.hideMenu = function () {
        $scope.menu.hide();
      };

      var configPromise = $ionicModal.fromTemplateUrl(
        'html/_configuration.html',
        {scope: $scope})
      .then(function (modal) {
        $scope.configurationModal = modal;
      });

      // Update list of modules and show config modal
      $scope.showConfigurationModal = function ($event) {
        configPromise.then(function () {
          $scope.configurationModal.show($event);
        });
      };

      $scope.hideConfigurationModal = function ($event) {
        $scope.configurationModal.hide($event);
      };

      $scope.logout = function () {
        $scope.hideMenu();
        DbFactory.deleteCredentials();
        $state.go('login');
        $rootScope.$broadcast('modules:reset');
      };

      $scope.go = function (destination) {
        $state.go(destination);
      };
    }]
  };
});
