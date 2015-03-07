app.service('PopoverService', ['$ionicPopover', function ($ionicPopover) {
  var popoverService = this;

  /**
   * Create menu popover
   * @param {object} $scope Scope of controller
   */
  this.createModals = function ($scope) {
    $ionicPopover.fromTemplateUrl('html/_menu.html', {
      scope: $scope,
    }).then(function(popover) {
      popoverService.menu = popover;
    });
  };

  /**
   * Hide a popover
   * @param {String} popoverName Name of popover
   */
  this.hideModal = function (popoverName) {
    if (popoverService[popoverName]) {
      popoverService[popoverName].hide();
    }
  };
}]);
