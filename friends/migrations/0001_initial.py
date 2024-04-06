<<<<<<< HEAD
# Generated by Django 5.0.2 on 2024-04-06 15:22

import django.db.models.deletion
=======
# Generated by Django 4.1.13 on 2024-04-06 15:15

>>>>>>> 267cbecc7903ee3041a9b67f1f11043efdf6ea5b
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Friendship',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('user_id1', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='friendship_user1', to='users.user')),
                ('user_id2', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='friendship_user2', to='users.user')),
            ],
        ),
        migrations.CreateModel(
            name='FriendRequest',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(default='pending', max_length=45)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('from_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='friend_requests_sent', to='users.user')),
                ('to_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='friend_requests_received', to='users.user')),
<<<<<<< HEAD
            ],
        ),
        migrations.CreateModel(
            name='Friendship',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('user_id1', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='friendship_user1', to='users.user')),
                ('user_id2', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='friendship_user2', to='users.user')),
=======
>>>>>>> 267cbecc7903ee3041a9b67f1f11043efdf6ea5b
            ],
        ),
    ]
