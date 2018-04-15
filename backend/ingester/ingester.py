''' 
Randolph Tan
3/14/2018
ingester.py

Description: 
This script will download the dataset from the BCPD as a file
and use that to store data into the database.
'''


import json, subprocess, time
import mysql.connector
from mysql.connector import errorcode
from datetime import date
import calendar
#import pandas as pd
#from sodapy import Socrata

# code to run other script
cmd = ['./dl.sh']
process = subprocess.Popen(cmd)
process.wait()

#client = Socrata("data.baltimore.gov", None)

#results = client.get("4ih5-d5d5", limit=2000)


# function will run sql script from a given file location
def executeScriptsFromFile(filename):
    fd = open(filename, 'r')
    sqlFile = fd.read()
    fd.close()
    sqlCommands = sqlFile.split(';')

    print("executing script: " + filename)
    
    for command in sqlCommands:
        #print (command)
        try:
            if command.strip() != '':
                cursor.execute(command)
        except:
            print ("Command skipped: ")

            
# Function will return day given date string
def getWeekday(date_):
    year = int(date_[:4])
    month = int(date_[5:7])
    day = int(date_[8:10])
    dates = date(year, month, day)
      
    return{
        '0' : 'Mon',
        '1' : 'Tue',
        '2' : 'Wed',
        '3' : 'Thu',
        '4' : 'Fri',
        '5' : 'Sat',
        '6' : 'Sun'
    }.get(str(dates.weekday()), 'error')


# code to connect to MySQL server
try:
  cnx = mysql.connector.connect(user='Randy',
                                password='RandyRules123',
                                host='127.0.0.1',
                                #host='10.0.2.2',
                                database='VigilantDB')
  cursor= cnx.cursor()
  
except mysql.connector.Error as err:
  if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
    print("Something is wrong with your user name or password")
  elif err.errno == errorcode.ER_BAD_DB_ERROR:
    print("Database does not exist")
    executeScriptsFromFile('../mySQL/createAll.sql')
    cnx.commit()
    
  else:
    print(err)

#print("BRU")

count = 0

# resets tables
executeScriptsFromFile('../mySQL/createAll.sql')
cnx.commit()

with open('4ih5-d5d5.json') as dataFile:
    dat = json.load(dataFile)
    #print(type(dat[0]))
   
    
    add_data = ("INSERT INTO CrimeData "
                "(crime_ID, date, time, description, district, day, weapon, address, neighborhood, premise, inside_outside, latitude, longitude, post, code) "
                "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)")
    

    for v in dat:

        # calculates day
        day = getWeekday(v['crimedate'])

        # check for other values
        
        try:
            weapon = v['weapon']
        except KeyError:
            weapon = None;
        #print (weapon)

        try:
            address  = v['location']
        except KeyError:
            address = None;
        #print (address)

        try:
            neighborhood  = v['neighborhood']

        except KeyError:
            neighborhood = None
        #print (neighborhood)
            
        try:
            premise  = v['premise']
        except KeyError:
            premise = None
        #print (premise)

        try:
            in_out  = v['inside_outside']

            # normalize data to I or O
            if (in_out[0] == 'O'):
                in_out = 'O'
            elif (in_out[0] == 'I'):
                in_out = 'I'
            else:
                in_out = 'ERROR'
                
            
        except KeyError:
            in_out = None
        #print (in_out)


        try:    
            latitude = v['latitude']
        except KeyError:
         #   print("ERROR: latitude")
            latitude = None
        #print (latitude)
                

        try:    
            longitude = v['longitude']
        except KeyError:
            #print("ERROR: longitude")
            longitude = None
        #print (longitude)

        try:    
            post = v['post']
        except KeyError:
         #   print("ERROR: post")
            post = None
        #print (post)
                

        #print(v['latitude'])

            
        data = (count, v['crimedate'][:10], v['crimetime'], v['description'], v['district'], day, weapon, address, neighborhood, premise, in_out, latitude, longitude, post, v['crimecode'])
            
        
        cursor.execute(add_data, data)
        cnx.commit()
        count += 1

        # Values that every entry has        
        #print("date: " + v['crimedate'][:10])
        #print("day: "+ day)
        #print("time: " + v['crimetime'])
        #print("description: " + v['description'])
        #print("code: " + v['crimecode'])
        #print("district: " + v['district'])


        # testing to load values for description and district

        #print (" ------------ ")
            
#except KeyError:
 #   print("something was caight")

            


# test code
#executeScriptsFromFile('../mySQL/sampleQuery.sql')
cnx.commit()

cnx.close()
