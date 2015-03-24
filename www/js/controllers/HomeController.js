app.controller('HomeController', ['$scope', '$state', 'DatabaseFactory', 'DataService', 'ModalService', 'PopoverService', 'LogoutService', 'StorageService', 'UsageService', function ($scope, $state, DatabaseFactory, DataService, ModalService, PopoverService, LogoutService, StorageService, UsageService) {

  var home = this;

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
    } else {
      // Track exception with analytics
      if (window.analytics) {
        window.analytics.trackException("Could not retrieve banner.", false);
      }
    }
  });

  /**
   * Handle $http error
   * @param {object} data        Contains payload from $http response
   * @param {number} status      HTTP status from $http response
   * @param {string} description Either "chapel credit" or "meal points"
   */
  var handleError = function (data, status, description) {

    // Track exception with analytics
    if (window.analytics) {
      window.analytics.trackException(status + ": " + description, true);
    }

    // Return error message
    if (status == 401) {
      return "Username and password don't match. Log out and try again!";
    } else if (status === 0) {
      return "Oops! Couldn't find your " + description + ".";
    } else {
      console.error("Error getting data. Status:", status, "Response:", data);
      return "Something went horribly wrong. Try again later!";
    }
  };

  /**
   * Get chapel credits from server
   */
  home.getChapelCredits = function () {
    home.loading.chapelCredits = true;
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

  /**
   * Get meal points from server
   */
  home.getMealPoints = function () {
    home.loading.mealPoints = true;
    home.errorMessage.mealPoints = null;

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

  /**
   * Instantiate/reset scope variables
   */
  home.resetScope = function () {

    // Status
    home.loading = {};
    home.errorMessage = {};

    // Data
    home.mealPoints = null;
    home.chapelCredits = {};

    // User credentials
    home.userCredentials = StorageService.retrieveCredentials();

    // Go to login page if no user credentials found
    if (!home.userCredentials) {
      $state.go('login');

    // Set user ID in analytics
    } else if (window.analytics) {
      window.analytics.setUserId(home.userCredentials.username);
    }
  };

  home.resetScope();

  /**
   * Reset scope variables and log user out
   */
  $scope.logout = function () {
    home.resetScope();
    LogoutService.logout();
  };
}]);
