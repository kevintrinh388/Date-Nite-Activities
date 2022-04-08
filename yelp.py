'''Handles Yelp API requests'''
import os
import requests
from dotenv import find_dotenv, load_dotenv


load_dotenv(find_dotenv())

YELP_KEY = os.getenv("YELP_KEY")

def business_search(location, term="Restaurant", filter_rating=0, price=None, sort_by="best_match"):
    '''Searches for businesses near a chosen location'''
    response = requests.get(
        "https://api.yelp.com/v3/businesses/search",
        params={
            'location': location,
            'term': term,
            'sort_by':sort_by,
            'limit' : 50,
            'price' : price
        },
        headers={
            'Authorization' : f"Bearer {YELP_KEY}"
        }
    )
    response_json = response.json()
    businesses = response_json["businesses"]
    business_list = []
    for i in businesses:
        if i["rating"] >= filter_rating:
            if 'price' in i:
                business_list.append(
                {
                    "id" : i["id"],
                    "name" : i["name"],
                    "rating" : i["rating"],
                    "image_url" : i["image_url"],
                    "url" : i["url"],
                    "location" : i["location"],
                    "price" : i["price"]
                }
            )
            else:
                business_list.append(
                    {
                        "id" : i["id"],
                        "name" : i["name"],
                        "rating" : i["rating"],
                        "image_url" : i["image_url"],
                        "url" : i["url"],
                        "location" : i["location"],
                    }
                )

    return business_list
    