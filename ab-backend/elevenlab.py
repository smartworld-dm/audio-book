import requests
import json
from dotenv import load_dotenv
import os

load_dotenv()  # Load variables from .env file

def getVoices():
    # current_user = "Ryan Scott"  # Replace "username" with the actual username
    # endpoint_url = 'https://api.elevenlabs.io/v1/text-to-speech/{voice_id}/stream'
    voices_url = 'https://api.elevenlabs.io/v1/voices'
    api_key = os.getenv('API_KEY') 

    headers = {
        'xi-api-key': api_key
    }

    voices_response = requests.get(voices_url, headers=headers)
    voices_array = voices_response.json()['voices'] if 'voices' in voices_response.json() else []

    filteredArray = [voice for voice in voices_array if '_' not in voice['name']]
    
    filteredArray.sort(key=lambda x: x['name'])

    selectedArray = [{'name': voice['name'], 'voice_id': voice['voice_id'], 'preview_url': voice['preview_url']} for voice in filteredArray]

    return selectedArray