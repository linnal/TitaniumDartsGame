TitaniumDartsGame
=================

# Installation

1) Follow the instructions on the [Titanium website](http://docs.appcelerator.com/titanium/latest/#!/guide/Quick_Start-section-29004949_QuickStart-YourFirstMobileApp) to set up Titanium and Titanium studio.

2) Import the project in Titanium with *File -> Import* from Titanium Studio

3) Navigate to the project directory in your terminal

	- install the currently set sdk `titanium sdk install 3.4.1.GA`

	- install the acceptance test runner/framework calabash `sudo gem install calabash-cucumber`

# Building

- `titanium build --build-only [--platform android|ios]` to build the app from the command line


# Testing

- build the app `titanium build --build-only --skip-js-minify --platform android`

- resign the apk `calabash-android resign build/android/bin/DartsGame.apk`

- run the User Acceptance Tests  `calabash-android run build/android/bin/DartsGame.apk`
