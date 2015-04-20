#!/usr/bin/env bash

devices=( "iPhone-4s" "iPhone-5" "iPhone-6" "iPhone-6-Plus" "iPad-Air" )

echo "Welcome to AdamVig App Update."

# Emulate iOS devices
read -p "Emulate all possible iOS devices? (y/n) " yn
if [ $yn == "y" ]; then
  for i in "${devices[@]}"; do

    # Emulate device
    cordova emulate ios --target="$i" >& /dev/null
    echo "$i emulator started."

    # Bring iOS simulator window to front
    osascript \
      -e 'tell application "iOS Simulator"' \
      -e 'activate' \
      -e 'end tell'

    read -p "Press any key to continue... " -n1 -s
    echo
    killall "iOS Simulator" 2> /dev/null
  done
fi

# Package Android app
read -p "Package Android app for distribution? (y/n) " yn
if [ $yn == "y" ]; then

  # Build app for Android
  echo "Building app for Android."
  cordova build --release android >& /dev/null && wait

  # Get keystore information
  read -p "Path to keystore file: " keystorePath
  read -p "Keystore alias: " keystoreAlias

  # Sign APK
  echo "Signing APK."
  jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 \
    -keystore $keystorePath \
    platforms/android/ant-build/CordovaApp-release-unsigned.apk \
    $keystoreAlias

  echo "Zipaligning and renaming APK."
  read -p "Name of app: " appName
  zipalign -v 4 platforms/android/ant-build/CordovaApp-release-unsigned.apk \
    "$appName.apk"

  echo "Done. Android app is ready for distribution."
fi

# Package iOS app
read -p "Package iOS app for distribution? (y/n) " yn
if [ $yn == "y" ]; then

  # Build app for iOS
  echo "Building app for iOS."
  cordova build --release ios >& /dev/null && wait

  # Open Xcode project
  echo "Opening Xcode project."
  open platforms/ios/*.xcodeproj

  echo "Done. iOS app is ready for distribution."
fi
