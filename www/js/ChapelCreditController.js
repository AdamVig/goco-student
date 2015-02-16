app.controller('ChapelCreditController', ['$scope', '$state', '$filter', '$timeout', '$ionicPlatform', '$ionicModal', 'DataService', 'StorageService', function ($scope, $state, $filter, $timeout, $ionicPlatform, $ionicModal, DataService, StorageService) {

  var chapel = this;
  chapel.isLoading = true;
  chapel.chapelCredit = { credit: "" };
  chapel.userCredentials = StorageService.retrieveCredentials();

  // Advertisement
  var showAdvertisement = function () {
    if (window.AdMob) {
      AdMob.prepareInterstitial({
        adId: 'ca-app-pub-9660792847854450/1366364053',
        autoShow: true
      });
    }
  };

  // Menu modal
  $ionicModal.fromTemplateUrl('html/_menu.html', {
    scope: $scope
  }).then(function(modal) {
    chapel.modal = modal;
  });

  // Refresh data (immediately-invoked)
  (chapel.refreshData = function () {

    if (chapel.modal) chapel.modal.hide();
    chapel.isLoading = true;
    showAdvertisement();

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
        } else if (data == null) {
          chapel.message = "Oops! Couldn't find your chapel credit.";
        } else {
          console.error("Error getting data. Status:", status, "Response:", response);
          chapel.message = "Something went horribly wrong. Try again later!"
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
