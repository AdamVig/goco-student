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
        if (status == 401) {
          chapel.message = "Username and password don't match. Log out and try again!"
        } else if (status == 500 || status == 404) {
          chapel.message = "Something went horribly wrong. Try again later!"
        } else {
          chapel.message = "Oops! Couldn't find your chapel credit.";
        }
      }).
      finally(function() {
        chapel.isLoading = false;
     });

    } else {
      $state.go('login');
    }
  })();

  // Refresh data on app load
  $ionicPlatform.on('resume', function() {
    chapel.refreshData();
  });

  chapel.toggleModal = function() {
    chapel.modal.isShown() ? chapel.modal.hide() : chapel.modal.show();
  };

  chapel.logout = function () {
    chapel.modal.hide();
    StorageService.eraseCredentials();
    $state.go('login');
  };
}]);
