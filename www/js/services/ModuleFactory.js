app.factory('ModuleFactory', ['$rootScope', '$timeout', 'Modules', 'DefaultSettings', 'DefaultModuleSettings', 'DbFactory', 'SettingsFactory', function ($rootScope, $timeout, Modules, DefaultSettings, DefaultModuleSettings, DbFactory, SettingsFactory) {

  var moduleFactory = {};
  var dataPromise;
  var storedAppVersion;
  var currentAppVersion = DefaultSettings.appVersion;
  var moduleSettings;

  var makeModuleClass = function (numModules) {
    if (numModules > 5) return 'list-item';
    else if (numModules == 5) return 'one-fifth';
    else if (numModules == 4) return 'one-fourth';
    else if (numModules == 3) return 'one-third';
    else if (numModules == 2) return 'one-half';
    else return '';
  };

  moduleFactory.updateSelectedModules = function (updatedSelectedModules) {
    moduleSettings[$rootScope.moduleTypeShown].selected = updatedSelectedModules;
    moduleSettings[$rootScope.moduleTypeShown].class = makeModuleClass(
        updatedSelectedModules.length);
    $rootScope.$broadcast('modules:updated');
    DbFactory.saveModuleSettings(moduleSettings);
  };

  /**
   * Get selected modules
   * @return {array}           List of selected modules
   */
  moduleFactory.getSelectedModules = function () {
    return dataPromise.then(function () {
      return moduleSettings[$rootScope.moduleTypeShown].selected;
    });
  };

  /**
   * Get module class
   * @return {String}           Class for all modules
   */
  moduleFactory.getModuleClass = function () {
    return dataPromise.then(function () {
      return moduleSettings[$rootScope.moduleTypeShown].class;
    });
  };

  // Retrieve stored app version and stored module settings
  // Use current app version and default module settings if not in database
  // Then update modules
  dataPromise = SettingsFactory.get('appVersion').then(function (appVersion) {

    storedAppVersion = appVersion;
    return DbFactory.getModuleSettings();

  }).then(function (storedModuleSettings) {
    if (storedModuleSettings && storedAppVersion == currentAppVersion) {
      moduleSettings = storedModuleSettings;
    } else {
      moduleSettings = DefaultModuleSettings;
      DbFactory.saveModuleSettings(moduleSettings);
      storedAppVersion = currentAppVersion;
      SettingsFactory.set('appVersion', currentAppVersion);
    }
  });

  return moduleFactory;
}]);
