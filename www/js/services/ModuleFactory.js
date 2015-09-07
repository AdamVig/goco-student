app.factory('ModuleFactory', ['Modules', 'AppVersion', 'StorageService', function (Modules, AppVersion, StorageService) {

  var moduleFactory = {};

  var _allModules = [];
  var _storedModules = StorageService.retrieveModules();
  var _storedAppVersion = StorageService.get('version');
  var _currentAppVersion = AppVersion;
  var _selectedModules = [];
  var _numModules = 0;
  var _moduleClass = '';
  var _isScrollEnabled = false;

  // Get all modules either from storage or from constant
  if (_storedAppVersion == _currentAppVersion && _storedModules) {
    _allModules = _storedModules;
  } else {
    _allModules = Modules;
  }

  // Store modules
  StorageService.storeModules(_allModules);

  // Get selected modules from list of all modules
  _selectedModules = _allModules.filter(function (module) {
    return module.selected === true;
  });

  // Decide class for modules based on how many are selected
  _numModules = _selectedModules.length;
  if (_numModules > 5) _moduleClass = 'list-item';
  else if (_numModules == 5) _moduleClass = 'one-fifth';
  else if (_numModules == 4) _moduleClass = 'one-fourth';
  else if (_numModules == 3) _moduleClass = 'one-third';
  else if (_numModules == 2) _moduleClass = 'one-half';
  else _moduleClass = '';

  // Decide if scroll is enabled
  if (_numModules > 5) _isScrollEnabled = true;
  else _isScrollEnabled = false;

  /**
   * Reorder modules
   * @param  {module} item      Module to move
   * @param  {number} fromIndex Index to move from
   * @param  {number} toIndex   Index to move to
   */
  moduleFactory.reorderModules = function (item, fromIndex, toIndex) {
    _selectedModules.splice(fromIndex, 1);
    _selectedModules.splice(toIndex, 0, item);
  };

  /**
   * Get all modules
   * @return {array} List of module objects
   */
  moduleFactory.getAllModules = function () {
    return _allModules;
  };

  /**
   * Get selected modules
   * @return {array}           List of selected modules
   */
  moduleFactory.getSelectedModules = function () {
    return _selectedModules;
  };

  /**
   * Get module class
   * @return {String}           Class for modules determining their size
   */
  moduleFactory.getModuleClass = function () {
    return _moduleClass;
  };

  /**
   * Return whether scroll is enabled or not
   * @return {Boolean} Whether scroll is enabled or not
   */
  moduleFactory.isScrollEnabled = function () {
    return _isScrollEnabled;
  };

  return moduleFactory;
}]);
