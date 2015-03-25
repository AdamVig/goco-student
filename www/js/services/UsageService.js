app.service('UsageService', ['$filter', 'DatabaseFactory', 'AppVersion', function ($filter, DatabaseFactory, AppVersion) {

  /**
   * Log user usage
   * @param {String} username firstname.lastname
   * @param {String} dataType Type of data requested, ex: 'chapelCredits'
   */
  this.log = function (username, dataType) {

    var userData;

    DatabaseFactory.get(username).
    success(function (response) {

      // Update usage info if user exists in database
      userData = response;
      userData.lastLogin = $filter('date')(Date.now(), 'short');
      userData.platform = getPlatform();
      userData.appVersion = AppVersion;

      // Increment total logins
      incrementProperty(userData, 'totalLogins');

      // Increment data requests
      if (!userData.dataRequests) userData.dataRequests = {};
      incrementProperty(userData.dataRequests, dataType);

    }).
    error(function (response) {

      // Create new usage info if user doesn't exist in database
      userData = {
        '_id': username,
        'firstLogin': $filter('date')(Date.now(), 'short'),
        'lastLogin': $filter('date')(Date.now(), 'short'),
        'totalLogins': 1,
        'dataRequests': {
          dataType: 1
        },
        'platform': getPlatform(),
        'appVersion': AppVersion
      };

    }).
    finally(function () {
      return DatabaseFactory.insert(userData);
    });
  };

  /**
   * Add or create numerical property on an object
   * @param {object} obj  Object to modify
   * @param {String} prop Name of property to add to or create
   */
  function incrementProperty(obj, prop) {
    if (obj[prop]) obj[prop]++;
    else obj[prop] = 1;

    return obj;
  }

  /**
   * Get platform of device
   * @return {object}   Contains name and version of platform
   */
  function getPlatform() {
    return {
      "name": ionic.Platform.platform(),
      "version": ionic.Platform.version()
    };
  }
}]);
