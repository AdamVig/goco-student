app.filter('camelCaseToHuman', function () {
  return function (input) {
    return input.replace(/^[a-z]|[A-Z]/g, function (v, i) {
        return i === 0 ? v.toUpperCase() : " " + v.toLowerCase();
    });
  };
});
