app.controller('PostLoginController', ['$timeout', '$state', '$q', 'DataService', 'StorageService', 'PopupService', function ($timeout, $state, $q, DataService, StorageService, PopupService) {

  var postLogin = this,
    minimumCheckingTimeMs = 250,
    maximumCheckingTimeMs = 3000,
    timeoutPromise = null;
  postLogin.status = 'checking';
  postLogin.user = {};
  postLogin.timeout = false;
  userCredentials = StorageService.retrieveCredentials();

  // Check if user credentials are valid
  postLogin.checkLogin = function () {

    timeoutPromise = $q.defer();

    DataService.get('checklogin', userCredentials, timeoutPromise).
    success(function (response) {

      postLogin.user = response.data;
      $timeout(function () {
        postLogin.status = 'valid';
      }, minimumCheckingTimeMs);
    }).
    error(function (response, status) {

      $timeout(function () {
        if (status == 401) {
          postLogin.status = 'invalid';
        } else if (status !== 0) {
          postLogin.status = 'unknown';
        }
      }, minimumCheckingTimeMs);
    });
  };

  postLogin.checkLogin();

  // Display "Taking too long?" with button to continue anyway
  $timeout(function () {
    postLogin.timeout = true;
  }, maximumCheckingTimeMs);

  // Continue from privacy policy to home
  postLogin.goFromPrivacyPolicy = function (accepted) {

    // Accept privacy policy
    if (accepted) {
      DataService.setProperty(userCredentials, 'privacyPolicy', 'accepted');
      $state.go('home');

    // Deny privacy policy
    } else {
      PopupService.showPopup('confirmOptOut')
      .then(function (result) {
        if (result) {
          DataService.setProperty(userCredentials, 'privacyPolicy', 'denied');
          $state.go('home');
        }
      });
    }
  };

  // Continue from valid status to either privacy policy or home
  postLogin.goHome = function () {

    // Cancel request if still in progress
    if (timeoutPromise.promise) {
      timeoutPromise.resolve();
    }

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
