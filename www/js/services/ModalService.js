app.service('ModalService', ['$ionicModal', function ($ionicModal) {

  var modalService = this;

  /**
   * Create menu and banner modals
   * @param {object} $scope Scope of controller
   */
  this.createModals = function ($scope) {

    var modals = ['banner', 'configuration'];

    // Create modals
    for (var i = 0; i < modals.length; i++) {
      var modalName = modals[i];
      makeModal(modalName, $scope);
    }

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

  /**
   * Make modal and add to modalService object
   * Uses $ionicModal internally
   * Expects html/_modalname.html to exist
   * @param {String} modalName Name of modal
   * @param {Object} $scope    $scope object to pass to modal
   */
  function makeModal(modalName, $scope) {
    $ionicModal.fromTemplateUrl(
      'html/_' + modalName + '.html',
      { scope: $scope }
    ).then(function (modal) {
      modalService[modalName] = modal;
    });
  }
}]);
