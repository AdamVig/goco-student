app.directive("moduleViewHeader", function () {
  return {
    restrict: "E",
    templateUrl: "html/directives/_moduleviewheader.html",
    scope: {
      "icon": "=",
      "label": "="
    },
    controllerAs: "moduleViewHeader",
    controller: ["$scope", function ($scope) {

      var moduleViewHeader = this;

      moduleViewHeader.icon = $scope.icon;
      moduleViewHeader.label = $scope.label;
    }]
  };
});
