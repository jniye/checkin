
import aiohttp
from urllib.parse import urlencode
from bs4 import BeautifulSoup

def create_url(query, checkin, checkout, group_adults, no_rooms, group_children, age_children=[], has_pets=False):
    """
    Constructs a search URL with specified parameters for booking.com.
    This includes details about the stay such as location, dates, number of adults, number of rooms, 
    number of children, and their ages.
    """
    url_base = "https://www.booking.com/searchresults.html"
    params = {
        "ss": query,
        "checkin": checkin,
        "checkout": checkout,
        "group_adults": group_adults,
        "no_rooms": no_rooms,
        "group_children": group_children,
        "age": age_children,
        "offset": 0,
        "order": "popularity"
    }
    # Encode parameters into a query string and append to the base URL
    if has_pets:
        params.update({
            "src": "searchresults",
            "nflt": "hotelfacility=4",
        })
    
    print(f"{url_base}?{urlencode(params, doseq=True)}")
    return f"{url_base}?{urlencode(params, doseq=True)}"

def extract_property_info(soup):
    # Find the first five property cards
    property_cards = soup.find_all(attrs={"data-testid": "property-card"}, limit=5)
    
    # Extract the title and image src for each property card
    properties = [
        {
            "title": card.find(attrs={"data-testid": "title"}).get_text(),
            "image_src": card.find(attrs={"data-testid": "image"}).get("src")
        }
        for card in property_cards
    ]
    
    return properties

async def search_bookings(url):
    """
    Fetches the booking data from the generated URL and parses it to extract titles of properties.
    Uses the 'aiohttp' library to perform asynchronous HTTP GET, and BeautifulSoup to parse HTML content.
    """
    headers = {
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    }
    async with aiohttp.ClientSession() as session:
        async with session.get(url, headers=headers, allow_redirects=True) as response:
            response_text = await response.text()
            soup = BeautifulSoup(response_text, 'html.parser')
            return extract_property_info(soup)
        
