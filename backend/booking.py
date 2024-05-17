from urllib.parse import urlencode
from bs4 import BeautifulSoup
import aiohttp
import asyncio

def create_url(query, checkin, checkout, group_adults, no_rooms, group_children, age_children=[]):
    """
    Constructs a search URL with specified parameters.
    """
    url_base = "https://www.booking.com/searchresults.html"
    params = {
        "ss": query,
        "ssne": query,
        "checkin": checkin,
        "checkout": checkout,
        "group_adults": group_adults,
        "no_rooms": no_rooms,
        "group_children": group_children,
        "age": age_children,
        "offset": 0,
    }
    return f"{url_base}?{urlencode(params, doseq=True)}"

async def search_bookings(session, url, headers):
    """
    Fetches booking data asynchronously and parses the titles from the HTML.
    """
    try:
        async with session.get(url, headers=headers, allow_redirects=True) as response:
            response.raise_for_status()
            content = await response.text()
            # find the first five data-testid="property-card"
            # extract the title by this
            soup = BeautifulSoup(content, "lxml")
            return [prop.get_text() for prop in soup.find_all(attrs={"data-testid": "title"}, limit = 5)]
    except aiohttp.ClientError as e:
        print(f"HTTP request failed: {e}")
    except Exception as e:
        print(f"An error occurred: {e}")
    return []

async def main(query, checkin, checkout, group_adults, no_rooms, group_children, age_children=[]):
    """
    Main function to run the booking search.
    """
    headers = {
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    }
    async with aiohttp.ClientSession() as session:
        url = create_url(query, checkin, checkout, group_adults, no_rooms, group_children, age_children)
        property_titles = await search_bookings(session, url, headers)
        return property_titles

# Parameters for the function
params = ("Downtown Chicago", "2024-05-23", "2024-05-24", 2, 1, 1, [1])

# Run the main function and print the results
if __name__ == "__main__":
    result = asyncio.run(main(*params))
    print(result)
