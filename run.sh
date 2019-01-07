#!/bin/bash
fuser -n tcp -k 8081
adb reverse tcp:8081 tcp:8081
yarn start