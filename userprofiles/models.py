from django.db import models

from users.models import User

# Create your models here.
def media_directory_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/avatars/<filename>
    return 'users/userprofile_{0}/{1}'.format(instance.user_id.id, filename)

class UserProfile(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=255, null=False)
    last_name = models.CharField(max_length=255, null=False)
    birth_date = models.DateField(null=True, blank=True)
    gender = models.CharField(max_length=10, null=False)
    address = models.CharField(max_length=255, blank=True)
    bio = models.TextField(blank=True)
    school = models.CharField(max_length=255, blank=True)
    work = models.CharField(max_length=255, blank=True)

class ImageProfile(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    avatar= models.ImageField(upload_to=media_directory_path, blank=True)
    background = models.ImageField(upload_to=media_directory_path, blank=True)