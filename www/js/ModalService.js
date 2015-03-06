app.service('ModalService', ['$ionicModal', function ($ionicModal) {
  var modalService = this;

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

  this.toggleModal = function (modalName) {
    if (modalService[modalName]) {
      modalService[modalName].isShown() ?
        modalService[modalName].hide() :
        modalService[modalName].show();
    }
  };

  this.hideModal = function (modalName) {
    if (modalService[modalName]) {
      modalService[modalName].hide();
    }
  };

}]);
