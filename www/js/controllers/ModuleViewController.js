app.controller('ModuleViewController', ['$scope', '$timeout', '$stateParams', 'twemoji', 'ErrorMessages', 'DataService', 'RequestTimeout', 'DbFactory', function ($scope, $timeout, $stateParams, twemoji, ErrorMessages, DataService, RequestTimeout, DbFactory) {
  var moduleView = this;
  moduleView.minLoadingTimeMs = 500;
  moduleView.data = {};

  moduleView.endpoint = $stateParams.endpoint;
  moduleView.label = $stateParams.label;
  moduleView.icon = $stateParams.icon;
  moduleView.color = $stateParams.color;
  moduleView.templateURL = 'html/moduleviews/_' + moduleView.endpoint + '.html';

  moduleView.loading = true;
  var hasCredentials = false;
  var startTime = new Date().getTime();

  DbFactory.getCredentials().then(function (userCredentials) {
    if (userCredentials) {
      hasCredentials = true;
      return DataService.post(moduleView.endpoint, userCredentials);
    } else {
      throw new ReferenceError("No user credentials found in database.");
    }
  })
  .then(function (response) {
    moduleView.data = response.data.data;
    if (moduleView.data.expiration) {
      delete moduleView.data.expiration;
    }
    $scope.moduleViewData = moduleView.data;
  }, function (response, status) {

    // Make error message
    try {
      moduleView.errorMessage = twemoji(response);
    } catch (e) {

      var respTime = new Date().getTime() - startTime;
      if (respTime >= RequestTimeout.default){
        moduleView.errorMessage = ErrorMessages.timeout;
      } else if (hasCredentials === false) {
        moduleView.errorMessage = ErrorMessages.noCredentials;
      } else {
        moduleView.errorMessage = ErrorMessages.unknown;
      }
    }
  })
  .finally(function () {
    $timeout(function () {
      moduleView.loading = false;
    }, moduleView.minLoadingTimeMs);
  });


}]);
