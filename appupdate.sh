#!/usr/bin/env bash

# Colors
cecho() {
  local code="\033["
  case "$1" in
    black  | bk) color="${code}0;30m";;
    red    |  r) color="${code}1;31m";;
    green  |  g) color="${code}1;32m";;
    yellow |  y) color="${code}1;33m";;
    blue   |  b) color="${code}1;34m";;
    purple |  p) color="${code}1;35m";;
    cyan   |  c) color="${code}1;36m";;
    gray   | gr) color="${code}0;37m";;
    *) local text="$1"
  esac
  [ -z "$text" ] && local text="$color$2${code}0m"
  echo "$text"
}

devices=( "iPhone-4s" "iPhone-5" "iPhone-6" "iPhone-6-Plus" "iPad-Air" )

cecho cyan "Welcome to AdamVig App Update."

# Emulate iOS devices
read -p "Emulate all possible iOS devices? (y/n) " yn
if [ $yn == "y" ]; then
  for i in "${devices[@]}"; do

    # Emulate device
    cordova emulate ios --target="$i" >& /dev/null
    cecho blue "$i emulator started."

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
  cecho blue "Building app for Android."
  cordova build --release android >& /dev/null && wait

  # Get keystore information
  read -p "Path to keystore file: " keystorePath
  read -p "Keystore alias: " keystoreAlias

  # Sign APK
  jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 \
    -keystore $keystorePath \
  cecho blue "Signing APK."
    platforms/android/ant-build/CordovaApp-release-unsigned.apk \
    $keystoreAlias

  read -p "Name of app: " appName
  cecho blue "Zipaligning and renaming APK."
  zipalign -v 4 platforms/android/ant-build/CordovaApp-release-unsigned.apk \
    "$appName.apk"

  cecho yellow  "Done. Android app is ready for distribution."
fi

# Package iOS app
read -p "Package iOS app for distribution? (y/n) " yn
if [ $yn == "y" ]; then

  # Build app for iOS
  cecho blue "Building app for iOS."
  cordova build --release ios >& /dev/null && wait

  # Open Xcode project
  cecho blue "Opening Xcode project."
  open platforms/ios/*.xcodeproj

  cecho yellow "Done. iOS app is ready for distribution."
fi
