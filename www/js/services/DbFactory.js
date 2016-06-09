app.factory("DbFactory", ["$ionicPlatform", "$q", function ($ionicPlatform, $q) {

  var dbFactory = this;
  var db;
  var userKey = "credentials";
  var settingsKey = "settings";
  var modulesKey = "module_settings";

  // Create database object when device is ready
  var dataPromise = $ionicPlatform.ready(function() {
    db = Lawnchair({name:"goco", record:"data"}); // jshint ignore:line
  });

  /**
   * Get data from database
   * @param  {string} key ID of data to get
   * @return {promise}     Promise object fulfilled by retrieved data
   */
  var getData = function (key) {
    return dataPromise.then(function () {
      var deferred = $q.defer();

      db.get(key, function (data) {
        if (data) {
          delete data.key; // Remove database key from object
        }
        deferred.resolve(data);
      });

      return deferred.promise;
    });
  };

  /**
   * Check if a key exists in the database
   * @param  {string} key Possible database key
   * @return {promise}    Promise fulfilled by whether or not
   *                      key exists in database (boolean)
   */
  var checkKey = function (key) {
    return dataPromise.then(function () {
      var deferred = $q.defer();

      db.exists(key, function (exists) {
        deferred.resolve(exists);
      });

      return deferred.promise;
    });
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

  dbFactory.saveModuleSettings = function (modules) {
    modules.key = modulesKey;
    db.save(modules);
  };

  dbFactory.getModuleSettings = function () {
    return getData(modulesKey);
  };

  /**
   * Check if credentials exist in database
   * Runs once when application loads to set state
   * @return {promise} Promise fulfilled by a whether or not
   *                   credentials exist in database (boolean)
   */
  dbFactory.checkCredentials = function () {
    return checkKey(userKey);
  };

  return dbFactory;
}]);
