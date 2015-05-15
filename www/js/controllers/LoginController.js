app.controller('LoginController', ['$state', 'StorageService', 'DataService', function ($state, StorageService, DataService) {

  var login = this;
  login.userCredentials = {
    "username": "",
    "password": ""
  };

  /* Process credentials, create user in database, redirect to next view */
  login.loginUser = function () {

    login.userCredentials.username = $filter('username')(login.userCredentials.username);
    StorageService.storeCredentials(login.userCredentials);

    // Attempt to create user in database
    DataService.get('createuser', StorageService.retrieveCredentials());

    $state.go('postLogin');
  };
}]);
