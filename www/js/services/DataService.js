app.service("DataService", ["$http", "ApiUrl", "RequestTimeout", "DefaultSettings", function ($http, ApiUrl, RequestTimeout, DefaultSettings) {

  this.headers = {
    "X-Platform": ionic.Platform.platform(),
    "X-Platform-Version": ionic.Platform.version(),
    "X-App-Version": DefaultSettings.appVersion
  };

  /**
   * Retrieve data for user from server using a GET request
   * @param  {String}   dataType        Type of data to get, ex: "chapelCredits"
   * @param  {String}   username        Username of logged in user
   * @param  {number}   timeout         Custom timeout in milliseconds
   * @param  {function} timeout         Custom timeout function
   * @return {promise}                  Fulfilled by response from server
   */
  this.get = function (dataType, username, timeout) {

    var url = ApiUrl + dataType.toLowerCase();

    // Prepare timeout $q instance
    if (timeout) {
      if (timeout.promise) {
        timeout = timeout.promise;
      }
    }

    // Request configuration
    var config = {
      timeout: timeout || RequestTimeout.default,
      headers: this.headers,
      params: {username: username}
    };

    return $http.get(url, config);
  };

  /**
   * Retrieve data for user from server using a POST request
   * @param  {String}   dataType        Type of data to get, ex: "chapelCredits"
   * @param  {object}   userCredentials Contains username and password
   * @param  {number}   timeout         Custom timeout in milliseconds
   * @param  {function} timeout         Custom timeout function
   * @return {promise}                  Fulfilled by response from server
   */
  this.post = function (dataType, userCredentials, timeout) {

    var url = ApiUrl + dataType.toLowerCase();

    // Prepare timeout $q instance
    if (timeout) {
      if (timeout.promise) {
        timeout = timeout.promise;
      }
    }

    // Request configuration
    var config = {
      timeout: timeout || RequestTimeout.default,
      headers: this.headers
    };

    return $http.post(url, JSON.stringify(userCredentials), config);
  };

    /**
   * Modify data on server using a PUT request
   * @param  {String}   url        Relative URL to access
   * @param  {object}   userData Contains username and password
   * @param  {number}   timeout         Custom timeout in milliseconds
   * @param  {function} timeout         Custom timeout function
   * @return {promise}                  Fulfilled by response from server
   */
  this.put = function (url, userData, timeout) {

    var url = ApiUrl + url.toLowerCase();

    // Prepare timeout $q instance
    if (timeout) {
      if (timeout.promise) {
        timeout = timeout.promise;
      }
    }

    // Request configuration
    var config = {
      timeout: timeout || RequestTimeout.default,
      headers: this.headers
    };

    return $http.put(url, JSON.stringify(userData), config);
  };
}]);
