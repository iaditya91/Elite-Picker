# LLM model implementation

import torch
from transformers import DistilBertTokenizer, DistilBertForSequenceClassification

class LLMModel:
    def __init__(self):
        self.tokenizer = DistilBertTokenizer.from_pretrained('distilbert-base-uncased')
        self.model = DistilBertForSequenceClassification.from_pretrained('distilbert-base-uncased')

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