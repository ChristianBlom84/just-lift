#!/bin/bash

cp -r /usr/cache/node_modules/. /usr/app/node_modules/
exec npm start
