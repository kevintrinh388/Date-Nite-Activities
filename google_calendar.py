import requests

def add_event(start, end, token, place):
    '''add event'''
    url = "https://www.googleapis.com/calendar/v3/calendars/primary/events?key=AIzaSyD-NmrVxw12QV6GJIynhXUIVpkQZ3Y13uo"
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json",
        "Accept": "application/json",
    }
    data = {
        "start":{'dateTime':start},
        "end":{'dateTime':end},
        "summary":place
    }
    response = requests.post(url, headers=headers, json=data)
    print("Status Code", response.status_code)
    print("JSON Response ", response.json())

    return response.json()
