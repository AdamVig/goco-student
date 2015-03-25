app.service('ModalService', ['$ionicModal', function ($ionicModal) {
  var modalService = this;

  /**
   * Create menu and banner modals
   * @param {object} $scope Scope of controller
   */
  this.createModals = function ($scope) {
    // Banner modal
    $ionicModal.fromTemplateUrl('html/_banner.html', {
      scope: $scope
    }).then(function(modal) {
      modalService.banner = modal;
    });
    
    return modalService;
  };

  /**
   * Toggle visibility of modal
   * @param {String} modalName Name of modal
   */
  this.toggleModal = function (modalName) {
    if (modalService[modalName]) {
      if (modalService[modalName].isShown()) {
        modalService[modalName].hide();
      } else {
        modalService[modalName].show();
      }
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
