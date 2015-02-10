app.controller('ChapelCreditController', ['$scope', '$state', '$filter', '$timeout', '$ionicModal', 'DataService', 'StorageService', function ($scope, $state, $filter, $timeout, $ionicModal, DataService, StorageService) {

  var chapel = this;
  if (window.AdMob) AdMob.showInterstitial();
  chapel.isLoading = true;
  chapel.chapelCredit = { credit: "" };
  chapel.userCredentials = StorageService.retrieveCredentials();
  $ionicModal.fromTemplateUrl('html/_menu.html', {
    scope: $scope
  }).then(function(modal) {
    chapel.modal = modal;
  });

  chapel.refreshData = function () {

    if (chapel.modal) chapel.modal.hide();
    chapel.isLoading = true;

    if (chapel.userCredentials != false) {
      chapel.userName = $filter('NameFilter')(chapel.userCredentials.username);

      DataService.getChapelCredit(chapel.userCredentials).
      success(function(data) {
        chapel.chapelCredit.credit = data.credit;
        chapel.isLoading = false;
      }).
      error(function(data, status) {
        chapel.message = "Oops! Couldn't find your chapel credit.";
      }).
      finally(function() {
        chapel.isLoading = false;
     });

    } else {
      $state.go('login');
    }
  };

  chapel.refreshData();

  chapel.toggleModal = function() {
    chapel.modal.isShown() ? chapel.modal.hide() : chapel.modal.show();
  };

  chapel.logout = function () {
    chapel.modal.hide();
    StorageService.eraseCredentials();
    $state.go('login');
  };
}]);
