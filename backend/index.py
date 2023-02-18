from flask import Flask, request, jsonify
from transformers import pipeline
import json
from flask_cors import CORS



class SentimentalClassifier:
      def __init__(self):
        self.pipeline = pipeline("sentiment-analysis")
      def Predict(self,text):
        if(len(text)>0):
          return self.pipeline(text)
        else:
          return {}


app = Flask(__name__)
CORS(app)
recommendation = SentimentalClassifier()

@app.route("/sentiment", methods=["GET"])
def sentiment():
    # expecting a base64 string
    query = request.args.get("query")
    if query is None:
        return jsonify({'error' : 'Malformed Request'})
    else:
        query = base64.b64decode(query).decode("utf-8")
        return recommendation.Predict(query)

if __name__ == "__main__":
    app.run(host='0.0.0.0',port=5001,debug=True)
