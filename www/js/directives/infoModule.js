app.directive('infoModule', function () {
  return {
    restrict: 'E',
    scope: {
      infoType: '=',
      infoLabel: '=',
      iconClass: '=',
      infoPrefix: '='
    },
    templateUrl: 'html/directives/_infomodule.html',
    controllerAs: 'module',
    controller: ['$scope', '$filter', 'DataService', 'StorageService', 'Modules', function ($scope, $filter, DataService, StorageService, Modules) {

      var module = this;
      module.dataType = $scope.infoType;
      module.prefix = $scope.infoPrefix;
      module.label = $scope.infoLabel;
      module.className = $filter('camelCaseToDashSeparated')(module.dataType);
      module.iconClass = $scope.iconClass;
      module.userCredentials = StorageService.retrieveCredentials();

      module.load = function () {

        // Do not try to get data if already loading
        if (!module.loading) {

          module.loading = true;
          module.errorMessage = null;

          // Get data from server
          DataService.get(module.dataType, module.userCredentials).
          success(function(response) {

            module.data = response.data;

            // Round mealpoints
            if (module.dataType == 'mealPoints' ||
                module.dataType == 'mealPointsPerDay') {
              module.data = Math.round(module.data);
            }

            // Get "out of" amount if provided
            if (response.outof) module.outOf = response.outof;
          }).
          error(function(response, status) {
            console.error(module.label, "error, got response", response);
            module.errorMessage = DataService.handleError(response, status, module.label);
          }).
          finally(function() {
            module.loading = false;
          });
        }
      };
    }]
  };
});
