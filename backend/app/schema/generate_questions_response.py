from typing import List

from pydantic import BaseModel


class GenerateQuestionsResponse(BaseModel):
    questions: List[str]