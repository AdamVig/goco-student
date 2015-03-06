app.controller('LoginController', ['$state', 'StorageService', 'DatabaseFactory', function ($state, StorageService, DatabaseFactory) {

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

    // Get banner message from database
    DatabaseFactory.get('message').then(function (response) {
      if (response.data) {
        if (response.data.body != "") {
          StorageService.storeBanner(response.data);
        }
      }
    });

    $state.go('home');
  };
}]);
