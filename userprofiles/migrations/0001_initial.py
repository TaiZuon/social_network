import django.db.models.deletion
import userprofiles.models
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='ImageProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('avatar', models.ImageField(blank=True, default='users/default/avatar_default.png', upload_to=userprofiles.models.media_directory_path)),
                ('background', models.ImageField(blank=True, default='users/default/background_default.jpg', upload_to=userprofiles.models.media_directory_path)),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=255)),
                ('last_name', models.CharField(max_length=255)),
                ('birth_date', models.DateField(blank=True, null=True)),
                ('gender', models.CharField(max_length=10)),
                ('address', models.CharField(blank=True, max_length=255)),
                ('bio', models.TextField(blank=True)),
                ('school', models.CharField(blank=True, max_length=255)),
                ('work', models.CharField(blank=True, max_length=255)),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
