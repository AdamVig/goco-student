app.controller("PrivacyPolicyController", ["$state", "DataService", "DbFactory", "PopupService", function ($state, DataService, DbFactory, PopupService) {

  var privacyPolicy = this;
  privacyPolicy.status = "checking";
  privacyPolicy.user = {};
  privacyPolicy.timeout = false;
  privacyPolicy.userCredentials = {};

  DbFactory.getCredentials().then(function (credentials) {
    privacyPolicy.userCredentials = credentials;
  });

  // Continue from privacy policy to home
  privacyPolicy.go = function (accepted) {

    // Accept privacy policy
    if (accepted) {
      DataService.setProperty(privacyPolicy.userCredentials, "privacyPolicy", "accepted");
      $state.go("home");

    // Deny privacy policy
    } else {
      PopupService.showPopup("confirmOptOut")
      .then(function (result) {
        if (result) {
          DataService.setProperty(privacyPolicy.userCredentials, "privacyPolicy", "denied");
          $state.go("home");
        }
      });
    }
  };
}]);
