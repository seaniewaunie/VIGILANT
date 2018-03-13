# VIGILANT

The code for Next Century project


### To pull the most up to date files
```
git pull
```

### To push your stuff to the repo
```
git add -A .
git commit -m "<actionverb>"
git push origin master
```

### Install the requirements with pip
In order to run the server, you need to install the requirements with pip. 
You could do this with a virtual environment so you dont mess up any previous pip setups that you have. 
To do this, you need the virtualenv tool. Once this is installed, follow this guide below.
```
virtualenv ~/vigenv #note you can change this directory to wherever you want, just don't put it in the git repo.
source ~/vingenv/bin/activate # this activates the virtual environment
pip install -r requirements.txt
python --version
```
should state python 3.6.4. If it's not,

### To deactivate the environment type the following at any time
```
deactivate
```

### To run the django server
```
cd backend
python manage.py runserver
```

### To update the requirements file
Note, you want to do this anytime you install a new package with pip. This way we all have it.
```
pip freeze > requirements.txt
```

### To run the npm server
```
cd frontend
npm install (only do this the first time you run it)
npm start
```

