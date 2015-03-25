# GoCoStudent
GoCo Student is an information hub for students at Gordon College. It allows
students to quickly check how many meal points or chapel credits you have
without having to navigate any Gordon websites.

Built with the Ionic Framework, AngularJS, and Cordova for iOS and Android.

## Version 1.0
The first version of the app only displayed a user's chapel credit.

<img alt="Version 1.0 Login" src="https://raw.githubusercontent.com/AdamVig/GoCoStudent/master/resources/screenshots/1.0.0/iOS/login-4-7.png" height="400px">

<img alt="Version 1.0 Chapel Credit" src="https://raw.githubusercontent.com/AdamVig/GoCoStudent/master/resources/screenshots/1.0.0/iOS/main-4-7.png" height="400px">

## Version 2.0
The second version involved a technical overhaul of many components of the app
as well as the addition of meal points and interface animations.

<img alt="Version 2.0 Loading Data Animated" src="https://raw.githubusercontent.com/AdamVig/GoCoStudent/master/resources/screencasts/2.0.0/LoadingData.gif" height="400px">

<img alt="Version 2.0 Logging Out Animated" src="https://raw.githubusercontent.com/AdamVig/GoCoStudent/master/resources/screencasts/2.0.0/LoggingOut.gif" height="400px">

## Modular Interface
+ Modules will each have an icon, a label, and a color.
+ Modules will have several set sizes:
  1. 1/1
  2. 1/2
  3. 1/3
  4. minimum visible size
+ Modules will change size based on the number of modules currently visible
in the app.
+ Modules will relocate the icon to the left side in their minimum visible size.
+ Modules will be one of two types:
  1. Data Module, ex: "Meal Points"
  2. Interaction Module, ex: "See What's Open"
    + Contains an icon that hints at a state change (such as a rightward arrow).
    + When clicked, transitions app to another state.
    + Prompts for interaction.
+ Modules will be configurable by the user.
  - The user will be able to select which modules are visible on the
  configuration page.
  - The configuration page will be available in two places:
    1. On the user's first login to the app, detected by the lack of a
    configuration object in the user's data.
    2. In the menu accessible in the header bar visible in all states.
