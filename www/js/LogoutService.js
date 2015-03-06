app.service('LogoutService', ['$state', 'StorageService', 'ModalService', function ($state, StorageService, ModalService) {

  this.logout = function () {
    ModalService.hideModal('menu');
    StorageService.eraseCredentials();
    $state.go('login');
  };

}]);
