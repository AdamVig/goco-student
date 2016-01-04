app.factory('DbFactory', ['$ionicPlatform', '$q', function ($ionicPlatform, $q) {

  var dbFactory = this;
  var db;

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


  return dbFactory;
}]);
