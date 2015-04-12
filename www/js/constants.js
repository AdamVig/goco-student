app.constant('AppVersion', '2.1').
constant('DatabaseConstant', {
  'url': 'https://adamvig.cloudant.com',
  'username': 'tedifertordshomilsescepr',
  'password': 'BbvwmD0wrMTJmbF2HMNQRbn1'
}).
constant('ApiUrl', 'http://api.adamvig.com/gocostudent/').
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
    label: 'Mealpoints',
    icon: 'meal-points-icon',
    color: 'meal-points',
    selected: true
  },
  {
    name: 'mealPointsPerDay',
    label: 'Mealpoints Left Per Day',
    icon: 'calculator-icon',
    color: 'meal-points-per-day',
    selected: false
  },
  {
    name: 'daysLeftInSemester',
    label: 'Days Left In Semester',
    icon: 'calendar-icon',
    color: 'days-left-in-semester',
    selected: false
  }
]);
