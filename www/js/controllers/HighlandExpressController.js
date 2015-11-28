app.controller('HighlandExpressController', ['$scope', function ($scope) {
  var highland = this;

  highland.day = $scope.moduleViewData.day;
  highland.days = $scope.moduleViewData.days;

  highland.nextSchedule = function () {
    index = highland.days.indexOf(highland.day);
    if (index + 1 < highland.days.length) {
      highland.day = highland.days[index + 1];
    } else {
      highland.day = highland.days[0];
    }
  };

  highland.previousSchedule = function () {
    index = highland.days.indexOf(highland.day);
    if (index - 1 >= 0) {
      highland.day =  highland.days[index - 1];
    } else {
      highland.day = highland.days[highland.days.length - 1];
    }
  };
}]);
