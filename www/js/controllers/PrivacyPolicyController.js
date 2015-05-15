app.controller('PostLoginController', ['$timeout', '$state', '$q', 'DataService', 'StorageService', 'PopupService', function ($timeout, $state, $q, DataService, StorageService, PopupService) {

  var postLogin = this;
  postLogin.status = 'checking';
  postLogin.user = {};
  postLogin.timeout = false;
  userCredentials = StorageService.retrieveCredentials();

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
}]);
