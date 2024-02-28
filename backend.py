from flask import Flask, request, redirect, session, jsonify, make_response
from flask_cors import CORS
import requests
import base64
import urllib.parse

# TODO: Replace these with your Spotify client ID, client secret
client_id = ''
client_secret = ''
redirect_uri = 'http://localhost:8000/callback'

# Set the scope of access required (adjust if more permissions are needed)
scope = 'user-top-read'

# Flask app setup
app = Flask(__name__)
CORS(app)
app.secret_key = 'UTFRMappingIsTheBest'  # Change this to a random secret key
app.config['userData'] = {}

# Spotify URLs
spotify_auth_url = 'https://accounts.spotify.com/authorize'
spotify_token_url = 'https://accounts.spotify.com/api/token'
spotify_base_url = 'https://api.spotify.com/v1'


@app.route('/')
def login():
    auth_query_parameters = {
        'response_type': 'code',
        'redirect_uri': redirect_uri,
        'scope': scope,
        'client_id': client_id
    }
    url_args = "&".join([f"{key}={urllib.parse.quote(val)}" for key, val in auth_query_parameters.items()])
    auth_url = f"{spotify_auth_url}?{url_args}"
    return redirect(auth_url)


@app.route('/callback')
def callback():
    auth_code = request.args['code']
    code_payload = {
        'grant_type': 'authorization_code',
        'code': str(auth_code),
        'redirect_uri': redirect_uri
    }
    base64encoded = base64.b64encode(f"{client_id}:{client_secret}".encode()).decode()
    headers = {'Authorization': f'Basic {base64encoded}'}
    post_request = requests.post(spotify_token_url, data=code_payload, headers=headers)

    response_data = post_request.json()
    access_token = response_data['access_token']
    session['access_token'] = access_token
    response = make_response(redirect('http://localhost:3001/top-songs'))
    response.set_cookie('access_token', access_token, max_age=3600, secure=False, httponly=False)

    return response

# TODO: Add a route to get the top tracks

def top_tracks():
    access_token = request.headers.get('Authorization')
    if not access_token:
        return jsonify({'error': 'Unauthorized'}), 401
    
    headers = {'Authorization': f'Bearer {access_token}'}
    # TODO: Get the user's top tracks from Spotify
    top_tracks_url = ''
    top_tracks_response = requests.get(top_tracks_url, headers=headers)
    if (top_tracks_response.status_code != 200):
        return jsonify({'error': 'Error getting top tracks'}), 500
    top_tracks_data = top_tracks_response.json()

    # TODO: Extract the top tracks names, artists, URL, and image
    top_tracks = []

    return jsonify(top_tracks)

if __name__ == '__main__':
    app.run(debug=True, port=8000)
