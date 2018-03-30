"""
WSGI config for backend project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/2.0/howto/deployment/wsgi/
"""

import os, sys

from django.core.wsgi import get_wsgi_application

# add the hellodjango project path into the sys.path
sys.path.append('/var/www/html/vigilant/')
# add the virtualenv site-packages path to the sys.path
sys.path.append('/home/ec2-user/pyenv/')

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")

application = get_wsgi_application()
