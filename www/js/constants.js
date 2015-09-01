app.constant('AppVersion', '2.3').
constant('ApiUrl', 'https://api.adamvig.com/gocostudent/').
constant('RequestTimeout', {
  'default': 25000
}).
constant('AppInfoRefreshTime', 300000).
constant('ErrorMessages', {
  'timeout': 'Request took too long. Tap to try again.',
  'unknown': 'Something went wrong. Try again later!'
}).
constant('Modules', [
  {
    "moduleType": 'info',
    "dataType": 'chapelCredits',
    "label": 'CL&W Credits',
    "icon": 'chapel-icon',
    "class": 'blue',
    "prefix": '',
    "suffix": '',
    "selected": true
  },
  {
    "moduleType": 'info',
    "dataType": 'mealPoints',
    "label": 'Mealpoints',
    "icon": 'meal-points-icon',
    "class": 'orange',
    "prefix": '$',
    "suffix": '',
    "selected": true
  },
  {
    "moduleType": 'info',
    "dataType": 'mealPointsPerDay',
    "label": 'Mealpoints Left/Day',
    "icon": 'calculator-icon',
    "class": 'purple',
    "prefix": '$',
    "suffix": '',
    "selected": false
  },
  {
    "moduleType": 'info',
    "dataType": 'daysLeftInSemester',
    "label": 'Days Left In Semester',
    "icon": 'calendar-icon',
    "class": 'mint-green',
    "prefix": '',
    "suffix": '',
    "selected": false
  },
  {
    "moduleType": 'info',
    "dataType": 'studentID',
    "label": 'Student ID',
    "icon": 'person-icon',
    "class": 'light-red',
    "prefix": '',
    "suffix": '',
    "selected": false
  },
  {
    "moduleType": 'info',
    "dataType": 'temperature',
    "label": 'Temperature',
    "icon": 'thermometer-icon',
    "class": 'light-teal',
    "prefix": '',
    "suffix": '℉',
    "selected": false
  } ,
  {
    "moduleType": 'interaction',
    "dataType": 'chapelEvents',
    "label": 'CL&W Events',
    "icon": 'bible-icon',
    "class": 'light-aquamarine',
    "prefix": '',
    "suffix": '',
    "selected": true
  }
]);
