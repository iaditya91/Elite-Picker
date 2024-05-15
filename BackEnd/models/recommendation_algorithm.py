# Recommendation algorithm implementation

import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity

class RecommendationAlgorithm:
    def __init__(self):
        self.products = pd.read_csv('products.csv')

    def recommend(self, user_embedding):
        # Calculate similarity between user embedding and product descriptions
        similarities = cosine_similarity(user_embedding, self.products['description'])
        # Get top-N recommendations
        top_recommendations = similarities.argsort()[:5]
        return self.products.iloc[top_recommendations]