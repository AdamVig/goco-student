app.factory('DbFactory', ['$ionicPlatform', '$q', '$filter', function ($ionicPlatform, $q, $filter) {

  var dbFactory = this;
  var db;
  var userKey = 'credentials';

  // Create database object when device is ready
  $ionicPlatform.ready(function() {
    db = Lawnchair({name:'goco', record:'data'});
  });

  /**
   * Get data from database
   * @param  {string} key ID of data to get
   * @return {promise}     Promise object fulfilled by retrieved data
   */
  var getData = function (key) {
    var deferred = $q.defer();

    db.get(key, function (data) {
      deferred.resolve(data);
    });

    return deferred.promise;
  };

  /**
   * Save user credentials to database
   * @param  {string} username Firstname.Lastname
   * @param  {string} password User password encoded in Base64
   */
  dbFactory.saveCredentials = function (username, password) {
    db.save({key: userKey, username: username, password: password});
  };

  /**
   * Get user credentials from database
   * @return {promise}     Promise object fulfilled by user credentials
   */
  dbFactory.getCredentials = function () {
    return getData(userKey).then(function (user) {
      user.password = $filter('password')(user.password, 'decode'); // Decode from Base64
      return user;
    });
  };

  return dbFactory;
}]);
