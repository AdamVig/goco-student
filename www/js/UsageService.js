app.service('UsageService', ['$filter', 'DatabaseFactory', function ($filter, DatabaseFactory) {

  /**
   * Log user usage
   * @param  {string} username firstname.lastname
   */
  this.log = function (username) {

    var userData;

    DatabaseFactory.get(username).
    success(function (response) {

      // Update usage info if user exists in database
      userData = response;
      userData.lastLogin = $filter('date')(Date.now(), 'short');

      // Check for existence of totalLogins before incrementing
      if (userData.totalLogins) {
        userData.totalLogins++;
      } else {
        userData.totalLogins = 1;
      }


    }).
    error(function (response) {

      // Create new usage info if user doesn't exist in database
      userData = {
        '_id': username,
        'firstLogin': $filter('date')(Date.now(), 'short'),
        'lastLogin': $filter('date')(Date.now(), 'short'),
        'totalLogins': 1
      };

    }).
    finally(function () {

      return DatabaseFactory.insert(userData);

    });


  };
}]);
