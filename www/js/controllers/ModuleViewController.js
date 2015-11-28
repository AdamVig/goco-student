app.controller('ModuleViewController', ['$scope', '$timeout', '$stateParams', 'twemoji', 'ErrorMessages', 'DataService', 'StorageService', 'RequestTimeout', function ($scope, $timeout, $stateParams, twemoji, ErrorMessages, DataService, StorageService, RequestTimeout) {
  var moduleView = this;
  moduleView.minLoadingTimeMs = 500;
  moduleView.data = {};

  moduleView.endpoint = $stateParams.endpoint;
  moduleView.label = $stateParams.label;
  moduleView.icon = $stateParams.icon;
  moduleView.color = $stateParams.color;
  moduleView.templateURL = 'html/moduleviews/_' + moduleView.endpoint + '.html';
  moduleView.userCredentials = StorageService.retrieveCredentials();

  moduleView.loading = true;
  var startTime = new Date().getTime();

  DataService.post(moduleView.endpoint, moduleView.userCredentials)
  .success(function (response) {
    moduleView.data = response.data;
    $scope.moduleViewData = response.data;
    if (response.data.expiration) {
      delete response.data.expiration;
    }
  })
  .error(function (response, status) {
    var respTime = new Date().getTime() - startTime;

    if (response) {
      moduleView.errorMessage = twemoji(response);
    } else if (respTime >= RequestTimeout.default){
      moduleView.errorMessage = ErrorMessages.timeout;
    } else {
      moduleView.errorMessage = ErrorMessages.unknown;
    }
  })
  .finally(function () {
    $timeout(function () {
      moduleView.loading = false;
    }, moduleView.minLoadingTimeMs);
  });


}]);
