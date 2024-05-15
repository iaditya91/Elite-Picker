# Main application entry point

from app.chatbot import app
# from app.routes import chatbot_blueprint
from app.routes.chatbot import chatbot_blueprint


app.register_blueprint(chatbot_blueprint)

if __name__ == '__main__':
    app.run(debug=True)
