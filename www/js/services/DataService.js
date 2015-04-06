app.service('DataService', ['$http', '$window', 'ApiUrl', 'RequestTimeout', 'DatabaseFactory', 'StorageService', function ($http, $window, ApiUrl, RequestTimeout, DatabaseFactory, StorageService) {

  /**
   * Get data for user from server
   * @param  {String} dataType        Type of data to get, ex: 'chapelCredits'
   * @param  {object}  userCredentials Contains username and password
   * @return {promise}                 Fulfilled by response from server
   */
  this.get = function (dataType, userCredentials) {

    // Request configuration
    var config = {
      params: userCredentials,
      timeout: RequestTimeout[dataType]
    };

    return $http.get(ApiUrl + dataType.toLowerCase(), config);
  };

  /**
   * Get banner message from database
   */
  this.getBanner = function () {

    return DatabaseFactory.get('message').then(function (response) {

      if (response.data) {

        return removeCouchProperties(response.data);
      } else {

        // Track exception with analytics
        if ($window.analytics) {
          $window.analytics.trackException("Could not retrieve banner.", false);
        }
        return null;
      }
    });
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
      return "Oops! Error. Tap to try again.";
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
