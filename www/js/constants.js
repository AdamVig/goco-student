app.constant('AppVersion', '2.1').
constant('DatabaseConstant', {
  'url': 'https://adamvig.cloudant.com',
  'username': 'tedifertordshomilsescepr',
  'password': 'BbvwmD0wrMTJmbF2HMNQRbn1'
}).
constant('ApiUrl', 'http://data.adamvig.com/').
constant('RequestTimeout', {
  'chapelCredits': 1500,
  'mealPoints': 8000
}).
constant('Modules', [
  {
    name: 'chapelCredits',
    label: 'CL&W Credits',
    icon: 'chapel-icon',
    color: 'chapel-credits',
    selected: true
  },
  {
    name: 'mealPoints',
    label: 'Meal Points',
    icon: 'meal-points-icon',
    color: 'meal-points',
    selected: true
  }
]);
