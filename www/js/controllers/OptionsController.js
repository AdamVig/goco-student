app.controller('OptionsController', ['$scope', 'SettingsFactory', function ($scope, SettingsFactory) {
  var options = this;
  options.settings = {};

  // Refresh all settings
  var refreshSettings = function () {
    SettingsFactory.getAll().then(function (settings) {
      options.settings = settings;
    });
  };

  refreshSettings();

  // Change the value of a setting
  options.set = function (settingName, newValue) {
    SettingsFactory.set(settingName, newValue);
    options.settings[settingName] = newValue;
  };

  // Toggle the value of a boolean setting
  options.toggle = function (settingName) {
    SettingsFactory.set(settingName, options.settings[settingName]);
  };
}]);
