#!/bin/bash

titanium build --build-only --skip-js-minify --platform android

calabash-android resign build/android/bin/DartsGame.apk

calabash-android run build/android/bin/DartsGame.apk
