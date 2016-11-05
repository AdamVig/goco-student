app.controller("PrivacyPolicyController", ["$state", "$stateParams", "DataService", "DbFactory", "PopupService", function ($state, $stateParams, DataService, DbFactory, PopupService) {

  var privacyPolicy = this;
  privacyPolicy.status = "checking";
  privacyPolicy.user = {};
  privacyPolicy.timeout = false;
  privacyPolicy.userCredentials = {};
  privacyPolicy.user = $stateParams.user; // Does not seem to work

  DbFactory.getCredentials().then(function (credentials) {
    privacyPolicy.userCredentials = credentials;
  });

  // Continue from privacy policy to home
  privacyPolicy.go = function (accepted) {

    // Accept privacy policy
    if (accepted) {
      DataService
        .get("user/" + privacyPolicy.userCredentials.username,
             privacyPolicy.userCredentials.username)
        .then(function (response) {
          privacyPolicy.user = response.data.data;
          privacyPolicy.user.privacyPolicy = "accepted";
          return DataService.put("user/" +
                                 privacyPolicy.userCredentials.username,
                                 {data: privacyPolicy.user});
        })
        .then(function () {
          $state.go("home");
        });

    // Deny privacy policy
    } else {
      PopupService.showPopup("confirmOptOut")
      .then(function (result) {
        if (result) {
          DataService
            .get("user/" + privacyPolicy.userCredentials.username,
                 privacyPolicy.userCredentials.username)
            .then(function (response) {
              privacyPolicy.user = response.data.data;
              privacyPolicy.user.privacyPolicy = "denied";
              return DataService.put("user/" +
                                     privacyPolicy.userCredentials.username,
                                     {data: privacyPolicy.user});
            })
            .then(function () {
              $state.go("home");
            });
        }
      });
    }
  };
}]);
