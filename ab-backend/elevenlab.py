from pathlib import Path
import re
import time
import requests
import json
from dotenv import load_dotenv
import os

load_dotenv()  # Load variables from .env file

def getVoices():
    # current_user = "Ryan Scott"  # Replace "username" with the actual username
    # endpoint_url = 'https://api.elevenlabs.io/v1/text-to-speech/{voice_id}/stream'
    voices_url = 'https://api.elevenlabs.io/v1/voices'
    api_key = os.getenv('ELEVENLAB_API_KEY') 

    headers = {
        'xi-api-key': api_key
    }

    voices_response = requests.get(voices_url, headers=headers)
    voices_array = voices_response.json()['voices'] if 'voices' in voices_response.json() else []

    filteredArray = [voice for voice in voices_array if '_' not in voice['name']]
    
    filteredArray.sort(key=lambda x: x['name'])

    selectedArray = [{'name': voice['name'], 'voice_id': voice['voice_id'], 'preview_url': voice['preview_url']} for voice in filteredArray]

    return selectedArray

def process_section(section, last_character):
    character_id = last_character  # Default Voice index
    paragraph_pattern = r'[\r\n]+'
    result = []
    last_chunk = ""
    chunk_buffer = ""
    print(section)
    ops_count = len(section['content']['ops'])
    chunk_size = 1500

    for idx in range(ops_count):
        op = section['content']['ops'][idx]
        if 'attributes' in op and 'customImage' in op['insert']:
            character_id = op['insert']['customImage']['character']
        else:
            if 'insert' in op:
                seg_text = last_chunk + op['insert']  # a text segmented by voice tags
                if len(seg_text) > 0:
                    last_chunk = ""
                    chunk_buffer = ""

                    paragraphs = re.split(paragraph_pattern, seg_text)
                    if len(paragraphs) > 0:
                        for paragraph in paragraphs:
                            if len(paragraph.strip()) != 0:

                                if len(paragraph) > chunk_size:
                                    sentences = re.split(r'(?<=[.?!])\s+(?=[a-z])', paragraph, flags=re.IGNORECASE)
                                    for sentence in sentences:
                                        if len(chunk_buffer) + len(sentence) > chunk_size:
                                            chunk_buffer = chunk_buffer.strip()
                                            result.append({
                                                "text": chunk_buffer,
                                                "character_id": character_id
                                            })
                                            chunk_buffer = ""
                                        chunk_buffer += sentence + "\n"
                                else:
                                    if len(chunk_buffer) + len(paragraph) > chunk_size:
                                        chunk_buffer = chunk_buffer.strip()
                                        result.append({
                                            "text": chunk_buffer,
                                            "character_id": character_id
                                        })
                                        chunk_buffer = ""

                                    chunk_buffer += paragraph + "\n...\n\n"

                        if len(chunk_buffer) > 0:
                            chunk_buffer = chunk_buffer.strip()
                            result.append({
                                "text": chunk_buffer,
                                "character_id": character_id
                            })
                            chunk_buffer = ""

    return result

def generate(_id, section_id, section, characters, last_character, action ):
    chunks = process_section(section, last_character)
    if action == 'test':
        chunks_length = 0
        for chunk in chunks:
            chunks_length += len(chunk["text"])
        if chunks_length > 200:
            return {
                "success": False,
                "message": "Please test up to 200 characters"
            }
    
    
    if action != 'test':
        dir_path = os.path.join(os.getcwd(), 'audio', str(_id))
    else:
        dir_path = os.path.join(os.getcwd(), 'audio', 'temp')
      
    if not os.path.exists(dir_path) or not os.path.isdir(dir_path):
        os.makedirs(dir_path)
        with open(os.path.join(os.getcwd(), 'error.log'), 'a') as error_log:
            error_log.write(f'creating {dir_path}\n')

    if action != 'test':
        filename = f'{_id}_{section_id}.mp3'
    else:
        filename = f'{_id}_{section_id}_test.mp3'

    file_path = os.path.join(dir_path, filename)
    
    elevenlab_api_url='https://api.elevenlabs.io/v1/text-to-speech/{voice_id}'
    success_chunk_file = 'success_chunk.txt'
    silence_audio_path = 'quarter_silence.mp3'
    elevenlab_api_key = os.getenv('ELEVENLAB_API_KEY') 
    # return { "success": True, "message": "Successfully generated the audio." }
    # # Open or create the file
    with open(file_path, 'wb') as file:
        chunk_idx = 0
        retry_count = 0
        error_occurred = False
        err_data = []

        Path(dir_path).joinpath(success_chunk_file).write_text(str(chunk_idx))

        while chunk_idx < len(chunks):
            chunk = chunks[chunk_idx]
            text = chunk['text']
            character = chunk['character_id']
            
            # used_tokens += len(text)
            voice_id = characters[int(character)]['voice_id']
            voice_name = characters[int(character)]['name']

            headers = {
                'xi-api-key': elevenlab_api_key,
                'Content-Type': 'application/json',
                'accept': 'audio/mpeg'
            }
            voice_settings_url = f'https://api.elevenlabs.io/v1/voices/{voice_id}/settings'
            response = requests.get(voice_settings_url, headers={'xi-api-key': elevenlab_api_key})
            settings = response.json()
            request_body = json.dumps({
                'text': text,
                'voice_settings': {
                    'stability': float(settings['stability']),
                    'similarity_boost': float(settings['similarity_boost'])
                }
            }, ensure_ascii=False)

            response = requests.post(elevenlab_api_url.replace('{voice_id}', voice_id), headers=headers, data=request_body, timeout=(30 * 60))

            if response.status_code != 200:
                error_message = response.text
                Path(dir_path).joinpath(f"request_chunk_error_{chunk_idx}.txt").write_text(error_message)
                error_occurred = True
            else:
                file.write(response.content)
                error_occurred = False

            if error_occurred:
                if retry_count > 3:
                    chunk_idx += 1
                    retry_count = 0
                    Path(dir_path).joinpath(success_chunk_file).write_text(str(chunk_idx))
                    Path(dir_path).joinpath("progress_skipped.txt").write_text(f'chunk_{chunk_idx}', append=True)
                else:
                    retry_count += 1
            else:
                chunk_idx += 1
                retry_count = 0
                Path(dir_path).joinpath(success_chunk_file).write_text(str(chunk_idx))

            time.sleep(1)
    return { "success": True, "message": "Successfully generated the audio", "audio" : filename }