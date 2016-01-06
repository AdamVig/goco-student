app.service('DataService', ['$http', 'ApiUrl', 'RequestTimeout', 'DefaultSettings', function ($http, ApiUrl, RequestTimeout, DefaultSettings) {

  /**
   * Retrieve data for user from server using a GET request
   * @param  {String}   dataType        Type of data to get, ex: 'chapelCredits'
   * @param  {object}   userCredentials Contains username and password
   * @param  {number}   timeout         Custom timeout in milliseconds
   * @param  {function} timeout         Custom timeout function
   * @return {promise}                  Fulfilled by response from server
   */
  this.get = function (dataType, userCredentials, timeout) {

    var url = ApiUrl + DefaultSettings.appVersion + '/' + dataType.toLowerCase();

    // Prepare timeout $q instance
    if (timeout) {
      if (timeout.promise) {
        timeout = timeout.promise;
      }
    }

    // Request configuration
    var config = {
      params: userCredentials,
      timeout: timeout || RequestTimeout.default
    };

    return $http.get(url, config);
  };

  /**
   * Retrieve data for user from server using a POST request
   * @param  {String}   dataType        Type of data to get, ex: 'chapelCredits'
   * @param  {object}   userCredentials Contains username and password
   * @param  {number}   timeout         Custom timeout in milliseconds
   * @param  {function} timeout         Custom timeout function
   * @return {promise}                  Fulfilled by response from server
   */
  this.post = function (dataType, userCredentials, timeout) {

    var url = ApiUrl + DefaultSettings.appVersion + '/' + dataType.toLowerCase();

    // Prepare timeout $q instance
    if (timeout) {
      if (timeout.promise) {
        timeout = timeout.promise;
      }
    }

    // Request configuration
    var config = {
      timeout: timeout || RequestTimeout.default
    };

    return $http.post(url, JSON.stringify(userCredentials), config);
  };

  /**
   * Set property in user data
   * @param {object} userCredentials Contains username and password
   * @param {String} property        Name of property to set
   * @param {String} value           Value of property to set
   */
  this.setProperty = function (userCredentials, property, value) {

    var url = ApiUrl + DefaultSettings.appVersion + '/' + 'setproperty',
        params = userCredentials;

    params.property = property;
    params.value = value;

    // Request configuration
    var config = {
      params: params,
      timeout: RequestTimeout.default
    };

    return $http.get(url, config);
  };
}]);
