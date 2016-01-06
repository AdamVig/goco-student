app.factory('DbFactory', ['$ionicPlatform', '$q', '$filter', function ($ionicPlatform, $q, $filter) {

  var dbFactory = this;
  var db;
  var userKey = 'credentials';
  var settingsKey = 'settings';

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
      if (data) {
        delete data.key; // Remove database key from object
      }
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
    return getData(userKey);
  };

  /**
   * Delete credentials from database
   */
  dbFactory.deleteCredentials = function () {
    db.remove(userKey);
  };

  /**
   * Save settings to database
   * @param  {object} settings Contains app settings
   */
  dbFactory.saveSettings = function (settings) {
    settings.key = settingsKey;
    db.save(settings);
  };

  /**
   * Get settings from database
   * @return {promise} Promise object fulfilled by settings
   */
  dbFactory.getSettings = function () {
    return getData(settingsKey);
  };

  return dbFactory;
}]);
