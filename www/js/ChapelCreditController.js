app.controller('ChapelCreditController', ['$scope', '$state', '$filter', '$sce', '$ionicPlatform', '$ionicModal', 'DataService', 'StorageService', 'UsageService', 'DatabaseFactory', function ($scope, $state, $filter, $sce, $ionicPlatform, $ionicModal, DataService, StorageService, UsageService, DatabaseFactory) {

  var chapel = this;
  chapel.isLoading = true;
  chapel.chapelCredit = { credit: "" };
  chapel.userCredentials = StorageService.retrieveCredentials();
  chapel.modal = {};

  // Menu modal
  $ionicModal.fromTemplateUrl('html/_menu.html', {
    scope: $scope
  }).then(function(modal) {
    chapel.modal.menu = modal;
  });

  // Banner modal
  $ionicModal.fromTemplateUrl('html/_banner.html', {
    scope: $scope
  }).then(function(modal) {
    chapel.modal.banner = modal;
  });

  // Refresh data
  chapel.refreshData = function () {

    if (chapel.modal.menu) chapel.modal.menu.hide();
    chapel.isLoading = true;

    if (chapel.userCredentials != false) {
      chapel.userName = $filter('NameFilter')(chapel.userCredentials.username);

      // Get chapel credit
      DataService.getChapelCredit(chapel.userCredentials).
      success(function(data) {
        chapel.chapelCredit.credit = data.credit;
        chapel.isLoading = false;
        UsageService.log(chapel.userCredentials.username);
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

  chapel.refreshData();

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
