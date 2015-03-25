app.service('StorageService', ['$window', '$sce', function ($window, $sce) {

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
}]);
