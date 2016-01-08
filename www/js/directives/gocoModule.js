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
      moduleControl: '='
    },
    templateUrl: 'html/directives/_gocomodule.html',
    controllerAs: 'module',
    controller: ['$rootScope', '$scope', '$filter', '$state', '$timeout', 'DataService', 'Modules', 'RequestTimeout', 'ErrorMessages', 'twemoji', 'DbFactory', function ($rootScope, $scope, $filter, $state, $timeout, DataService, Modules, RequestTimeout, ErrorMessages, twemoji, DbFactory) {

      var module = this;
      var animationTime = 1500;
      module.loading = null;

      module.moduleType = $scope.moduleType;
      module.endpoint = $scope.endpoint;
      module.label = $scope.label;
      module.icon = $scope.icon;
      module.moduleClass = $scope.moduleClass;
      module.prefix = $scope.prefix;
      module.suffix = $scope.suffix;
      module.moduleControl = $scope.moduleControl;

      if (module.endpoint) module.endpoint = module.endpoint.toLowerCase();

      module.delegateAction = function () {
        if (module.moduleType == 'info') {
          module.load();
        } else {
          module.goToView();
        }
      };

      module.load = function () {

        // Do not try to get data if already loading
        if (!module.loading && !module.animating) {

          module.loading = true;
          module.animating = false;
          module.errorMessage = null;
          var hasCredentials = false;
          var startTime = new Date().getTime();

          // Get data from server
          DbFactory.getCredentials().then(function (userCredentials) {
            if (userCredentials) {
              hasCredentials = true;
              return DataService.post(module.endpoint, userCredentials);
            } else {
              throw new ReferenceError("No user credentials found in database.");
            }
          }).then(function(response) {

            try {
              // Make sure data displays even if value is falsy
              module.data = response.data.data.toString();
            } catch (e) {
              throw new Error("No data received from info module request.");
            }

            // Get "out of" amount if provided
            if (response.outof) module.outOf = response.outof;
          }, function(response, status) {

            // Make error message
            try {
              module.errorMessage = twemoji(response);
            } catch (e) {

              var respTime = new Date().getTime() - startTime;
              if (respTime >= RequestTimeout.default){
                module.errorMessage = ErrorMessages.timeout;
              } else if (hasCredentials === false) {
                module.errorMessage = ErrorMessages.noCredentials;
              } else {
                module.errorMessage = ErrorMessages.unknown;
              }
            }
          }).
          finally(function() {
            module.loading = false;
            module.animating = true;

            // Wait for animation to finish
            $timeout(function () {
              module.animating = false;
            }, animationTime);

            $scope.loadCallback();
          });
        }
      };

      if (module.moduleType == 'info') {
        $scope.moduleControl.push(module.load);
      }

      module.goToView = function () {
        var params = {
          'endpoint': module.endpoint,
          'icon': module.icon,
          'color': module.moduleClass,
          'label': module.label
        };
        $state.go('moduleView', params);
      };

      $rootScope.$on('modules:reset', function () {
        module.data = null;
      });

    }]
  };
});
