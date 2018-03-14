''' 
Randolph Tan
3/14/2018
ingester.py

Description: 
This script will download the dataset from the BCPD as a file
and use that to store data into the database.
'''

import json

with open('dataSet.json') as dataFile:
    dat = json.load(dataFile)
    print(type(dat[0]))
   
    
    
    
    for v in dat:
        try:
            print("crimedate: " + v['crimedate'])
            print("description: " + v['description'])
            print("district: " + v['district'])
        except KeyError:
            print("something was caight")
        
