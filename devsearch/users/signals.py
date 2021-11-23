from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from .models import Profile
from django.contrib.auth.models import User
from django.core.mail import message, send_mail
from django.conf import settings


def profileUpdated(sender, instance, created, **kwargs):
    if created:
        user = instance
        profile = Profile.objects.create(
            user=user,
            username=user.username,
            email=user.email,
            name=user.first_name
        )

        subject = 'Welcome to DevSearch'
        message = 'Thank you for signing up with DevSearch!'

        send_mail(
            subject,
            message,
            settings.EMAIL_HOST_USER,
            [profile.email,],
            fail_silently=False
        )


def profileEdited(sender, instance, created, **kwargs):
    profile = instance
    user = profile.user

    if created == False:
        user.first_name = profile.name
        user.username = profile.username
        user.email = profile.email
        user.save()


def deleteUser(sender, instance, **kwargs):
    try:
        user = instance.user
        user.delete()
    except:
        pass


post_save.connect(profileUpdated, sender=User)
post_delete.connect(deleteUser, sender=Profile)
post_save.connect(profileEdited, sender=Profile)