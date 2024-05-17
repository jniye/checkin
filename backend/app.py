from quart import Quart, jsonify, request
from utils.booking import create_url, search_bookings
from utils.tripadvisor import get_hotel_details
import asyncio

app = Quart(__name__)

@app.route('/crawl', methods=['POST'])
async def crawl():
    """
    API endpoint that initiates the web crawling based on parameters provided by the user.
    Expects a JSON payload with required parameters for creating a URL.
    """
    data = await request.get_json()
    try:
        # Extract parameters from JSON and call create_url
        url = create_url(
            data['query'], data['checkin'], data['checkout'],
            data['group_adults'], data['no_rooms'], data['group_children'],
            data.get('age_children', []), data.get("has_pets")
        )
        # Fetch and parse booking data
        # properties = asyncio.run(search_bookings(*url))
        properties = await search_bookings(url)
        print(properties)
        
        # Fetch additional details from TripAdvisor for each property asynchronously
        tasks = [get_hotel_details(property['title']) for property in properties]
        detailed_properties = await asyncio.gather(*tasks)
        
        # Update properties with the detailed information
        for i, details in enumerate(detailed_properties):
            properties[i].update(details)
        
        return jsonify(properties)
    except KeyError as e:
        return jsonify({"error": f"Missing parameter: {e}"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run()
