import aiohttp
from urllib.parse import urlencode
from config import API_KEY

def build_url(base_url, params):
    """Utility function to build a URL with query parameters."""
    return f"{base_url}?{urlencode(params)}"

async def fetch_location_id(hotel_name, session):
    """Fetch the first location ID based on the hotel name asynchronously."""
    search_url = build_url(
        "https://api.content.tripadvisor.com/api/v1/location/search",
        {
            "key": API_KEY,
            "searchQuery": hotel_name,
            "category": "hotels",
            "language": "en"
        }
    )
    async with session.get(search_url) as response:
        search_data = await response.json()
        return search_data['data'][0]['location_id']

async def fetch_hotel_details(location_id, session):
    """Fetch hotel details using the location ID asynchronously."""
    details_url = build_url(
        f"https://api.content.tripadvisor.com/api/v1/location/{location_id}/details",
        {
            "key": API_KEY,
            "currency": "USD",
            "language": "en"
        }
    )
    async with session.get(details_url) as response:
        return await response.json()

async def get_hotel_details(hotel_name):
    async with aiohttp.ClientSession() as session:
        location_id = await fetch_location_id(hotel_name, session)
        hotel_details = await fetch_hotel_details(location_id, session)
        return {
            "rating": hotel_details["rating"],
            "num_reviews": hotel_details["num_reviews"]
        }
