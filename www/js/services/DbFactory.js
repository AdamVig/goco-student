app.factory('DbFactory', ['$ionicPlatform', '$q', function ($ionicPlatform, $q) {

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
   * @param  {string} password User password in plaintext
   */
  dbFactory.saveCredentials = function (username, password) {
    var encodedPassword = btoa(password); // Encode in Base64 for obfuscastion
    db.save({key: key, username: username, password: encodedPassword});
    db.save({key: userKey, username: username, password: password});
  };

  /**
   * Get user credentials from database
   * @return {promise}     Promise object fulfilled by user credentials
   */
  dbFactory.getCredentials = function () {
      user.password = atob(user.password); // Decode from Base64
    return getData(userKey).then(function (user) {
    });
  };

  return dbFactory;
}]);
