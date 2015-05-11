app.controller('PostLoginController', ['$timeout', '$state', 'DataService', 'StorageService', 'PopupService', function ($timeout, $state, DataService, StorageService, PopupService) {

  var postLogin = this,
    minimumCheckingTimeMs = 1000,
    maximumCheckingTimeMs = 5000;
  postLogin.status = "checking";
  postLogin.user = {};
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

  // Continue from privacy policy to home
  postLogin.goFromPrivacyPolicy = function (accepted) {

    // Accept privacy policy
    if (accepted) {
      DataService.setProperty(userCredentials, 'privacyPolicy', 'accepted')
      .then(function () {
        $state.go('home');
      });

    // Deny privacy policy
    } else {
      PopupService.showPopup('confirmOptOut')
      .then(function (result) {
        if (result) {
          DataService.setProperty(userCredentials, 'privacyPolicy', 'denied')
          .then(function () {
            $state.go('home');
          });
        }
      });
    }
  };

  // Continue from valid status to either privacy policy or home
  postLogin.goHome = function () {

    // Go home if privacy policy has been set
    if (postLogin.user.privacyPolicy) {
      $state.go('home');

    // Show privacy policy if has not been set
    } else {
      postLogin.status = 'privacy-policy';
    }
  };

  // Go to login screen
  postLogin.goLogin = function () {
    $state.go('login');
  };
}]);
