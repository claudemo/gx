# app.py
import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import logging
from langchain_groq import ChatGroq  # Ensure this is correctly installed

 

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Setup logging to a file and the console
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s %(levelname)s %(name)s %(threadName)s : %(message)s',
    handlers=[
        logging.FileHandler("app.log"),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

def query_grok(prompt, model="llama-3.1-8b-instant", temperature=0.0):
    """
    Queries the Grok API using the ChatGroq class and returns the AI response.
    
    Parameters:
        prompt (str): The user's input message.
        model (str): The model name to use.
        temperature (float): Sampling temperature.
    
    Returns:
        str: The AI's response or an error message.
    """
    grok_api_key = os.getenv('GROK_API_KEY')
    try:
        # Initialize the ChatGroq instance
        llm = ChatGroq(
            temperature=temperature,
            groq_api_key=grok_api_key,
            model_name=model
        )
        # Invoke the model with the prompt
        response = llm.invoke(prompt)
        return response.content.strip()
    except Exception as e:
        logger.error(f"Error in query_grok: {e}")
        return "Failed to retrieve response from Grok."

@app.route('/api/chat', methods=['POST'])
def chat():
    """
    Handles chat messages from the frontend and responds using the Grok API.
    Expects JSON data with a 'message' field.
    """
    data = request.get_json()
    user_message = data.get('message')

    logger.debug(f"Received message: {user_message}")

    if not user_message or not isinstance(user_message, str):
        logger.error("Invalid or missing 'message' field.")
        return jsonify({'error': 'Invalid or missing "message" field.'}), 400

    try:
        ai_reply = query_grok(user_message)
        logger.debug(f"AI reply: {ai_reply}")
        return jsonify({'reply': ai_reply}), 200
    except Exception as e:
        logger.exception("Error processing chat request.")
        return jsonify({'error': 'An error occurred while processing your request.'}), 500

if __name__ == '__main__':
    app.run(debug=True)
