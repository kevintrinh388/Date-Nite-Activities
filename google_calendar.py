"""Handles Google Calendar API requests"""
import os
import requests
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

key = os.getenv("REACT_APP_CALENDAR_KEY")


def add_event(start, end, token, place):
    """add event"""
    url = f"https://www.googleapis.com/calendar/v3/calendars/primary/events?key={key}"
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json",
        "Accept": "application/json",
    }
    data = {"start": {"dateTime": start}, "end": {"dateTime": end}, "summary": place}
    response = requests.post(url, headers=headers, json=data)
    print("Status Code", response.status_code)
    print("JSON Response ", response.json())

    return response.json()
