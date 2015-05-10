app.controller("PostLoginController", ["$timeout", "$state", "DataService", "StorageService", function ($timeout, $state, DataService, StorageService) {

  var postLogin = this,
    minimumCheckingTimeMs = 1000,
    maximumCheckingTimeMs = 5000;
  postLogin.status = "checking";
  postLogin.timeout = false;
  userCredentials = StorageService.retrieveCredentials();

  /* Check if user credentials are valid */
  postLogin.checkLogin = function () {

    DataService.get("checklogin", userCredentials).
    success(function (response) {
      $timeout(function () {
        postLogin.status = "valid";
      }, minimumCheckingTimeMs);
    }).
    error(function (response, status) {
      $timeout(function () {
        if (status == 401) {
          postLogin.status = "invalid";
        } else {
          postLogin.status = "unknown";
        }
      }, minimumCheckingTimeMs);
    });
  };

  postLogin.checkLogin();

  $timeout(function () {
    postLogin.timeout = true;
  }, maximumCheckingTimeMs);

  /* Go to a state */
  postLogin.go = function (state) {
    $state.go(state);
  };

}]);
