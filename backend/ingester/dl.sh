#!/bin/bash

rm "4ih5-d5d5.json"

wget --continue --output-document='4ih5-d5d5.json' 'https://data.baltimorecity.gov/resource/4ih5-d5d5.json?$limit=3000000'

python ingester.py
