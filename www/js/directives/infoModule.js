app.directive('infoModule', function () {
  return {
    restrict: 'E',
    scope: {
      infoType: '=',
      infoLabel: '=',
      iconClass: '='
    },
    templateUrl: '../html/directives/_infomodule.html',
    controllerAs: 'module',
    controller: ['$scope', '$filter', 'DataService', 'StorageService', 'UsageService', 'Modules', function ($scope, $filter, DataService, StorageService, UsageService, Modules) {

      var module = this;
      module.dataType = $scope.infoType;
      module.label = $scope.infoLabel;
      module.className = $filter('camelCaseToDashSeparated')(module.dataType);
      module.iconClass = $scope.iconClass;
      module.userCredentials = StorageService.retrieveCredentials();

      module.load = function () {

        module.loading = true;
        module.errorMessage = null;

        // Get data from server
        DataService.get(module.dataType, module.userCredentials).
        success(function(data) {

          // Account for different data format in mealpoints endpoint
          if (module.dataType != 'mealPoints') module.data = data.amount;
          else module.data = DataService.stripDecimal(data.mealpoints);

          // Get "out of" amount if provided
          if (data.outof) module.outOf = data.outof;
          module.loading = false;
          UsageService.log(module.userCredentials.username, module.dataType);
        }).
        error(function(data, status) {
          console.error("Could not find", module.label);
          module.errorMessage = DataService.handleError(data, status, module.label);
        }).
        finally(function() {
          module.loading = false;
        });
      };
    }]
  };
});
