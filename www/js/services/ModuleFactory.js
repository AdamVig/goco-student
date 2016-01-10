app.factory('ModuleFactory', ['$rootScope', '$timeout', '$filter', 'Modules', 'DefaultSettings', 'DefaultModuleSettings', 'DbFactory', 'SettingsFactory', function ($rootScope, $timeout, $filter, Modules, DefaultSettings, DefaultModuleSettings, DbFactory, SettingsFactory) {

  var moduleFactory = {};
  var dataPromise;
  var storedAppVersion;
  var currentAppVersion = DefaultSettings.appVersion;
  var moduleSettings;

  /**
   * Make module class, which is used to apply styles to modules
   * @param  {number} numModules Number of modules currently selected
   * @return {string}            CSS class to use for all modules
   */
  var makeModuleClass = function (numModules) {
    if (numModules > 5) return 'list-item';
    else if (numModules == 5) return 'one-fifth';
    else if (numModules == 4) return 'one-fourth';
    else if (numModules == 3) return 'one-third';
    else if (numModules == 2) return 'one-half';
    else return '';
  };

  /**
   * Replace list of selected modules for currently selected
   * module type with new list
   * @param  {array} updatedSelectedModules List of endpoint names of selected
   *                                        modules
   */
  moduleFactory.updateSelectedModules = function (updatedSelectedModules) {
    moduleSettings[$rootScope.moduleTypeShown].selected = updatedSelectedModules;
    moduleSettings[$rootScope.moduleTypeShown].class = makeModuleClass(
        updatedSelectedModules.length);
    $rootScope.$broadcast('modules:updated');
    DbFactory.saveModuleSettings(moduleSettings);
  };

  /**
   * Get selected modules from module settings for currently selected module type
   * @return {promise} Promise fulfilled by list of selected module
   *                   endpoint names (array of strings)
   */
  moduleFactory.getSelectedModules = function () {
    return dataPromise.then(function () {
      return moduleSettings[$rootScope.moduleTypeShown].selected;
    });
  };

  /**
   * Get selected module objects for both module type from module settings
   * @return {promise} Promise fulfilled by list of selected module
   *                   objects (array of objects)
   */
  moduleFactory.getSelectedModuleObjects = function () {
    return dataPromise.then(function () {
      return $filter('selectedModules')(Modules, moduleSettings);
    });
  };

  /**
   * Get module class from module settings for currently selected module type
   * @return {promise} Promise fulfilled by module class (string)
   */
  moduleFactory.getModuleClass = function () {
    return dataPromise.then(function () {
      return moduleSettings[$rootScope.moduleTypeShown].class;
    });
  };

  /**
   * Get module settings
   * @return {promise} Promise fulfilled by module settings (object)
   */
  moduleFactory.getModuleSettings = function () {
    return dataPromise.then(function () {
      return moduleSettings;
    });
  };

  /**
   * 1. Get stored app version and stored module settings
   * 2. Use current app version and default module settings if not in database
   */
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
