from typing import List
from pydantic import BaseModel, Field

class Abilities(BaseModel):
    category: str = Field(..., description="Nome da categoria de habilidades")
    skills: List[str] = Field(..., description="Lista de skills dentro da categoria")
