app.filter("titleCase", function () {
  return function (input) {
    var words = input.split(" ");
    for (var i = 0; i < words.length; i++) {
      words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
    return words.join(" ");
  };
}).
filter("camelCaseToHuman", function () {
  return function (input) {
    return input.replace(/^[a-z]|[A-Z]/g, function (v, i) {
        return i === 0 ? v : " " + v.toLowerCase();
    });
  };
}).
filter("camelCaseToDashSeparated", function () {
  return function (input) {
    return input.replace(/^[a-z]|[A-Z]/g, function (v, i) {
        return i === 0 ? v : "-" + v;
    }).toLowerCase();
  };
}).
filter("username", function () {
  return function (username) {
    // Remove email domain if entered
    if (username.indexOf("@") > -1) {
      username = username.split("@")[0];
    }
    return username.toLowerCase();
  };
}).
filter("password", function () {
  return function (password, direction) {
    if (direction === "encode") {
      return btoa(password);
    } else if (direction === "decode") {
      return atob(password);
    }
  };
}).
filter("selectedModules", function () {
  return function (allModules, moduleSettings) {

    var getModuleObjects = function (modulesList) {
      return allModules.filter(function (module) {
        return modulesList.indexOf(module.endpoint) !== -1;
      });
    };

    var selectedInfoModules = getModuleObjects(moduleSettings.info.selected);
    var selectedInteractionModules = getModuleObjects(
        moduleSettings.interaction.selected);
    var selectedModules = selectedInfoModules.concat(
        selectedInteractionModules);

    return selectedModules;
  };
});
