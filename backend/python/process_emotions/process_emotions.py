emotion_map = {
    "sadness": {"min_valence": 0.0, "max_valence": 0.2, "min_energy": 0.1, "max_energy": 0.3},
    "disappointment": {"min_valence": 0.1, "max_valence": 0.3, "min_energy": 0.1, "max_energy": 0.4},
    "annoyance": {"min_valence": 0.2, "max_valence": 0.4, "min_energy": 0.4, "max_energy": 0.7},
    "neutral": {"min_valence": 0.4, "max_valence": 0.6, "min_energy": 0.3, "max_energy": 0.5},
    "disapproval": {"min_valence": 0.1, "max_valence": 0.3, "min_energy": 0.4, "max_energy": 0.6},
    "realization": {"min_valence": 0.5, "max_valence": 0.7, "min_energy": 0.4, "max_energy": 0.6},
    "nervousness": {"min_valence": 0.3, "max_valence": 0.5, "min_energy": 0.6, "max_energy": 0.8},
    "approval": {"min_valence": 0.6, "max_valence": 0.8, "min_energy": 0.4, "max_energy": 0.6},
    "joy": {"min_valence": 0.7, "max_valence": 1.0, "min_energy": 0.6, "max_energy": 0.9},
    "anger": {"min_valence": 0.1, "max_valence": 0.3, "min_energy": 0.7, "max_energy": 1.0},
    "embarrassment": {"min_valence": 0.2, "max_valence": 0.4, "min_energy": 0.3, "max_energy": 0.6},
    "caring": {"min_valence": 0.7, "max_valence": 0.9, "min_energy": 0.3, "max_energy": 0.6},
    "remorse": {"min_valence": 0.1, "max_valence": 0.3, "min_energy": 0.2, "max_energy": 0.4},
    "disgust": {"min_valence": 0.1, "max_valence": 0.3, "min_energy": 0.4, "max_energy": 0.6},
    "grief": {"min_valence": 0.0, "max_valence": 0.2, "min_energy": 0.1, "max_energy": 0.3},
    "confusion": {"min_valence": 0.3, "max_valence": 0.5, "min_energy": 0.3, "max_energy": 0.5},
    "relief": {"min_valence": 0.6, "max_valence": 0.8, "min_energy": 0.2, "max_energy": 0.4},
    "desire": {"min_valence": 0.6, "max_valence": 0.8, "min_energy": 0.6, "max_energy": 0.9},
    "admiration": {"min_valence": 0.7, "max_valence": 0.9, "min_energy": 0.3, "max_energy": 0.6},
    "optimism": {"min_valence": 0.8, "max_valence": 1.0, "min_energy": 0.5, "max_energy": 0.8},
    "fear": {"min_valence": 0.1, "max_valence": 0.3, "min_energy": 0.7, "max_energy": 0.9},
    "love": {"min_valence": 0.9, "max_valence": 1.0, "min_energy": 0.4, "max_energy": 0.7},
    "excitement": {"min_valence": 0.8, "max_valence": 1.0, "min_energy": 0.7, "max_energy": 1.0},
    "curiosity": {"min_valence": 0.6, "max_valence": 0.8, "min_energy": 0.5, "max_energy": 0.7},
    "amusement": {"min_valence": 0.7, "max_valence": 0.9, "min_energy": 0.5, "max_energy": 0.7},
    "surprise": {"min_valence": 0.4, "max_valence": 0.6, "min_energy": 0.7, "max_energy": 0.9},
    "gratitude": {"min_valence": 0.9, "max_valence": 1.0, "min_energy": 0.3, "max_energy": 0.6},
    "pride": {"min_valence": 0.8, "max_valence": 1.0, "min_energy": 0.6, "max_energy": 0.8}
}

def process_emotions(emotions):
    valence_range = [0.0,1.0]
    energy_range = [0.0,1.0]

    for emotion in emotions:
        emotion_name = emotion['label']
        emotion_valence = emotion_map.get(emotion_name, {"min_valence": 0.5, "max_valence": 0.5})
        emotion_energy = emotion_map.get(emotion_name, {"min_energy": 0.5, "max_energy": 0.5})
        valence_range[0] = max(valence_range[0], emotion_valence["min_valence"])
        valence_range[1] = min(valence_range[1], emotion_valence["max_valence"])
        energy_range[0] = max(energy_range[0], emotion_energy["min_energy"])
        energy_range[1] = min(energy_range[1], emotion_energy["max_energy"])
    return valence_range, energy_range