app.controller('HomeController', ['$scope', '$state', '$window', '$filter', 'DataTypes', 'DatabaseFactory', 'DataService', 'ModalService', 'PopoverService', 'LogoutService', 'StorageService', 'UsageService', function ($scope, $state, $window, $filter, DataTypes, DatabaseFactory, DataService, ModalService, PopoverService, LogoutService, StorageService, UsageService) {

  var home = this;

  // Instantiate modals and popovers
  $scope.modal = ModalService.createModals($scope);
  $scope.popover = PopoverService.createPopovers($scope);

  // Refresh banner message
  home.refreshBanner = function () {
    DataService.getBanner().then(function (banner) {
      $scope.banner = banner;
    });
  };

  // Instantiate/reset scope variables
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
    } else if ($window.analytics) {
      $window.analytics.setUserId(home.userCredentials.username);
    }
  };

  /**
   * Load data
   * @param  {String} dataType Type of data to load, ex: 'chapelCredits'
   */
  home.load = function (dataType) {

    // Check for unsupported data type
    if (DataTypes.indexOf(dataType) == -1) {
      console.error("Data Type", dataType, "is not supported.");
      return;
    }

    home.refreshBanner();

    home.loading[dataType] = true;
    home.errorMessage[dataType] = null;

    // Get data from server
    DataService.get(dataType, home.userCredentials).
    success(function(data) {
      home[dataType] = data;
      home.loading[dataType] = false;
      UsageService.log(home.userCredentials.username, dataType);
    }).
    error(function(data, status) {
      var dataDescription = $filter('camelCaseToHuman')(dataType);
      home.errorMessage[dataType] = DataService.handleError(data, status, dataDescription);
    }).
    finally(function() {
      home.loading[dataType] = false;
    });
  };

  home.refreshBanner();
  home.resetScope();

  // Reset scope variables and log user out
  $scope.logout = function () {
    home.resetScope();
    LogoutService.logout();
  };
}]);
