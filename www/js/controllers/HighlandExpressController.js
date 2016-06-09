app.controller("HighlandExpressController", ["$scope", function ($scope) {
  var highland = this;

  highland.day = $scope.moduleViewData.day;
  highland.days = $scope.moduleViewData.days;

  highland.nextSchedule = function () {
    var index = highland.days.indexOf(highland.day);
    if (index + 1 < highland.days.length) {
      highland.day = highland.days[index + 1];
    } else {
      highland.day = highland.days[0];
    }
    highland.getDimensions();
  };

  highland.previousSchedule = function () {
    var index = highland.days.indexOf(highland.day);
    if (index - 1 >= 0) {
      highland.day =  highland.days[index - 1];
    } else {
      highland.day = highland.days[highland.days.length - 1];
    }
    highland.getDimensions();
  };

  highland.getDimensions = function () {
    var highlandData = $scope.moduleViewData.schedule[highland.day];
    highland.height = highlandData.times.length * 50 + 100;
    highland.width = highlandData.destinations.length * 100;
  };

  highland.getDimensions();
}]);
