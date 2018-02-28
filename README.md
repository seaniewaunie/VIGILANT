This git repository includes the virtual environment for the VIGILANT project, and the VIGILANT project itself.

in order to run the virtual environment, run 'source bin/active'
- this keeps us all using the same settings/versions for our tools

Tools thus far:
python2.7.4
Django 1.5.11 (this specific version allows non-relational databases)
django-mongodb-engine==0.6.0 (requires python2.7.4)
djangotoolbox==1.8.0
pymongo==3.6.0
pytz==2018.3

after you start the virtual environment, try out the server. type 'python vigilant/manage.py runserver'

this 'should' set up the server painlessly, try testing it out at http://127.0.0.1:8000



