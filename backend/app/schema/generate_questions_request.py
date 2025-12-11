from pydantic import BaseModel


class GenerateQuestionsRequest(BaseModel):
    topic: str