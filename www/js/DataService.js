app.service('DataService', ['$http', '$window', 'ApiUrl', function ($http, $window, ApiUrl) {

  /**
   * Get chapel credit for user from server
   * @param  {object}  userCredentials Contains username and password
   * @return {promise}                 Fulfilled by response from server
   */
  this.getChapelCredit = function (userCredentials) {

    // Base64 encode password
    userCredentials.password = $window.btoa(userCredentials.password);

    var config = {
      params: userCredentials,
      timeout: 16000
    };

    return $http.get(ApiUrl + 'chapelcredit', config);
  };
}]);
