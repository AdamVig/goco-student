app.controller('ChapelCreditController', ['$scope', '$state', '$filter', '$timeout', '$sce', '$ionicPlatform', '$ionicModal', 'DataService', 'StorageService', 'UsageService', 'DatabaseFactory', function ($scope, $state, $filter, $timeout, $sce, $ionicPlatform, $ionicModal, DataService, StorageService, UsageService, DatabaseFactory) {

  var chapel = this;
  chapel.isLoading = true;
  chapel.chapelCredit = { credit: "" };
  chapel.userCredentials = StorageService.retrieveCredentials();
  chapel.modal = {};

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
    chapel.modal.menu = modal;
  });

  // Menu modal
  $ionicModal.fromTemplateUrl('html/_banner.html', {
    scope: $scope
  }).then(function(modal) {
    chapel.modal.banner = modal;
  });

  // Refresh data (immediately-invoked)
  (chapel.refreshData = function () {

    UsageService.log(chapel.userCredentials.username);

    if (chapel.menu) chapel.modal.menu.hide();
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
        } else if (status == 0) {
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
  };

  // Refresh data on app resume
  $ionicPlatform.on('resume', chapel.refreshData);

  // Refresh data on app open
  $ionicPlatform.ready(chapel.refreshData);

  // Get banner message from database
  DatabaseFactory.get('message').then(function (response) {
    if (response.data) {
      if (response.data.body != "") {
        chapel.banner = response.data;
        chapel.banner.body = $sce.trustAsHtml(chapel.banner.body);
      }
    }
  });

  // Hide/show modal based on its current state
  chapel.toggleModal = function(modalName) {
    chapel.modal[modalName].isShown() ?
      chapel.modal[modalName].hide() :
      chapel.modal[modalName].show();
  };

  // Erase stored user info and go to login page
  chapel.logout = function () {
    chapel.modal.menu.hide();
    StorageService.eraseCredentials();
    $state.go('login');
  };
}]);
