"""
Django settings for social_network project.

Generated by 'django-admin startproject' using Django 5.0.2.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/5.0/ref/settings/
"""

from pathlib import Path
import os

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-tq@z^zzy63%i6(+)=4l6vr2-g2p^#ba6&*-$u3b)d(bjb&(evb'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['3.106.210.251', '127.0.0.1']


# Application definition

INSTALLED_APPS = [
    'daphne',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework', # pip install djangorestframework
    'corsheaders', # pip install django-cors-headers
    'django_mongoengine',
    'storages',
    'homepage',
    'users',
    'posts',
    'chat',
    'comments',
    'reactions',
    'friends',
    'userprofiles',
    'channels',
    'mess',
    'navbar',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'social_network.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': ['users\\templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'social_network.wsgi.application'

ASGI_APPLICATION = "social_network.asgi.application"

CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels_redis.core.RedisChannelLayer",
        "CONFIG": {
            "hosts": [("127.0.0.1", 6379)],
        },
    },
}


# Database
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.postgresql_psycopg2',
#         'NAME': 'social_network',
#         'USER': 'postgres',
#         'PASSWORD': 'TuAnhkc11',
#         'HOST': 'database-1.cxmwy0oq0y75.ap-southeast-2.rds.amazonaws.com',
#         'PORT': '5432',
#     },
# }

import sshtunnel

SSH_PKEY_PATH = os.path.join(BASE_DIR, 'pem', 'test.pem')

sshtunnel.SSH_TIMEOUT = 5.0
sshtunnel.TUNNEL_TIMEOUT = 5.0

tunnel = sshtunnel.SSHTunnelForwarder(
    ('ec2-54-252-204-63.ap-southeast-2.compute.amazonaws.com'),  # Public EC2 instance address
    ssh_username='unbuntu',
    ssh_pkey='D:/upcloud_aws/test.pem',  # Private key of the EC2 instance
    remote_bind_address=('database-2.cxmwy0oq0y75.ap-southeast-2.rds.amazonaws.com', 5432)  # Private RDS instance address
)

tunnel.start()

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'social_network',
        'USER': 'tuananh',
        'PASSWORD': 'TuAnhkc11',
        'HOST': '127.0.0.1',
        'PORT': tunnel.local_bind_port,
    }
}

MONGODB_DATABASES = {
    "default": {
        "name": "social_network",
        "host": "localhost",
        "port": 27017,
        # "username": "mongo_user",  # replace with your username
        # "password": "mongo_password",  # replace with your password
    }
}

import mongoengine

mongoengine.connect(
    db='social_network',
    host='mongodb://localhost/social_network'
)

# Password validation
# https://docs.djangoproject.com/en/5.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.0/howto/static-files/

STATIC_URL = 'static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'static_files')

STATICFILES_DIRS =  (os.path.join(BASE_DIR, 'users\\static'),
                    os.path.join(BASE_DIR, 'userprofiles\\static'),
                    os.path.join(BASE_DIR, 'posts\\static'),
                    os.path.join(BASE_DIR, 'friends\\static'),
                    os.path.join(BASE_DIR, 'homepage\\static'),
                    os.path.join(BASE_DIR, 'comments\\static'),
                    os.path.join(BASE_DIR, 'reactions\\static'),
                    os.path.join(BASE_DIR, 'navbar\\static'),

)

# Default primary key field type
# https://docs.djangoproject.com/en/5.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# AUTH_USER_MODEL = 'users.User'

CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOW_CREDENTIALS = True 

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

AWS_ACCESS_KEY_ID = 'AKIAZQ3DQVSTOELWTKJU'
AWS_SECRET_ACCESS_KEY = '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'
AWS_STORAGE_BUCKET_NAME = 'feisubukku'
AWS_S3_REGION_NAME = 'ap-southeast-2'  # Optional
AWS_S3_CUSTOM_DOMAIN = '%s.s3.amazonaws.com' % AWS_STORAGE_BUCKET_NAME

AWS_PUBLIC_MEDIA_LOCATION = 'media/'
DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
MEDIA_URL = 'https://%s/%s/' % (AWS_S3_CUSTOM_DOMAIN, AWS_PUBLIC_MEDIA_LOCATION)
