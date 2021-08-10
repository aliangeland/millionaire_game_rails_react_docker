#!/bin/sh
if [ "$PACKAGE_UPDATE" = true ] ; then
    echo 'installing fresh node modules'
    # you can also remove existing modules at this step
    npm ci
    npm install react-scripts@latest -g --silent
 fi
exec npm start