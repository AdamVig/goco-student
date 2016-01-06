app.factory('ModuleFactory', ['$rootScope', '$timeout', 'Modules', 'DefaultSettings', 'StorageService', function ($rootScope, $timeout, Modules, DefaultSettings, StorageService) {

  var moduleFactory = {};

  var _allModules = [];
  var _storedModules = StorageService.retrieveModules();
  var _defaultModules = Modules;
  var _storedAppVersion = StorageService.get('version');
  var _currentAppVersion = DefaultSettings.appVersion;

  var _modules = {
    'info': {
      'selected': [],
      'numSelected': 0,
      'class': '',
      'shown': true
    },
    'interaction': {
      'selected': [],
      'numSelected': 0,
      'class': '',
      'shown': false
    }
  };

  /**
   * Get all modules from either storage or constant
   * @return {array}                    List of either stored or default modules
   */
  function _getAllModules() {
    if (_storedAppVersion == _currentAppVersion && _storedModules) {
      return _storedModules;
    } else {
      StorageService.storeModules(_defaultModules);
      return _defaultModules;
    }
  }

  /**
   * Get all shown modules
   * @return {array}                    List of shown modules
   */
  function _getAllShownModules() {
    return _allModules.filter(function (module) {
      return _isModuleTypeShown(module.moduleType);
    });
  }

  /**
   * Get selected modules from list of modules
   * @param  {array} modules Contains modules
   * @param  {string} type   Type of modules to look for
   * @return {array}         Contains modules with 'selected': true
   */
  function _getSelected(modules, type) {
    return modules.filter(function (module) {
        return module.selected === true && module.moduleType == type;
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
   * Change which module type is shown
   * @param  {string} moduleType Type of module to show
   */
  function _changeModuleTypeShown(moduleType) {
      _modules[moduleType].shown = true;

      // Identify opposite module type and set 'shown' property to false
      if (moduleType == 'info') {
        _modules.interaction.shown = false;
      } else {
        _modules.info.shown = false;
      }
      moduleFactory.updateModules();
  }

  /**
   * Return whether module type is shown or not
   * @param  {string}  moduleType Type of module
   * @return {Boolean}            Whether module type is shown or not
   */
  function _isModuleTypeShown(moduleType) {
    return _modules[moduleType].shown;
  }

  /**
   * Return shown module type
   * @return {string}            Type of module that is currently shown
   */
  function _getModuleTypeShown() {
    if (_modules.info.shown) {
      return 'info';
    } else {
      return 'interaction';
    }
  }

  /**
   * Update list of selected modules from list of all modules
   */
  moduleFactory.updateModules = function (modules) {
    _allModules = modules || _getAllModules();

    _modules.info.selected = _getSelected(_allModules, 'info');
    _modules.interaction.selected = _getSelected(_allModules, 'interaction');

    _modules.info.numSelected = _modules.info.selected.length;
    _modules.interaction.numSelected = _modules.interaction.selected.length;

    _modules.info.class = _getModuleClass(_modules.info.numSelected);
    _modules.interaction.class = _getModuleClass(_modules.interaction.numSelected);

    StorageService.storeModules(_allModules);
    $rootScope.$broadcast('modules:updated', _modules);
  };

  /**
   * Get all modules
   * @return {array} List of module objects
   */
  moduleFactory.getAllModules = function () {
    return _allModules;
  };

  /**
   * Get all shown modules
   * @return {array} List of module objects
   */
  moduleFactory.getAllShownModules = function () {
    return _getAllShownModules();
  };

  /**
   * Get selected modules
   * @return {array}           List of selected modules
   */
  moduleFactory.getSelectedModules = function () {
    return _modules[_getModuleTypeShown()].selected;
  };

  /**
   * Get module class
   * @return {String}           Class for modules determining their size
   */
  moduleFactory.getModuleClass = function () {
    return _modules[_getModuleTypeShown()].class;
  };

  /**
   * Change module type shown
   * @param  {string} moduleType Type of module
   */
  moduleFactory.changeModuleTypeShown = function (moduleType) {
    _changeModuleTypeShown(moduleType);
  };

  /**
   * Return whether module type is shown or not
   * @param  {string}  moduleType Type of module
   * @return {Boolean}            Whether module type is shown or not
   */
  moduleFactory.isModuleTypeShown = function (moduleType) {
    return _isModuleTypeShown(moduleType);
  };

  moduleFactory.updateModules();

  return moduleFactory;
}]);
