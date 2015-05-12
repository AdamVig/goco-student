app.constant('AppVersion', '2.2').
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
    fontSize: '',
    prefix: '',
    suffix: '',
    selected: true
  },
  {
    name: 'mealPoints',
    label: 'Mealpoints',
    icon: 'meal-points-icon',
    color: 'orange',
    fontSize: '',
    prefix: '$',
    suffix: '',
    selected: true
  },
  {
    name: 'mealPointsPerDay',
    label: 'Mealpoints Left/Day',
    icon: 'calculator-icon',
    color: 'purple',
    fontSize: '',
    prefix: '$',
    suffix: '',
    selected: false
  },
  {
    name: 'daysLeftInSemester',
    label: 'Days Left In Semester',
    icon: 'calendar-icon',
    color: 'mint-green',
    fontSize: '',
    prefix: '',
    suffix: '',
    selected: false
  },
  {
    name: 'studentID',
    label: 'Student ID',
    icon: 'person-icon',
    color: 'light-red',
    fontSize: 'data-small',
    prefix: '',
    suffix: '',
    selected: false
  },
  {
    name: 'temperature',
    label: 'Temperature',
    icon: 'thermometer-icon',
    color: 'light-teal',
    fontSize: '',
    prefix: '',
    suffix: '℉',
    selected: false
  }
]);
