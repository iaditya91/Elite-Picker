from flask import Blueprint
from app.chatbot import chatbot

chatbot_blueprint = Blueprint('chatbot', __name__)

@chatbot_blueprint.route('/chatbot', methods=['POST'])
def chatbot():
    # Call the chatbot function from app/chatbot.py
    return chatbot()