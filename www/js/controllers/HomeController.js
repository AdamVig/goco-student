app.controller('HomeController', ['$scope', '$state', 'DatabaseFactory', 'DataService', 'ModalService', 'PopoverService', 'LogoutService', 'StorageService', 'UsageService', function ($scope, $state, DatabaseFactory, DataService, ModalService, PopoverService, LogoutService, StorageService, UsageService) {

  var home = this;
  $scope.logout = LogoutService;

  home.loading = {};
  home.errorMessage = {};

  home.mealPoints = null;
  home.chapelCredits = null;

  // User credentials
  home.userCredentials = StorageService.retrieveCredentials();
  if (!home.userCredentials) $state.go('login');

  // Modals
  ModalService.createModals($scope);
  $scope.modal = ModalService;
  $scope.banner = StorageService.retrieveBanner();

  //Popovers
  PopoverService.createPopovers($scope);
  $scope.popover = PopoverService;

  // Get banner message from database
  DatabaseFactory.get('message').then(function (response) {
    if (response.data) {
      StorageService.storeBanner(response.data);
    }
  });

  /**
   * Handle $http error
   * @param {object} data        Contains payload from $http response
   * @param {number} status      HTTP status from $http response
   * @param {string} description Either "chapel credit" or "meal points"
   */
  var handleError = function (data, status, description) {
    if (status == 401) {
      return "Username and password don't match. Log out and try again!";
    } else if (status === 0) {
      return "Oops! Couldn't find your " + description + ".";
    } else {
      console.error("Error getting data. Status:", status, "Response:", data);
      return "Something went horribly wrong. Try again later!";
    }
  };

  home.getChapelCredits = function () {
    home.loading.chapelCredits = true;
    home.userCredentials = StorageService.retrieveCredentials();
    home.errorMessage.chapelCredits = null;

    // Get chapel credits
    DataService.getChapelCredits(home.userCredentials).
    success(function(data) {
      home.chapelCredits = data;
      home.loading.chapelCredits = false;
      UsageService.log(home.userCredentials.username);
    }).
    error(function(data, status) {
      home.errorMessage.chapelCredits = handleError(data, status, "chapel credit");
    }).
    finally(function() {
      home.loading.chapelCredits = false;
    });
  };

  home.getMealPoints = function () {
    home.loading.mealPoints = true;
    home.userCredentials = StorageService.retrieveCredentials();
    home.errorMessage.mealPoints = null;

    console.log(home.userCredentials);

    // Get meal points
    DataService.getMealPoints(home.userCredentials).
    success(function(data) {
      home.mealPoints = data.mealpoints;
      home.loading.mealPoints = false;
      UsageService.log(home.userCredentials.username);
    }).
    error(function(data, status) {
      home.errorMessage.mealPoints = handleError(data, status, "meal points");
    }).
    finally(function() {
      home.loading.mealPoints = false;
    });
  };

}]);
