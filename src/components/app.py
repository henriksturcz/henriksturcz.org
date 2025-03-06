import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("GENAI_API_KEY")
genai.configure(api_key=api_key)

# Create the model with proper settings
generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 40,
    "max_output_tokens": 8192,
    "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
    model_name="gemini-1.5-pro",
    generation_config=generation_config,
)

# Start a chat session
chat_session = model.start_chat(history=[])

app = Flask(__name__)
CORS(app)

# Wikipedia information retrieval
def get_wikipedia_summary(query):
    try:
        response = requests.get(f"https://en.wikipedia.org/api/rest_v1/page/summary/{query}")
        data = response.json()
        return data.get("extract", "I couldn't find relevant information on Wikipedia.")
    except Exception as e:
        return f"Error fetching Wikipedia data: {str(e)}"

@app.route("/chatbot", methods=["POST"])
def chatbot():
    data = request.get_json()
    user_message = data.get("message", "").strip()

    if not user_message:
        return jsonify({"reply": "Please enter a valid message."})

    # Wikipedia search handling
    if user_message.lower().startswith("search wikipedia for"):
        query = user_message.replace("search wikipedia for", "").strip()
        wiki_summary = get_wikipedia_summary(query)
        return jsonify({"reply": wiki_summary})

    try:
        # Generate AI response using the chat session
        response = chat_session.send_message(user_message)
        ai_reply = response.text if response else "I couldn't generate a response."
    except Exception as e:
        ai_reply = f"AI Error: {str(e)}"

    return jsonify({"reply": ai_reply})

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
