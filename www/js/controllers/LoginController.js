app.controller('LoginController', ['$state', 'StorageService', 'DataService', function ($state, StorageService, DataService) {

  var login = this;
  login.userCredentials = {
    "username": "",
    "password": ""
  };
  login.loginUser = function () {

    // Remove email domain if entered
    if (login.userCredentials.username.indexOf('@') > -1) {
      login.userCredentials.username = login.userCredentials.username.
        split('@')[0];
    }
    StorageService.storeCredentials(login.userCredentials);
    DataService.get('createuser', StorageService.retrieveCredentials());

    $state.go('home');
  };
}]);
