from urllib import response
from dotenv import find_dotenv, load_dotenv
import requests
import os

load_dotenv(find_dotenv())

MAPS_KEY = os.getenv("MAPS_KEY")

def maps_search(q="Atlanta, GA"):

    return f"https://www.google.com/maps/embed/v1/search?key={MAPS_KEY}&q={q}"