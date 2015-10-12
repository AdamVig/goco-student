app.factory('ModuleFactory', ['$rootScope', '$timeout', 'Modules', 'AppVersion', 'StorageService', function ($rootScope, $timeout, Modules, AppVersion, StorageService) {

  var moduleFactory = {};

  var _allModules = [];
  var _storedModules = StorageService.retrieveModules();
  var _defaultModules = Modules;
  var _storedAppVersion = StorageService.get('version');
  var _currentAppVersion = AppVersion;
  var _selectedModules = [];
  var _numModules = 0;
  var _moduleClass = '';
  var _isScrollEnabled = false;

  _allModules = _getAllModules();
  _selectedModules = _getSelected(_allModules);
  _numModules = _selectedModules.length;
  _moduleClass = _getModuleClass(_numModules);
  _isScrollEnabled = _getScrollEnabled(_numModules);

  /**
   * Get all modules from either storage or constant
   * @return {array}                    List of either stored or default modules
   */
  function _getAllModules() {
    if (_storedAppVersion == _currentAppVersion && _storedModules) {
      return _storedModules;
    } else {
      StorageService.storeModules(_defaultModules);

      // Wait for directive controller to initialize then broadcast message
      $timeout(function () {
        $rootScope.$broadcast('modules:default');
      });

      return _defaultModules;
    }
  }

  /**
   * Get selected modules from list of modules
   * @param  {array} modules Contains modules
   * @return {array}         Contains modules with 'selected': true
   */
  function _getSelected(modules) {
    return modules.filter(function (module) {
        return module.selected === true;
      });
  }

  /**
   * Get class to use for modules
   * @param  {number} _numModules Number of modules
   * @return {string}             Class to use for modules
   */
  function _getModuleClass(_numModules) {
    if (_numModules > 5) return 'list-item';
    else if (_numModules == 5) return 'one-fifth';
    else if (_numModules == 4) return 'one-fourth';
    else if (_numModules == 3) return 'one-third';
    else if (_numModules == 2) return 'one-half';
    else return '';
  }

  /**
   * Get whether scroll is enabled or not
   * @param  {number} _numModules Number of modules
   * @return {boolean}            Whether or not scroll is enabled
   */
  function _getScrollEnabled(_numModules) {
    if (_numModules > 5) return true;
    else return false;
  }

  /**
   * Update list of selected modules from list of all modules
   */
  moduleFactory.updateModules = function (modules) {
    _allModules = modules || _getAllModules();
    _selectedModules = _getSelected(_allModules);

    _numModules = _selectedModules.length;
    _moduleClass = _getModuleClass(_numModules);
    _isScrollEnabled = _getScrollEnabled(_numModules);

    StorageService.storeModules(_allModules);
    $rootScope.$broadcast('modules:updated', _selectedModules);
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
  moduleFactory.getScrollEnabled = function () {
    return _isScrollEnabled;
  };

  return moduleFactory;
}]);
