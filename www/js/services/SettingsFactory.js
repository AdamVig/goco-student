app.factory('SettingsFactory', ['DefaultSettings', 'StorageService', function (DefaultSettings, StorageService) {

  var settingsFactory = {};

  var _settings = {};
  var _defaultSettings = DefaultSettings;
  var _storedSettings = StorageService.retrieveSettings();

  _settings = _getSettings();

  /**
   * Get settings either from storage or defaults
   * @return {object} Settings object
   */
  function _getSettings() {
    if (_storedSettings !== null) {
      return _storedSettings;
    } else {
      return _defaultSettings;
    }
  }

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
    StorageService.storeSettings(_settings);
  };

  /**
   * Toggle value of boolean setting
   * @param  {string} name Name of setting
   * @return {boolean}     New value of setting
   */
  settingsFactory.toggle = function (name) {

    if (typeof(_settings[name]) === 'boolean') {
      _settings[name] = !_settings[name];
      StorageService.storeSettings(_settings);
    }

    return _settings[name];
  };

  return settingsFactory;
}]);
