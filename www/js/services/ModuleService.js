app.service('ModuleService', ['Modules', function (Modules) {

  /**
   * Get selected modules from list of all modules
   * @param {array} allModules List of all modules
   * @return {array}           List of selected modules
   */
  this.getSelectedModules = function (allModules) {
    return allModules.filter(function (module) {
      return module.selected === true;
    });
  };

  /**
   * Make class for modules
   * @param {number} numModules Number of total modules selected
   * @return {String}           Class for modules determining their size
   */
  this.makeModuleClass = function (numModules) {
    if (numModules > 4) return "list-item";
    else if (numModules == 4) return "one-fourth";
    else if (numModules == 3) return "one-third";
    else if (numModules == 2) return "one-half";
    else return "";
  };

  /**
   * Add missing default modules to list of modules
   * @param {array} modulesList List of modules
   * @return {array}            List of modules with missing default modules
   *                            added in
   */
  this.addMissingModules = function (modulesList) {

    // Go through list of default modules
    for (var i = 0; i < Modules.length; i++) {
      var currentModule = Modules[i];

      /* jshint -W083 */
      // Check for matching module in modulesList
      var matchingModules = modulesList.filter(function (m) {
        return m.name == currentModule.name;
      });

      // Add missing default module
      if (matchingModules.length === 0) {
        modulesList.push(currentModule);
      }
    }

    return modulesList;
  };

}]);
