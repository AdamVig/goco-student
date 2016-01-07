app.factory('SettingsFactory', ['DefaultSettings', 'DbFactory', function (DefaultSettings, DbFactory) {

  var settingsFactory = this;

  var _settings = {};
  var _storedSettings;

  // Get stored settings from storage
  // If no stored settings, use default settings
  var dataPromise = DbFactory.getSettings().then(function (settings) {
    _storedSettings = settings;

    if (_storedSettings) {
      _settings = _storedSettings;
    } else {
      _settings = DefaultSettings;
      DbFactory.saveSettings(_settings);
    }
  });

  /**
   * Retrieve value of a given setting
   * @param  {string} name Name of setting
   * @return {varies}      Value of setting
   */
  settingsFactory.get = function (name) {
    return dataPromise.then(function () {
      return _settings[name];
    });
  };

  /**
   * Get all settings
   * @return {promise} Promise fulfilled by settings object
   */
  settingsFactory.getAll = function() {
    return dataPromise.then(function() {
      return _settings;
    });
  };

  /**
   * Set a given setting to a given value
   * @param {string} name Name of setting
   * @param {(varies)} value  Value of setting
   */
  settingsFactory.set = function (name, value) {
    _settings[name] = value;
    DbFactory.saveSettings(_settings);
  };

  /**
   * Toggle value of boolean setting
   * @param  {string} name Name of setting
   * @return {boolean}     New value of setting
   */
  settingsFactory.toggle = function (name) {

    if (typeof(_settings[name]) === 'boolean') {
      _settings[name] = !_settings[name];
      DbFactory.saveSettings(_settings);
    }

    return _settings[name];
  };

  return settingsFactory;
}]);
