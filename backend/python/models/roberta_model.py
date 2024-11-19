# models/roberta_model.py
from transformers import pipeline

model = None

def load_emotion_model():
    global model
    if model is None:
        print("Loading the Hugging Face model...")
        model = pipeline(
            "text-classification",
            model="SamLowe/roberta-base-go_emotions",
        )
    return model

def get_emotions(text):
    emotion_model = load_emotion_model()
    return emotion_model(text)
