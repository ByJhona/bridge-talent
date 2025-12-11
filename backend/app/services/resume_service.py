import os
from typing import Optional
from pydantic import BaseModel
from app.schema.resume_feedback_schema import ResumeFeedback
from dotenv import load_dotenv
from app.core.config import openai_client

load_dotenv()

OPENAI_MODEL = os.getenv("OPENAI_MODEL", "gpt-5-nano")
class ResumeService(BaseModel):
    """
    Classe para extrair tipo de documento e campos importantes de um texto usando GPT-5.
    """

    @staticmethod
    def extract_feedback(text: str) -> Optional[ResumeFeedback]:
        system_prompt = """
            Você é um assistente especializado em análise de currículos.
            Analise o seguinte currículo fornecido e retorne:
            1. Feedback detalhado sobre pontos fortes, fracos e áreas de melhoria.
            2. Skills identificadas, categorizadas por área (Frontend, Backend, Soft Skills, etc.)
            3. Sugestões para melhorar o currículo.
            4. Seria interessante estruturar bem para exibição, pode colocar quebra de linha para manter o texto organizado.
            
            Ex: 
            {"abilities": [
            {"category": "Frontend", "skills": ["React", "TypeScript"]},
            {"category": "Backend", "skills": ["Python", "Java"]}
                    ],
            "feedback": "Ótimo currículo! Pode detalhar mais suas experiências em Backend."}
            """


        try:
            completion = openai_client.responses.parse(
                model=OPENAI_MODEL,
                input=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": f"Texto para análise: {text}"}
                ],
                text_format=ResumeFeedback,
            )
            return completion.output_parsed
        except Exception as e:
            print(f"[ERROR] Falha ao gerar feedback {e}")
            return None
        
        