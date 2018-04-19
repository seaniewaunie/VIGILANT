#!/bin/bash


cd ~/vigilant/backend/ingester

wget --continue --output-document=4ih5-d5d5.json 'https://data.baltimorecity.gov/resource/4ih5-d5d5.json?$limit=30000000'

python ingester.py

rm "4ih5-d5d5.json"
