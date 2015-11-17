app.controller('OptionsController', ['$scope', 'SettingsFactory', function ($scope, SettingsFactory) {
  var optionsController = this;

  optionsController.settings = SettingsFactory;

}]);
