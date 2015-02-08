app.controller('ChapelCreditController', ['$state', '$filter', 'DataService', 'StorageService', function ($state, $filter, DataService, StorageService) {

  var chapel = this;
  chapel.isLoading = true;
  chapel.chapelCredit = {
    credit: ""
  };
  chapel.userCredentials = StorageService.retrieveCredentials();

  if (chapel.userCredentials != false) {
    chapel.userName = $filter('NameFilter')(chapel.userCredentials.username);

    DataService.getChapelCredit(chapel.userCredentials).
      success(function(data) {
        chapel.chapelCredit.credit = data.credit;
        chapel.isLoading = false;
      }).
      error(function(data, status) {
        chapel.message = "Oops! Couldn't find your chapel credit.";
        console.error("GET failed with error status", status);
        chapel.isLoading = false;
      });
  } else {
    $state.go('login');
  }

  chapel.logout = function () {
    StorageService.eraseCredentials();
    $state.go('login');
  };
}]);
