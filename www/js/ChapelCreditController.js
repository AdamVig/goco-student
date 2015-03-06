app.controller('ChapelCreditController', ['$scope', '$state', '$filter', '$sce', '$ionicPlatform', '$ionicModal', 'DataService', 'StorageService', 'UsageService', 'DatabaseFactory', 'ModalService', 'LogoutService', function ($scope, $state, $filter, $sce, $ionicPlatform, $ionicModal, DataService, StorageService, UsageService, DatabaseFactory, ModalService, LogoutService) {

  var chapel = this;
  chapel.isLoading = true;
  chapel.chapelCredit = { credit: "" };
  chapel.userCredentials = StorageService.retrieveCredentials();
  $scope.logout = LogoutService;

  // Modals
  ModalService.createModals($scope);
  $scope.modal = ModalService;
  $scope.refreshable = true;
  $scope.banner = StorageService.retrieveBanner();

  // Refresh data
  $scope.refreshData = function () {

    ModalService.hideModal('menu');
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

  $scope.refreshData();

}]);
