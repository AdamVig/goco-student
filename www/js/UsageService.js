app.service('UsageService', ['$filter', 'DatabaseFactory', function ($filter, DatabaseFactory) {

  /**
   * Log user usage
   * @param  {string} username firstname.lastname
   */
  this.log = function (username) {

    DatabaseFactory.get(username).then(function (response) {
      var userData;

      // Update usage info if user exists in database
      if (response.status == 200) {

        userData = response.data;
        userData.lastLogin = $filter('date')(Date.now(), 'short');
        userData.totalLogins++;

      // Create new usage info if user doesn't exist in database
      } else {

        userData = {
          '_id': chapel.userCredentials.username,
          'firstLogin': $filter('date')(Date.now(), 'short'),
          'lastLogin': $filter('date')(Date.now(), 'short'),
          'totalLogins': 1
        };
      }

      return DatabaseFactory.insert(userData);
    });
  };
}]);
