app.controller('MealPointsController', ['$scope', 'ModalService', 'LogoutService', 'StorageService', 'DataService', 'UsageService', function ($scope, ModalService, LogoutService, StorageService, DataService, UsageService) {

  var meal = this;
  meal.isLoading = true;
  $scope.logout = LogoutService;
  meal.userCredentials = StorageService.retrieveCredentials();

  // Modals
  ModalService.createModals($scope);
  $scope.modal = ModalService;
  $scope.refreshable = true;
  $scope.banner = StorageService.retrieveBanner();

  $scope.refreshData = function () {

    ModalService.hideModal('menu');
    meal.isLoading = true;

    if (meal.userCredentials != false) {

      // Get chapel credit
      DataService.getMealPoints(meal.userCredentials).
      success(function(data) {
        meal.mealPoints = data.mealpoints;
        meal.isLoading = false;
        UsageService.log(meal.userCredentials.username);
      }).
      error(function(data, status) {
        if (status == 401) {
          meal.message = "Username and password don't match. Log out and try again!"
        } else if (status == 0) {
          meal.message = "Oops! Couldn't find your chapel credit.";
        } else {
          console.error("Error getting data. Status:", status, "Response:", response);
          meal.message = "Something went horribly wrong. Try again later!"
        }
      }).
      finally(function() {
        meal.isLoading = false;
      });

    } else {
      $state.go('login');
    }
  };

  $scope.refreshData();

}]);
