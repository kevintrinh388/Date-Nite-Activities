"""Handles Email"""
from flask_mail import Message


def create_email(user, subject, html, sender):
    """Method for creating email"""
    return Message(
        subject,
        recipients=[user.email],
        html=html,
        sender=sender,
    )
