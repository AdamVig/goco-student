app.controller('HomeController', ['$scope', '$state', '$ionicModal', 'DatabaseFactory', 'ModalService', 'LogoutService', 'StorageService', function ($scope, $state, $ionicModal, DatabaseFactory, ModalService, LogoutService, StorageService) {

  var home = this;
  $scope.logout = LogoutService;

  // Modals
  ModalService.createModals($scope);
  $scope.modal = ModalService;
  $scope.refreshable = false;
  $scope.banner = StorageService.retrieveBanner();

}]);
