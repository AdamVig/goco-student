app.filter('NameFilter', [function () {

  /**
   * Split username into object
   * @param  {string} username Format firstname.lastname
   * @return {object}          Contains capitalized first and last names
   */
  return function (username) {
    var nameSplit = username.split('.');
    return {
      "first": nameSplit[0].charAt(0).toUpperCase() + nameSplit[0].slice(1),
      "last": nameSplit[1].charAt(0).toUpperCase() + nameSplit[1].slice(1)
    };
  };
}]);
