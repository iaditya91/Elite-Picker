# from flask import Flask, request, jsonify
# # from llm_model import LLMModel
# from .recommendation_algorithm import RecommendationAlgorithm
# from .llm_model import LLMModel
# app = Flask(__name__)

# llm_model = LLMModel()
# recommendation_algorithm = RecommendationAlgorithm()

# @app.route('/', methods=['GET'])
# def index():
#     return 'Welcome to your Personal Store!'

# @app.route('/chatbot', methods=['GET', 'POST'])
# def chatbot():
#     if request.method == 'POST':
#         # if request.is_json:
#             # user_input = request.get_json()['user_input']
#             # # Process the user input and generate a response
#             # response = {'message': 'Hello, world!'}
#             # return jsonify(response)
#         print("Mahesh")
#         print(request)
#         user_input = request.get_json()['user_input']
#         # print(user_input)
#         user_embedding = llm_model.process(user_input)
#         # Get recommendations
#         recommendations = recommendation_algorithm.recommend(user_embedding)
#         return jsonify({'recommendations': recommendations.to_dict('records')})
    
#     else:
#         # Return a form or a page for the user to input their query
#         return '''
#             <form action="" method="post">
#                 <input type="text" name="user_input" />
#                 <input type="submit" value="Submit" />
#             </form>
#         '''

# if __name__ == '__main__':
#     app.run(debug=True)

from flask import Flask, request, jsonify
from recommendation_algorithm import RecommendationAlgorithm
from llm_model import LLMModel
app = Flask(__name__)

llm_model = LLMModel()
recommendation_algorithm = RecommendationAlgorithm()

@app.route('/', methods=['GET'])
def index():
    return 'Welcome to your Personal Store!'

@app.route('/chatbot', methods=['GET', 'POST'])
def chatbot():
    if request.method == 'POST':
        # if request.is_json:
            # user_input = request.get_json()['user_input']
            # # Process the user input and generate a response
            # response = {'message': 'Hello, world!'}
            # return jsonify(response)
        # print("Mahesh")
        # print(request)
        user_input = request.get_json()['user_input']
        # print(user_input)
        user_embedding = llm_model.process(user_input)
        # Get recommendations
        recommendations = recommendation_algorithm.recommend(user_embedding)
        return jsonify({'recommendations': recommendations.to_dict('records')})
        # return jsonify({'recommendations': recommendations})
    else:
        # Return a form or a page for the user to input their query
        return '''
            <form action="" method="post">
                <input type="text" name="user_input" />
                <input type="submit" value="Submit" />
            </form>
        '''

if __name__ == '__main__':
    app.run(debug=True)
