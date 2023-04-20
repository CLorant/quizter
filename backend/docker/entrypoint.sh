#!/bin/bash
if [ -d "./node_modules" ]; then
  # Control will enter here if $DIRECTORY exists.
  echo "Skippeljük az 'npm install'-t"

  else
    echo "Node Modulok instalálása (Első inicializáskor történik meg, ha újra szeretnéd instalálni töröld ki a node_modules-t"
    npm install
fi

exec "$@";