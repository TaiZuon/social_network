from django.db import models
from users.models import User
from userprofiles.models import UserProfile

from django_mongoengine import fields, Document, EmbeddedDocument
from mongoengine.fields import EmbeddedDocumentField

class UserMess(EmbeddedDocument):
    user_id = fields.IntField()
    name = fields.StringField()
    avatar = fields.StringField()

    def __str__(self):
        return f"{self.user_id}_{self.name}"

class Participants(Document):
    channel_id = fields.IntField()
    user_id = fields.IntField()

    def __str__(self):
        return f"c_{self.channel_id}_u_{self.user_id}"
    meta = {
        'db': 'social_network',
        'collection': 'participants',
    }

class Channel(Document):
    channel_id = fields.SequenceField(primary_key=True)
    created_at = fields.DateTimeField()
    capacity = fields.IntField()
    meta = {
        'db': 'social_network',
        'collection': 'channels',
    }
    def __str__(self):
        return f"channel_{self.channel_id}"

class Messeeji(Document):
    message_id = fields.SequenceField(primary_key=True)
    sender_id = fields.IntField()
    channel_id = fields.IntField()
    message_content = fields.StringField()
    is_read = fields.BooleanField(default=False)
    status = fields.StringField()
    created_at = fields.DateTimeField()

    meta = {
        'db': 'social_network',
        'collection': 'messeejis',
        'indexes': [
        ]
    }
    def __str__(self):
        return f"{self.message_id}_{self.sender_id.__str__}_{self.channel_id}_{self.message_content}"


 
