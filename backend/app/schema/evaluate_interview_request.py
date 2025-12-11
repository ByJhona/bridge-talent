
from typing import List
from pydantic import BaseModel


class EvaluateInterviewRequest(BaseModel):
    userId: str
    topic: str
    questions: List[str]
    answers: List[str]
