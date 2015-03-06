app.service('StorageService', ['$window', '$sce', function ($window, $sce) {

  /**
   * Store user credentials in localStorage
   * @param {object} userCredentials Contains username and password
   */
  this.storeCredentials = function (userCredentials) {
    $window.localStorage['Gordon.Username'] = userCredentials.username.toLowerCase();
    $window.localStorage['Gordon.Password'] = $window.btoa(userCredentials.password);
  };

  /**
   * Get user credentials from localStorage
   * @return {object}       Contains username and password
   */
  this.retrieveCredentials = function () {
    if ($window.localStorage['Gordon.Username'] && $window.localStorage['Gordon.Password']) {
      return {
        "username": $window.localStorage['Gordon.Username'],
        "password": $window.localStorage['Gordon.Password']
      };
    } else {
      return false;
    }
  };

  /**
   * Erase user credentials from localStorage
   */
  this.eraseCredentials = function () {
    delete $window.localStorage['Gordon.Username'];
    delete $window.localStorage['Gordon.Password'];
  };

  /**
   * Store banner title and body in localStorage
   * @param {object} banner Contains banner title and body
   */
  this.storeBanner = function (banner) {
    $window.localStorage['GoCoStudent.bannerTitle'] = banner.title;
    $window.localStorage['GoCoStudent.bannerBody'] = banner.body;
  };

  /**
   * Get banner title and body from localStorage
   * @return {object}     Contains banner body as HTML and title
   */
  this.retrieveBanner = function () {

    bannerTitle = $window.localStorage['GoCoStudent.bannerTitle'];
    bannerBody = $window.localStorage['GoCoStudent.bannerBody'];

    return {
      'title': bannerTitle,
      'body': $sce.trustAsHtml(bannerBody)
    };
  };

}]);
