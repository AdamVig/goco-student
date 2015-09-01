app.directive('gocoModule', function () {
  return {
    restrict: 'E',
    scope: {
      moduleType: '=',
      endpoint: '=',
      label: '=',
      icon: '=',
      moduleClass: '=',
      prefix: '=',
      suffix: '=',
      moduleControl: '=',
      loadCallback: '&'
    },
    templateUrl: 'html/directives/_gocomodule.html',
    controllerAs: 'module',
    controller: ['$scope', '$filter', '$state', 'DataService', 'StorageService', 'Modules', 'RequestTimeout', 'ErrorMessages', 'twemoji', function ($scope, $filter, $state, DataService, StorageService, Modules, RequestTimeout, ErrorMessages, twemoji) {

      var module = this;
      module.userCredentials = StorageService.retrieveCredentials();

      module.moduleType = $scope.moduleType;
      module.endpoint = $scope.endpoint;
      module.label = $scope.label;
      module.icon = $scope.icon;
      module.moduleClass = $scope.moduleClass;
      module.prefix = $scope.prefix;
      module.suffix = $scope.suffix;
      module.moduleControl = $scope.moduleControl;

      module.delegateAction = function () {
        if (module.moduleType == 'info') {
          module.load();
        } else {
          module.goToView();
        }
      };

      module.load = function () {

        // Do not try to get data if already loading
        if (!module.loading) {

          module.loading = true;
          module.errorMessage = null;
          var startTime = new Date().getTime();

          // Get data from server
          DataService.post(module.endpoint, module.userCredentials).
          success(function(response) {

            try {
              // Make sure data displays even if value is falsy
              module.data = response.data.toString();
            } catch (e) {
              throw new Error("No data received from info module request.");
            }


            // Get "out of" amount if provided
            if (response.outof) module.outOf = response.outof;
          }).
          error(function(response, status) {

            var respTime = new Date().getTime() - startTime;

            // Make error message
            if (response) {
              module.errorMessage = twemoji(response);
            } else if (respTime >= RequestTimeout.default){
              module.errorMessage = ErrorMessages.timeout;
            } else {
              module.errorMessage = ErrorMessages.unknown;
            }
          }).
          finally(function() {
            module.loading = false;
            $scope.loadCallback();
          });
        }
      };
      $scope.moduleControl.push(module.load);
      if (module.moduleType == 'info') {
        $scope.moduleControl.push(module.load);
      }
    }]
  };
});
