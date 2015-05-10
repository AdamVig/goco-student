app.controller('LoginController', ['$state', 'StorageService', 'DataService', function ($state, StorageService, DataService) {

  var login = this;
  login.userCredentials = {
    "username": "",
    "password": ""
  };

  /* Process credentials, create user in database, redirect to next view */
  login.loginUser = function () {

    // Remove email domain if entered
    if (login.userCredentials.username.indexOf('@') > -1) {
      login.userCredentials.username = login.userCredentials.username.
        split('@')[0];
    }

    // Store credentials and base64 encode password
    StorageService.storeCredentials(login.userCredentials);

    // Attempt to create user in database
    DataService.get('createuser', StorageService.retrieveCredentials());

    $state.go('postLogin');
  };
}]);
