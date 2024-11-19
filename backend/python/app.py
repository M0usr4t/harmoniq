# app.py
from flask import Flask, request, jsonify
from models.roberta_model import get_emotions
from process_emotions.process_emotions import process_emotions
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


print("Initializing application and loading the model...")
get_emotions("")

@app.route('/analyze', methods=['POST'])
def analyze_text():
    try:
        data = request.get_json()
        if not data or 'text' not in data:
            return jsonify({'error': 'No text provided'}), 400

        text = data['text']
        emotions = get_emotions(text)
        valence_range, energy_range = process_emotions(emotions)

        response = {
            "valence_range": valence_range,
            "energy_range": energy_range,
        }
        return jsonify(response), 200
    except Exception as e:
        print(f"Error processing request: {e}")
        return jsonify({'error': 'Internal Server Error'}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
