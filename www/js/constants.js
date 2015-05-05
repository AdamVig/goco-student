app.constant('AppVersion', '2.1.5').
constant('DatabaseConstant', {
  'url': 'https://adamvig.cloudant.com',
  'username': 'tedifertordshomilsescepr',
  'password': 'BbvwmD0wrMTJmbF2HMNQRbn1'
}).
constant('ApiUrl', 'http://api.adamvig.com/gocostudent/').
constant('RequestTimeout', {
  'default': 25000
}).
constant('AppInfoRefreshTime', 15000).
constant('Modules', [
  {
    name: 'chapelCredits',
    label: 'CL&W Credits',
    icon: 'chapel-icon',
    color: 'blue',
    prefix: '',
    selected: true
  },
  {
    name: 'mealPoints',
    label: 'Mealpoints',
    icon: 'meal-points-icon',
    color: 'orange',
    prefix: '$',
    selected: true
  },
  {
    name: 'mealPointsPerDay',
    label: 'Mealpoints Left/Day',
    icon: 'calculator-icon',
    color: 'purple',
    prefix: '$',
    selected: false
  },
  {
    name: 'daysLeftInSemester',
    label: 'Days Left In Semester',
    icon: 'calendar-icon',
    color: 'mint-green',
    prefix: '',
    selected: false
  },
  {
    name: 'studentID',
    label: 'Student ID',
    icon: 'person-icon',
    color: 'light-red',
    prefix: '',
    selected: false
  }
]);
