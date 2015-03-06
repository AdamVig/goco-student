app.service('ModalService', ['$ionicModal', function ($ionicModal) {
  var modalService = this;

  /**
   * Create menu and banner modals
   * @param {object} $scope Scope of controller
   */
  this.createModals = function ($scope) {
    // Menu modal
    $ionicModal.fromTemplateUrl('html/_menu.html', {
      scope: $scope
    }).then(function(modal) {
      modalService.menu = modal;
    });

    // Banner modal
    $ionicModal.fromTemplateUrl('html/_banner.html', {
      scope: null
    }).then(function(modal) {
      modalService.banner = modal;
    });
  };

  /**
   * Toggle visibility of modal
   * @param {String} modalName Name of modal
   */
  this.toggleModal = function (modalName) {
    if (modalService[modalName]) {
      modalService[modalName].isShown() ?
        modalService[modalName].hide() :
        modalService[modalName].show();
    }
  };

  /**
   * Hide a modal
   * @param {String} modalName Name of modal
   */
  this.hideModal = function (modalName) {
    if (modalService[modalName]) {
      modalService[modalName].hide();
    }
  };
}]);
