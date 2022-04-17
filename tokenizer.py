from itsdangerous import URLSafeTimedSerializer

import os
from dotenv import find_dotenv, load_dotenv

load_dotenv(find_dotenv())


def generate_confirmation_token(email):
    serializer = URLSafeTimedSerializer(os.getenv("SECRET_KEY"))
    return serializer.dumps(email, salt=os.getenv("SECURITY_PASSWORD_SALT"))


def confirm_token(token, expiration=2147483647):
    serializer = URLSafeTimedSerializer(os.getenv("SECRET_KEY"))
    try:
        email = serializer.loads(
            token, salt=os.getenv("SECURITY_PASSWORD_SALT"), max_age=expiration
        )
    except:
        return False
    return email
