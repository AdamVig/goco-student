app.controller('LoginController', ['$state', '$q', '$timeout', '$filter', 'DataService', 'DbFactory', function ($state, $q, $timeout, $filter, DataService, DbFactory) {

  var login = this;
  var loginCheckTimeout = 16000;
  var timeoutPromise = null;
  login.user = null;
  login.status = false;
  login.userCredentials = {
    "username": "",
    "password": ""
  };

  /* Process credentials, create user in database, redirect to next view */
  login.loginUser = function () {

    login.userCredentials.username = $filter('username')(login.userCredentials.username);
    login.userCredentials.password = $filter('password')(login.userCredentials.password, 'encode');

    checkLogin().then(function (response) {
      login.user = response.data.data;

      DbFactory.saveCredentials(login.userCredentials.username,
          login.userCredentials.password);

      if (login.user.hasOwnProperty('privacyPolicy')) {
        $state.go('home');
      } else {
        $state.go('privacyPolicy');
      }
    });
  };

  // Check if user login is valid or not
  function checkLogin() {

    login.status = 'status-loading';


    return DataService.get('checklogin',
        login.userCredentials,
        loginCheckTimeout).
    success(function (response) {
      login.status = false;

      return DataService.get('createuser', login.userCredentials);
    }).
    error(function (response, status) {
      if (status == 401) {
        login.status = 'status-invalid';
        login.userCredentials.password = ''; // Only reset password
      } else {
        $state.go('home');
      }
    });
  }
}]);
