import os
import json
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

api_key_openai = os.getenv("OPENAI_API_KEY")
openai_client = OpenAI(api_key=api_key_openai)