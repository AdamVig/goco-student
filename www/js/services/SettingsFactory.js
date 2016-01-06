app.factory('SettingsFactory', ['DefaultSettings', 'DbFactory', function (DefaultSettings, DbFactory) {

  var settingsFactory = this;

  var _settings = {};
  var _storedSettings;

  // Get stored settings from storage
  // If no stored settings, use default settings
  DbFactory.getSettings().then(function (settings) {
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
    return _settings[name];
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
