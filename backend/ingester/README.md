# Ingester

The Ingester will retrieve the data from BCPD and store it as 4ih5-d5d5.json.
It will then RECREATE the datbase with the given values at every iteration. This means that no matter what, the tables will be remade if the ingester is called.

### To Log into MYSQL

'''
mysql -u <Username> -p 
'''

Will prompt you for your password immediatly after putting the command

### To Show Queries from command line

Once you are logged in to your account

'''
\g USE DATABASE VigilantDB
\g SELECT day, date, weapon FROM CrimeData
'''
