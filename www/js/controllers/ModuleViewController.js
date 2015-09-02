app.controller('ModuleViewController', ['$stateParams', '$ionicLoading', 'twemoji', 'ErrorMessages', 'DataService', 'StorageService', function ($stateParams, $ionicLoading, twemoji, ErrorMessages, DataService, StorageService) {
  var moduleView = this;
  moduleView.data = {};

  moduleView.endpoint = $stateParams.endpoint;
  moduleView.templateURL = 'html/moduleviews/_' + moduleView.endpoint + '.html';
  moduleView.userCredentials = StorageService.retrieveCredentials();

  $ionicLoading.show({
    template: 'Loading...'
  });
  var startTime = new Date().getTime();

  DataService.post(moduleView.endpoint, moduleView.userCredentials)
  .success(function (response) {
    moduleView.data = response.data;
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
    $ionicLoading.hide();
  });


}]);
