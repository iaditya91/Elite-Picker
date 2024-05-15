import torch
from transformers import DistilBertTokenizer, DistilBertForSequenceClassification

# class LLMModel:
#     def __init__(self):
#         self.tokenizer = DistilBertTokenizer.from_pretrained('distilbert-base-uncased')
#         self.model = DistilBertForSequenceClassification.from_pretrained('distilbert-base-uncased')
    
#     def process(self, user_input):
#         inputs = self.tokenizer.encode_plus(
#             user_input,
#             add_special_tokens=True,
#             max_length=512,
#             return_attention_mask=True,
#             return_tensors='pt'
#         )
#         outputs = self.model(inputs['input_ids'], attention_mask=inputs['attention_mask'])
#         return outputs.logits

#new code -after working code # but not working
# from transformers import LLaMAForSequenceClassification, LLaMATokenizer
# class LLMModel:
#     def __init__(self):
#         self.tokenizer = LLaMATokenizer.from_pretrained('llama-3')
#         self.model = LLaMAForSequenceClassification.from_pretrained('llama-3')

#     def process(self, user_input):
#         inputs = self.tokenizer.encode_plus(
#             user_input,
#             add_special_tokens=True,
#             max_length=512,
#             return_attention_mask=True,
#             return_tensors='pt'
#         )
#         outputs = self.model(inputs['input_ids'], attention_mask=inputs['attention_mask'])
#         return outputs.last_hidden_state[:, 0, :]

# bert
import torch
from transformers import BertTokenizer, BertModel

class LLMModel:
    def __init__(self):
        self.tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
        self.model = BertModel.from_pretrained('bert-base-uncased')

    def process(self, user_input):
        inputs = self.tokenizer.encode_plus(
            user_input,
            add_special_tokens=True,
            max_length=512,
            return_attention_mask=True,
            return_tensors='pt'
        )
        outputs = self.model(inputs['input_ids'], attention_mask=inputs['attention_mask'])
        return outputs.last_hidden_state[:, 0, :]
