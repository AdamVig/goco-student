app.service('StorageService', ['$window', '$sce', 'AppVersion', function ($window, $sce, AppVersion) {

  // String to prefix all keys in localStorage with
  var storagePrefix = "GoCoStudent.";

  /**
   * Store user credentials in localStorage
   * @param {object} userCredentials Contains username and password
   */
  this.storeCredentials = function (userCredentials) {
    $window.localStorage[storagePrefix + 'username'] = userCredentials.username.toLowerCase();
    $window.localStorage[storagePrefix + 'password'] = $window.btoa(userCredentials.password);

    // Remove legacy credentials
    delete $window.localStorage['Gordon.Username'];
    delete $window.localStorage['Gordon.Password'];
  };

  /**
   * Get user credentials from localStorage
   * @return {object}       Contains username and password
   */
  this.retrieveCredentials = function () {
    if ($window.localStorage[storagePrefix + 'username'] &&
        $window.localStorage[storagePrefix + 'password']) {
      return {
        "username": $window.localStorage[storagePrefix + 'username'],
        "password": $window.localStorage[storagePrefix + 'password']
      };
    } else {
      return false;
    }
  };

  /**
   * Erase user credentials from localStorage
   */
  this.eraseCredentials = function () {
    delete $window.localStorage[storagePrefix + 'username'];
    delete $window.localStorage[storagePrefix + 'password'];
  };

  /**
   * Store user-selected modules in localStorage
   * @param {array} allModules List of module objects, each contains name
   */
  this.storeModules = function (allModules) {
    var keyName = storagePrefix + 'modules';
    $window.localStorage[storagePrefix + 'version'] = AppVersion;
    $window.localStorage[keyName] = angular.toJson(allModules);
  };

  /**
   * Retrieve stored app version
   */
  this.retrieveAppVersion = function () {
    var keyName = storagePrefix + 'version';
    return $window.localStorage[keyName];
  };

  /**
   * Retrieve selected modules from localStorage
   * @return {array}    List of all modules marked as selected or not
   */
  this.retrieveModules = function () {

    // Get list of module names from localStorage
    var keyName = storagePrefix + 'modules';

    if ($window.localStorage[keyName])
      return JSON.parse($window.localStorage[keyName]);
    else
      return null;
  };

  /**
   * Erase user-selected modules in localStorage
   */
  this.eraseModules = function () {
    var keyName = storagePrefix + 'modules';
    delete $window.localStorage[keyName];
  };
}]);
