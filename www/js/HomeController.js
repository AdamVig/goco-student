app.controller('HomeController', ['$scope', '$state', '$ionicModal', 'DatabaseFactory', 'ModalService', 'LogoutService', 'StorageService', function ($scope, $state, $ionicModal, DatabaseFactory, ModalService, LogoutService, StorageService) {

  var home = this;
  $scope.logout = LogoutService;
  home.userCredentials = StorageService.retrieveCredentials();
  if (!home.userCredentials) $state.go('login');

  // Modals
  ModalService.createModals($scope);
  $scope.modal = ModalService;
  $scope.refreshable = false;
  $scope.banner = StorageService.retrieveBanner();

  // Get banner message from database
  DatabaseFactory.get('message').then(function (response) {
    if (response.data) {
      StorageService.storeBanner(response.data);
    }
  });

}]);
