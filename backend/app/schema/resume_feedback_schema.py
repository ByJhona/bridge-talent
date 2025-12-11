from typing import List
from pydantic import BaseModel, Field
from .resume_abilities_schema import Abilities
class ResumeFeedback(BaseModel):
    feedback: str = Field(..., description="Feedback detalhado do currículo")
    abilities: List[Abilities] = Field(..., description="Lista de categorias com skills identificadas")
