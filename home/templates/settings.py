import os


# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# SECURITY WARNING: don't run with debug turned on in production!
# DEBUG = 'DEVELOPMENT' in os.environ
DEBUG = 'DEVELOPMENT' in os.environ

ALLOWED_HOSTS = ['portfolio.herokuapp.com', 'localhost']


# Application definition

INSTALLED_APPS = [
    'home',
    'about',
]


ROOT_URLCONF = 'gift_her.urls'

