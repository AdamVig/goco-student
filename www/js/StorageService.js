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
   * Store banner title and body in localStorage
   * @param {object} banner Contains banner title and body
   */
  this.storeBanner = function (banner) {
    $window.localStorage[storagePrefix + 'bannerTitle'] = banner.title;
    $window.localStorage[storagePrefix + 'bannerBody'] = banner.body;
  };

  /**
   * Get banner title and body from localStorage
   * @return {object}     Contains banner body as HTML and title
   */
  this.retrieveBanner = function () {

    bannerTitle = $window.localStorage[storagePrefix + 'bannerTitle'];
    bannerBody = $window.localStorage[storagePrefix + 'bannerBody'];

    return {
      'title': bannerTitle,
      'body': $sce.trustAsHtml(bannerBody)
    };
  };

}]);
