app.service('LogoutService', ['$state', 'StorageService', 'ModalService', function ($state, StorageService, ModalService) {

  /**
   * Log user out of app
   */
  this.logout = function () {
    ModalService.hideModal('menu');
    StorageService.eraseCredentials();
    $state.go('login');
  };

}]);
