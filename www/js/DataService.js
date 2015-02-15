app.service('DataService', ['$http', 'ApiUrl', function ($http, ApiUrl) {

  /**
   * Get chapel credit for user from server
   * @param  {object}  userCredentials Contains username and password
   * @return {promise}                 Fulfilled by response from server
   */
  this.getChapelCredit = function (userCredentials) {

    var config = {
      params: userCredentials,
      timeout: 16000
    };

    return $http.get(ApiUrl + 'chapelcredit', config);
  };
}]);
