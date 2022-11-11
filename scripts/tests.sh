#!/bin/bash

if [[ `command -v fzf` ]]; then
  ./node_modules/.bin/mocha $(fzf --filter=/__tests__/) -R spec --exit
else
  ./node_modules/.bin/mocha '**/__tests__/*' -R spec --exit
fi
