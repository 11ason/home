import os
import base64
import json
import requests
from flask import Flask, request, jsonify, redirect, url_for
from flask_oauthlib.client import OAuth

app = Flask(__name__)
app.secret_key = os.urandom(24)
app.config['GITHUB_CONSUMER_KEY'] = 'your_github_client_id'
app.config['GITHUB_CONSUMER_SECRET'] = 'your_github_client_secret'
oauth = OAuth(app)

github = oauth.remote_app(
    'github',
    consumer_key=app.config['GITHUB_CONSUMER_KEY'],
    consumer_secret=app.config['GITHUB_CONSUMER_SECRET'],
    request_token_params={
        'scope': 'user:email',
    },
    base_url='https://api.github.com/',
    request_token_url=None,
    access_token_method='POST',
    access_token_url='https://github.com/login/oauth/access_token',
    authorize_url='https://github.com/login/oauth/authorize',
)

# Handle login
@app.route('/login')
def login():
    return github.authorize(callback=url_for('authorized', _external=True))

@app.route('/logout')
def logout():
    session.pop('github_token')
    return redirect(url_for('index'))

@app.route('/authorized')
def authorized():
    response = github.authorized_response()
    if response is None or response.get('access_token') is None:
        return 'Access denied: reason={} error={}'.format(
            request.args['error_reason'],
            request.args['error_description']
        )

    session['github_token'] = (response['access_token'], '')
    user_info = github.get('user')
    return jsonify(user_info.data)

# Upload the image to GitHub
@app.route('/upload', methods=['POST'])
def upload_image():
    data = request.json
    image_data = data.get('image')
    if not image_data:
        return jsonify({'error': 'No image data provided'}), 400
    
    image_data = image_data.split(",")[1]  # Remove the base64 prefix
    image_bytes = base64.b64decode(image_data)

    # Replace with your GitHub repo information
    github_repo = 'your_username/your_repo'
    github_api_url = f"https://api.github.com/repos/{github_repo}/contents/{image_data}"

    response = requests.put(github_api_url, headers={
        'Authorization': f'Bearer {session["github_token"][0]}',
    }, json={
        'message': 'Upload image',
        'content': base64.b64encode(image_bytes).decode('utf-8'),
    })

    if response.status_code == 201:
        return jsonify({'imageUrl': response.json()['content']['download_url']})
    else:
        return jsonify({'error': 'Failed to upload image'}), 500

# Send the image URL to AI
@app.route('/get-ai-response', methods=['POST'])
def get_ai_response():
    data = request.json
    image_url = data.get('imageUrl')
    
    if not image_url:
        return jsonify({'error': 'No image URL provided'}), 400
    
    # Call your AI here, passing the image URL
    ai_response = "This is the AI's response based on the image."
    
    return jsonify({'response': ai_response})

if __name__ == '__main__':
    app.run(debug=True)

