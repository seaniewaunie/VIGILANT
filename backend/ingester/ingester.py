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

# code to run other script
cmd = ['./dl.sh']
process = subprocess.Popen(cmd)
process.wait()


def executeScriptsFromFile(filename):
    fd = open(filename, 'r')
    sqlFile = fd.read()
    fd.close()
    sqlCommands = sqlFile.split(';')

    for command in sqlCommands:
        try:
            if command.strip() != '':
                cursor.execute(command)
        except  msg:
            print ("Command skipped: "+ msg)


# code to connect to MySQL server
try:
  cnx = mysql.connector.connect(user='Randy',
                                password='RandyRules123',
                                host='127.0.0.1',
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

print("BRU")

count = 0
with open('4ih5-d5d5.json') as dataFile:
    dat = json.load(dataFile)
    print(type(dat[0]))
   
    
    add_data = ("INSERT INTO CrimeData "
                "(crime_ID, date, time, description, district) "
                "VALUES (%s, %s, %s, %s, %s)")
    
        
    for v in dat:
        try:
            
            data = (count, v['crimedate'][:10], v['crimetime'], v['description'], v['district'])
            
            print (v['crimedate'][:10])
            cursor.execute(add_data, data)
            cnx.commit()
            count += 1
            
            print("date: " + v['crimedate'])
            print("time: " + v['crimetime'])
            print("description: " + v['description'])
            #print("weapon: " + v['weapon'])
            #print("address: " + v['location'])
            print("district: " + v['district'])
            #print("neighborhood: " + v['neighborhood'])
            #print("premise: " + v['premise'])
            #print("inside/outside: " + v['inside_outside'])
            #print("lat/lon: " + str(v['location_1']['coordinates']))

            # testing to load values for description and district


            
        except KeyError:
            print("something was caight")
        print (" ------------ ")
            
time.sleep(2)
cnx.close()
