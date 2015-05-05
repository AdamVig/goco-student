app.directive('infoModule', function () {
  return {
    restrict: 'E',
    scope: {
      infoType: '=',
      infoLabel: '=',
      iconClass: '=',
      colorClass: '=',
      infoPrefix: '=',
      loadCallback: '&'
    },
    templateUrl: 'html/directives/_infomodule.html',
    controllerAs: 'module',
    controller: ['$scope', '$filter', 'DataService', 'StorageService', 'Modules', 'RequestTimeout', function ($scope, $filter, DataService, StorageService, Modules, RequestTimeout) {

      var module = this;
      module.prefix = $scope.infoPrefix;
      module.label = $scope.infoLabel;
      module.fullClass = $scope.colorClass;
      module.iconClass = $scope.iconClass;
      module.userCredentials = StorageService.retrieveCredentials();

      module.load = function () {

        // Do not try to get data if already loading
        if (!module.loading) {

          module.loading = true;
          module.errorMessage = null;
          var startTime = new Date().getTime();

          // Get data from server
          DataService.get(module.dataType, module.userCredentials).
          success(function(response) {

            module.data = response.data;

            // Round mealpoints
            if (module.dataType == 'mealPoints' ||
                module.dataType == 'mealPointsPerDay') {
              module.data = Math.round(module.data);
            }

            // Add space to student ID
            if (module.dataType == 'studentID') {
              module.data = module.data.toString();
              module.data = module.data.substr(0, 4) + ' ' +
                module.data.substr(4, 4);
            }

            // Get "out of" amount if provided
            if (response.outof) module.outOf = response.outof;
          }).
          error(function(response, status) {

            var respTime = new Date().getTime() - startTime;
            if (respTime >= RequestTimeout.default){
              module.errorMessage = DataService.handleError(response, "timeout", module.label);
            } else {
              module.errorMessage = DataService.handleError(response, status, module.label);
            }
          }).
          finally(function() {
            module.loading = false;
            $scope.loadCallback();
          });
        }
      };
    }]
  };
});
