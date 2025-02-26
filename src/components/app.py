from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import google.generativeai as genai


GOOGLE_AI_API_KEY = ""
genai.configure(api_key=GOOGLE_AI_API_KEY)

app = Flask(__name__)
CORS(app)


def get_wikipedia_summary(query):
    try:
        response = requests.get(f"https://en.wikipedia.org/api/rest_v1/page/summary/{query}")
        data = response.json()
        return data.get("extract", "I couldn't find relevant information on Wikipedia.")
    except Exception as e:
        return "I couldn't fetch data from Wikipedia at the moment."

conversation_history = []


def get_dynamic_response(message, conversation_history):
    try:
        model = genai.GenerativeModel("gemini-pro")
        

        formatted_messages = []
        for msg in conversation_history:
            role = "user" if msg["role"] == "user" else "model"  
            formatted_messages.append({"role": role, "parts": [{"text": msg["content"]}]})


        formatted_messages.append({"role": "user", "parts": [{"text": message}]})

     
        response = model.generate_content(formatted_messages)
        
        return response.text if response else "I couldn't generate a response."
    except Exception as e:
        return f"I'm having trouble accessing AI capabilities right now. Error: {str(e)}"



@app.route("/chatbot", methods=["POST"])
def chatbot():
    global conversation_history
    data = request.get_json()
    user_message = data.get("message", "").lower()
    
  
    if user_message.startswith("search wikipedia for"):
        query = user_message.replace("search wikipedia for", "").strip()
        wiki_summary = get_wikipedia_summary(query)
        return jsonify({"reply": wiki_summary})
    
   
    ai_reply = get_dynamic_response(user_message, conversation_history)
    

    conversation_history.append({"role": "user", "content": user_message})
    conversation_history.append({"role": "assistant", "content": ai_reply})
    conversation_history = conversation_history[-10:]
    
    return jsonify({"reply": ai_reply})

if __name__ == "__main__":
    app.run(debug=True, port=5000)
