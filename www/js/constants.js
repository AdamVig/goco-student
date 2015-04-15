app.constant('AppVersion', '2.1').
constant('DatabaseConstant', {
  'url': 'https://adamvig.cloudant.com',
  'username': 'tedifertordshomilsescepr',
  'password': 'BbvwmD0wrMTJmbF2HMNQRbn1'
}).
constant('ApiUrl', 'http://api.adamvig.com/gocostudent/').
constant('RequestTimeout', {
  'default': 25000
}).
constant('Modules', [
  {
    name: 'chapelCredits',
    label: 'CL&W Credits',
    icon: 'chapel-icon',
    color: 'chapel-credits',
    prefix: '',
    selected: true
  },
  {
    name: 'mealPoints',
    label: 'Mealpoints',
    icon: 'meal-points-icon',
    color: 'meal-points',
    prefix: '$',
    selected: true
  },
  {
    name: 'mealPointsPerDay',
    label: 'Mealpoints Left/Day',
    icon: 'calculator-icon',
    color: 'meal-points-per-day',
    prefix: '$',
    selected: false
  },
  {
    name: 'daysLeftInSemester',
    label: 'Days Left In Semester',
    icon: 'calendar-icon',
    color: 'days-left-in-semester',
    prefix: '',
    selected: false
  }
]);
