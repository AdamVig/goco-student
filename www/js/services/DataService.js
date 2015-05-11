app.service('DataService', ['$http', '$window', 'ApiUrl', 'AppVersion', 'RequestTimeout', 'StorageService', function ($http, $window, ApiUrl, AppVersion, RequestTimeout, StorageService) {

  /**
   * Get data for user from server
   * @param  {String} dataType        Type of data to get, ex: 'chapelCredits'
   * @param  {object}  userCredentials Contains username and password
   * @return {promise}                 Fulfilled by response from server
   */
  this.get = function (dataType, userCredentials) {

    var url = ApiUrl + AppVersion + '/' + dataType.toLowerCase();

    // Request configuration
    var config = {
      params: userCredentials,
      timeout: RequestTimeout.default
    };

    return $http.get(url, config);
  };

  /**
   * Set property in user data
   * @param {object} userCredentials Contains username and password
   * @param {String} property        Name of property to set
   * @param {String} value           Value of property to set
   */
  this.setProperty = function (userCredentials, property, value) {

    var url = ApiUrl + AppVersion + '/' + 'setproperty',
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

  /**
   * Handle $http error
   * @param {object} data        Contains payload from $http response
   * @param {number} status      HTTP status from $http response
   * @param {string} description Either "chapel credit" or "meal points"
   */
  this.handleError = function (data, status, description) {

    // Track exception with analytics
    if ($window.analytics) {
      $window.analytics.trackException(status + ": " + description, true);
    }

    // Return error message
    if (status == 401) {
      return "Bad login. Log out and try again.";
    } else if (status === 0) {
      console.error(module.label, "error, got response", response);
      return "Oops! Error. Tap to try again.";
    } else if (status == "timeout") {
      return "Request took too long. Tap to try again.";
    } else {
      console.error("Error getting data. Status:", status, "Response:", data);
      return "Something went wrong. Try again later!";
    }
  };

  /**
   * Remove CouchDB properties from doc object
   * @param {object} doc Contains _id, _rev, and other properties
   * @return {object}    Contains properties
   */
  function removeCouchProperties(doc) {
    delete doc._id;
    delete doc._rev;
    return doc;
  }
}]);
