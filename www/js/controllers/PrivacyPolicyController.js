app.controller("PrivacyPolicyController", ["$state", "$stateParams", "DataService", "DbFactory", "PopupService", function ($state, $stateParams, DataService, DbFactory, PopupService) {

  var privacyPolicy = this;
  privacyPolicy.status = "checking";
  privacyPolicy.user = {};
  privacyPolicy.timeout = false;
  privacyPolicy.userCredentials = {};
  privacyPolicy.user = $stateParams.user;

  DbFactory.getCredentials().then(function (credentials) {
    privacyPolicy.userCredentials = credentials;
  });

  // Continue from privacy policy to home
  privacyPolicy.go = function (accepted) {

    // Accept privacy policy
    if (accepted) {
      privacyPolicy.user.privacyPolicy = "accepted";
      DataService.put("user/" + privacyPolicy.userCredentials.username,
                      {data: privacyPolicy.user});
      $state.go("home");

    // Deny privacy policy
    } else {
      PopupService.showPopup("confirmOptOut")
      .then(function (result) {
        if (result) {
          privacyPolicy.user.privacyPolicy = "denied";
          DataService.put("user/" + privacyPolicy.userCredentials.username,
                          {data: privacyPolicy.user});
          $state.go("home");
        }
      });
    }
  };
}]);
