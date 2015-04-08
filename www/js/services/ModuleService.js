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
   * Add missing default modules to list of modules and
   * remove modules that are no longer in the list of default modules
   * @param {array} userModules List of modules from user configuration
   * @return {array}            List of modules with missing default modules
   *                            added in
   */
  this.updateDefaultModules = function (userModules) {

    var i, currentModule, matchingModules;

    // Go through list of user modules
    for (i = 0; i < userModules.length; i++) {
      currentModule = userModules[i];

      /* jshint -W083 */
      // Check for matching module in modulesList
      matchingModules = Modules.filter(function (m) {
        return m.name == currentModule.name;
      });

      // Remove module
      if (matchingModules.length === 0) {
        userModules.splice(i, 1);
      }
    }


    // Go through list of default modules
    for (i = 0; i < Modules.length; i++) {
      currentModule = Modules[i];

      /* jshint -W083 */
      // Check for matching module in modulesList
      matchingModules = userModules.filter(function (m) {
        return m.name == currentModule.name;
      });

      // Add missing default module
      if (matchingModules.length === 0) {
        userModules.push(currentModule);
      }
    }

    return userModules;
  };

}]);
