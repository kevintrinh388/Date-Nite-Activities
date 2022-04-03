import os
from dotenv import find_dotenv, load_dotenv

load_dotenv(find_dotenv())

MAPS_KEY = os.getenv("MAPS_KEY")


# q="Atlanta, GA"
def maps_search(q):
    print(q)
    return f"https://www.google.com/maps/embed/v1/search?key={MAPS_KEY}&q={q}"
