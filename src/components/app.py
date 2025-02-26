from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import google.generativeai as genai

# Google AI Studio API kulcs (cseréld le a sajátodra!)
GOOGLE_AI_API_KEY = "AIzaSyCb7BdCr9yJT5DIyYfwrkGhML-sX3TyPuo"
genai.configure(api_key=GOOGLE_AI_API_KEY)

app = Flask(__name__)
CORS(app)

# Wikipedia információ lekérése
def get_wikipedia_summary(query):
    try:
        response = requests.get(f"https://en.wikipedia.org/api/rest_v1/page/summary/{query}")
        data = response.json()
        return data.get("extract", "I couldn't find relevant information on Wikipedia.")
    except Exception as e:
        return "I couldn't fetch data from Wikipedia at the moment."

conversation_history = []

# AI válasz generálása Gemini API segítségével
# AI response generation with Gemini API
# AI response generation with Gemini API
def get_dynamic_response(message, conversation_history):
    try:
        model = genai.GenerativeModel("gemini-pro")
        
        # Convert conversation history to the correct format
        formatted_messages = []
        for msg in conversation_history:
            role = "user" if msg["role"] == "user" else "model"  # Change "assistant" → "model"
            formatted_messages.append({"role": role, "parts": [{"text": msg["content"]}]})

        # Append user message in the correct format
        formatted_messages.append({"role": "user", "parts": [{"text": message}]})

        # Generate AI response
        response = model.generate_content(formatted_messages)
        
        return response.text if response else "I couldn't generate a response."
    except Exception as e:
        return f"I'm having trouble accessing AI capabilities right now. Error: {str(e)}"



@app.route("/chatbot", methods=["POST"])
def chatbot():
    global conversation_history
    data = request.get_json()
    user_message = data.get("message", "").lower()
    
    # Wikipedia keresés kezelése
    if user_message.startswith("search wikipedia for"):
        query = user_message.replace("search wikipedia for", "").strip()
        wiki_summary = get_wikipedia_summary(query)
        return jsonify({"reply": wiki_summary})
    
    # AI válasz generálása
    ai_reply = get_dynamic_response(user_message, conversation_history)
    
    # Előzmény frissítése (max 10 üzenet tárolása)
    conversation_history.append({"role": "user", "content": user_message})
    conversation_history.append({"role": "assistant", "content": ai_reply})
    conversation_history = conversation_history[-10:]
    
    return jsonify({"reply": ai_reply})

if __name__ == "__main__":
    app.run(debug=True, port=5000)