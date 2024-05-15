
# import numpy as np
# import torch
# import pandas as pd
# from sklearn.metrics.pairwise import cosine_similarity
# from transformers import DistilBertTokenizer, DistilBertModel

# class RecommendationAlgorithm:
#     def __init__(self):
#         self.tokenizer = DistilBertTokenizer.from_pretrained('distilbert-base-uncased')
#         self.model = DistilBertModel.from_pretrained('distilbert-base-uncased')
#         self.products = pd.read_csv('products.csv')

#     # def recommend(self, user_embedding):
#     #     # Convert product descriptions to embeddings
#     #     product_embeddings = []
#     #     for description in self.products['description']:
#     #         inputs = self.tokenizer.encode_plus(
#     #             description,
#     #             add_special_tokens=True,
#     #             max_length=512,
#     #             return_attention_mask=True,
#     #             return_tensors='pt'
#     #         )
#     #         outputs = self.model(inputs['input_ids'], attention_mask=inputs['attention_mask'])
#     #         product_embeddings.append(outputs.last_hidden_state[:, 0, :].detach().numpy())

#     #     # Convert the list of arrays to a single array
#     #     product_embeddings_array = np.array(product_embeddings)
#     #     product_embeddings_array = product_embeddings_array.reshape(-1, 768)  # Ensure 768 features

#     #     # Reshape user_embedding to have 768 features
#     #     user_embedding = user_embedding.detach().numpy()
#     #     user_embedding = np.repeat(user_embedding, 384, axis=1)  # Repeat the 2 features to 768 features

#     #     # Calculate similarity between user embedding and product embeddings
#     #     similarities = cosine_similarity(user_embedding, product_embeddings_array)

#     #     # Get top-N recommendations
#     #     top_recommendations = similarities.argsort()[:5]
#     #     top_recommendations = top_recommendations.ravel()  # Flatten the 2D array into a 1D array

#     #     return self.products.iloc[top_recommendations]

    # new code 

import numpy as np
import torch
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity, pairwise_distances
from transformers import DistilBertTokenizer, DistilBertModel
class RecommendationAlgorithm:
    def __init__(self):
        self.tokenizer = DistilBertTokenizer.from_pretrained('distilbert-base-uncased')
        self.model = DistilBertModel.from_pretrained('distilbert-base-uncased')
        self.products = pd.read_csv('/Users/mahesh/Documents/GitHub/chatgenie/products.csv')

        # Precompute product embeddings
        product_embeddings = []
        for description in self.products['description']:
            inputs = self.tokenizer.encode_plus(
                description,
                add_special_tokens=True,
                max_length=512,
                return_attention_mask=True,
                return_tensors='pt'
            )
            outputs = self.model(inputs['input_ids'], attention_mask=inputs['attention_mask'])
            product_embeddings.append(outputs.last_hidden_state[:, 0, :].detach().numpy())

        product_embeddings = np.array(product_embeddings)
        np.save('product_embeddings.npy', product_embeddings)
    def recommend(self, user_embedding):
        # Load precomputed product embeddings
        product_embeddings = np.load('product_embeddings.npy')

        # Detach and normalize user embedding
        user_embedding = user_embedding.detach().numpy() / np.linalg.norm(user_embedding.detach().numpy())

        # Reshape user embedding to match the shape of product embeddings
        user_embedding = user_embedding.reshape(1, -1)

        # Ensure user embedding has the same number of features as product embeddings
        user_embedding = np.tile(user_embedding, (1, 768 // user_embedding.shape[1]))

        # Remove batch dimension from product embeddings
        product_embeddings = product_embeddings.squeeze(1)

        # Calculate pairwise distances between user embedding and product embeddings
        distances = pairwise_distances(user_embedding, product_embeddings, metric='cosine')
        print(distances)

        # Get top-N recommendations
        top_recommendations = np.argsort(distances)[:5]

        # Filter out identical products
        # top_recommendations = [i for i in top_recommendations if distances[0, i] != 0.0]
        top_recommendations = [i for i in top_recommendations if (distances[0, i] != 0.0).any()]
        # return self.products.iloc[top_recommendations]
        # return self.products.loc[top_recommendations]
        # return self.products.iloc[top_recommendations[:5]]  # returns the first 5 rows
        return self.products.iloc[top_recommendations[0]]  # returns a single row ## working
        #return self.products.iloc[top_recommendations].to_dict(orient='records')
        # print(top_recommendations)

# import numpy as np
# import torch
# import pandas as pd
# from sklearn.metrics.pairwise import cosine_similarity, pairwise_distances
# from transformers import BertTokenizer, BertModel

# class RecommendationAlgorithm:
#     def __init__(self):
#         self.tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
#         self.model = BertModel.from_pretrained('bert-base-uncased')
#         self.products = pd.read_csv('products.csv')

#         # Precompute product embeddings
#         product_embeddings = []
#         for description in self.products['description']:
#             inputs = self.tokenizer.encode_plus(
#                 description,
#                 add_special_tokens=True,
#                 max_length=512,
#                 return_attention_mask=True,
#                 return_tensors='pt'
#             )
#             outputs = self.model(inputs['input_ids'], attention_mask=inputs['attention_mask'])
#             product_embeddings.append(outputs.last_hidden_state[:, 0, :].detach().numpy())

#         product_embeddings = np.array(product_embeddings)
#         np.save('product_embeddings.npy', product_embeddings)

#     def recommend(self, user_embedding):
#         # Load precomputed product embeddings
#         product_embeddings = np.load('product_embeddings.npy')

#         # Detach and normalize user embedding
#         user_embedding = user_embedding.detach().numpy() / np.linalg.norm(user_embedding.detach().numpy())

#         # Reshape user embedding to match the shape of product embeddings
#         user_embedding = user_embedding.reshape(1, -1)

#         # Ensure user embedding has the same number of features as product embeddings
#         user_embedding = np.tile(user_embedding, (1, 768 // user_embedding.shape[1]))

#         # Remove batch dimension from product embeddings
#         product_embeddings = product_embeddings.squeeze(1)

#         # Calculate pairwise distances between user embedding and product embeddings
#         distances = pairwise_distances(user_embedding, product_embeddings, metric='cosine')
#         print(distances)
#         # Get top-N recommendations
#         top_recommendations = np.argsort(distances)[:5]
#         print(top_recommendations)
#         # # Filter out identical products
#         # top_recommendations = [i for i in top_recommendations if (distances[0, i] != 0.0).any()]

#         # # Return top recommendations
#         return self.products.iloc[top_recommendations[0]]