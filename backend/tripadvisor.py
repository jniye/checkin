import requests
from urllib.parse import urlencode
from config import API_KEY

def build_url(base_url, params):
    """Utility function to build a URL with query parameters."""
    return f"{base_url}?{urlencode(params)}"

def fetch_location_id(hotel_name, headers):
    """Fetch the first location ID based on the hotel name."""
    search_url = build_url(
        "https://api.content.tripadvisor.com/api/v1/location/search",
        {
            "key": API_KEY,
            "searchQuery": hotel_name,
            "category": "hotels",
            "language": "en"
        }
    )
    search_data = requests.get(search_url, headers=headers).json()
    return search_data['data'][0]['location_id']

def fetch_hotel_details(location_id, headers):
    """Fetch hotel details using the location ID."""
    details_url = build_url(
        f"https://api.content.tripadvisor.com/api/v1/location/{location_id}/details",
        {
            "key": API_KEY,
            "currency": "USD",
            "language": "en"
        }
    )
    return requests.get(details_url, headers=headers).json()

def get_hotel_details(hotel_name):
    headers = {"accept": "application/json"}
    location_id = fetch_location_id(hotel_name, headers)
    hotel_details = fetch_hotel_details(location_id, headers)
    return {
        "rating": hotel_details["rating"],
        "num_reviews": hotel_details["num_reviews"]
    }
