app.service('LogoutService', ['$state', 'StorageService', 'PopoverService', function ($state, StorageService, PopoverService) {

  /**
   * Log user out of app
   */
  this.logout = function () {
    PopoverService.hidePopover('menu');
    StorageService.eraseCredentials();
    $state.go('login');
  };

}]);
