app.controller('HomeController', ['$scope', '$state', '$ionicModal', 'DatabaseFactory', 'DataService', 'ModalService', 'LogoutService', 'StorageService', 'UsageService', function ($scope, $state, $ionicModal, DatabaseFactory, DataService, ModalService, LogoutService, StorageService, UsageService) {

  var home = this;
  home.loading = {};
  home.navHelp = "Tap to load";
  $scope.logout = LogoutService;
  home.userCredentials = StorageService.retrieveCredentials();
  if (!home.userCredentials) $state.go('login');

  // Modals
  ModalService.createModals($scope);
  $scope.modal = ModalService;
  $scope.refreshable = false;
  $scope.banner = StorageService.retrieveBanner();

  // Get banner message from database
  DatabaseFactory.get('message').then(function (response) {
    if (response.data) {
      StorageService.storeBanner(response.data);
    }
  });

  /**
   * Handle tap on either chapel credit or meal points button
   */
  var handleTap = function () {
    home.navHelp = "Tap to refresh";
  };

  /**
   * Handle $http error
   * @param {object} data        Contains payload from $http response
   * @param {number} status      HTTP status from $http response
   * @param {string} description Either "chapel credit" or "meal points"
   */
  var handleError = function (data, status, description) {
    if (status == 401) {
      return "Username and password don't match. Log out and try again!"
    } else if (status == 0) {
      return "Oops! Couldn't find your " + description + ".";
    } else {
      console.error("Error getting data. Status:", status, "Response:", response);
      return "Something went horribly wrong. Try again later!"
    }
  };

  home.getChapelCredits = function () {
    handleTap();
    home.loading.chapelCredits = true;

    // Get chapel credits
    DataService.getChapelCredits(home.userCredentials).
    success(function(data) {
      home.chapelCredits = data.credit;
      home.loading.chapelCredits = false;
      UsageService.log(home.userCredentials.username);
    }).
    error(function(data, status) {
      home.errorMessage.chapelCredits = handleError(data, status, "meal points");
    }).
    finally(function() {
      home.loading.chapelCredits = false;
    });
  };

  home.getMealPoints = function () {
    handleTap();
    home.loading.mealPoints = true;

    // Get meal points
    DataService.getMealPoints(home.userCredentials).
    success(function(data) {
      home.mealPoints = data.mealpoints;
      home.loading.mealPoints = false;
      UsageService.log(home.userCredentials.username);
    }).
    error(function(data, status) {
      home.errorMessage.chapelCredits = handleError(data, status, "meal points");
    }).
    finally(function() {
      home.loading.mealPoints = false;
    });
  };

}]);
