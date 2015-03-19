# GoCoStudent
GoCo Student is an information hub for students at Gordon College. It allows
students to quickly check how many meal points or chapel credits you have
without having to navigate any Gordon websites.

Built with the Ionic Framework, AngularJS, and Cordova for iOS and Android.

## Version 1.0
The first version of the app only displayed a user's chapel credit.

![Version 1.0 Login](https://raw.githubusercontent.com/AdamVig/GoCoStudent/master/resources/screenshots/1.0.0/iOS/login-4-7.png)

![Version 1.0 Chapel Credit](https://raw.githubusercontent.com/AdamVig/GoCoStudent/master/resources/screenshots/1.0.0/iOS/main-4-7.png)

## Version 2.0
The second version involved a technical overhaul of many components of the app
as well as the addition of meal points and interface animations.

![Version 2.0 Loading Data Animated](https://raw.githubusercontent.com/AdamVig/GoCoStudent/master/resources/screencasts/2.0.0/LoadingData.gif)

![Version 2.0 Logging Out Animated](https://raw.githubusercontent.com/AdamVig/GoCoStudent/master/resources/screencasts/2.0.0/LoggingOut.gif)

## Version 3.0
*In Development*

### Features
+ Add printer credits
+ Add eating establishment hours
+ Add different data layouts to allow users to customize what data they see

### Technical
+ Separate each interface section into either a directive or an HTML template
+ Add a configuration step when logging in for the first time
+ Add more user information to UsageService
  - Add user interface options to UsageService
  - Add platform, version, and app version to UsageService
  - Add number of requests of each data type to UsageService
