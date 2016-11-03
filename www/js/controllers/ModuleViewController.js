app.controller("ModuleViewController", ["$scope", "$timeout", "$stateParams", "twemoji", "ErrorMessages", "DataService", "RequestTimeout", "DbFactory", function ($scope, $timeout, $stateParams, twemoji, ErrorMessages, DataService, RequestTimeout, DbFactory) {
  var moduleView = this;
  moduleView.minLoadingTimeMs = 500;
  moduleView.data = {};

  moduleView.endpoint = $stateParams.endpoint;
  moduleView.httpMethod = $stateParams.httpMethod;
  moduleView.label = $stateParams.label;
  moduleView.icon = $stateParams.icon;
  moduleView.color = $stateParams.color;
  moduleView.templateURL = "html/moduleviews/_" + moduleView.endpoint + ".html";

  moduleView.refresh = function () {
    moduleView.errorMessage = null;
    moduleView.loading = true;

    var hasCredentials = false;
    var startTime = new Date().getTime();

    DbFactory.getCredentials().then(function (userCredentials) {
      if (userCredentials) {
        hasCredentials = true;

        // Use HTTP method specified in module configuration
        if (moduleView.httpMethod === "post") {
          return DataService.post(moduleView.endpoint, userCredentials);
        } else if (moduleView.httpMethod === "get") {
          return DataService.get(moduleView.endpoint, userCredentials.username);
        } else {
          throw new Error("Method " + moduleView.httpMethod + " not supported.");
        }

      } else {
        throw new ReferenceError("No user credentials found in database.");
      }
    }).then(function success(response) {
      moduleView.data = response.data.data;
      if (moduleView.data.expiration) {
        delete moduleView.data.expiration;
      }
      $scope.moduleViewData = moduleView.data;
    }, function error(response) {

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
      moduleView.loading = false; // Immediately stop loading

    }).finally(function () {
      $timeout(function () {
        moduleView.loading = false;
      }, moduleView.minLoadingTimeMs);
    });
  };

  moduleView.refresh();
}]);
