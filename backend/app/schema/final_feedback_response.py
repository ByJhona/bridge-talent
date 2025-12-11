
from pydantic import BaseModel


class FinalFeedbackResponse(BaseModel):
    feedback: str