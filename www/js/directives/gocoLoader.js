app.directive("gocoLoader", function () {
  return {
    restrict: "E",
    scope: {
      "icon": "="
    },
    templateUrl: "html/directives/_gocoloader.html",
    controllerAs: "gocoLoader",
    controller: ["$scope", function ($scope) {

      var gocoLoader = this;

      gocoLoader.icon = $scope.icon;
    }]
  };
});
