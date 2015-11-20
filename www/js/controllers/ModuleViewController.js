app.controller('ModuleViewController', ['$stateParams', 'twemoji', 'ErrorMessages', 'DataService', 'StorageService', 'RequestTimeout', function ($stateParams, twemoji, ErrorMessages, DataService, StorageService, RequestTimeout) {
  var moduleView = this;
  moduleView.data = {};

  moduleView.endpoint = $stateParams.endpoint;
  moduleView.icon = $stateParams.icon;
  moduleView.templateURL = 'html/moduleviews/_' + moduleView.endpoint + '.html';
  moduleView.userCredentials = StorageService.retrieveCredentials();

  moduleView.loading = true;
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
    moduleView.loading = false;
  });


}]);
