import os
from typing import List, Optional
from pydantic import BaseModel
from app.schema.final_feedback_response import FinalFeedbackResponse
from app.schema.generate_questions_response import GenerateQuestionsResponse
from app.schema.resume_feedback_schema import ResumeFeedback
from dotenv import load_dotenv
from app.core.config import openai_client

load_dotenv()

OPENAI_MODEL = os.getenv("OPENAI_MODEL", "gpt-5-nano")
class InterviewService(BaseModel):
    """
    Classe para extrair tipo de documento e campos importantes de um texto usando GPT-5.
    """
    @staticmethod
    def generate_questions(topic: str) -> Optional[GenerateQuestionsResponse]:
        system_prompt = """
        Você é um gerador de perguntas para entrevistas simuladas.
        Gere exatamente 5 perguntas objetivas, desafiadoras e específicas
        sobre o tema informado pelo usuário.

        Regras:
        - Responda SOMENTE com um JSON válido.
        - Formato obrigatório:
        {
            "questions": [
                "Pergunta 1",
                "Pergunta 2",
                "Pergunta 3",
                "Pergunta 4",
                "Pergunta 5"
            ]
        }
        - NÃO adicione explicações, comentários ou texto fora do JSON.
        """

        try:
            completion = openai_client.responses.parse(
                model=OPENAI_MODEL,
                input=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": f"Tema: {topic}"}
                ],
                text_format=GenerateQuestionsResponse,
            )
            return completion.output_parsed

        except Exception as e:
            print(f"[ERROR] Falha ao gerar perguntas: {e}")
            return "Erro ao gerar perguntas"
        
        
    @staticmethod
    def evaluate_interview(
        topic: str,
        questions: List[str],
        answers: List[str]
    ) -> Optional[FinalFeedbackResponse]:

        formatted_text = "\n\n".join(
            f"Pergunta: {q}\nResposta: {a}"
            for q, a in zip(questions, answers)
        )

        system_prompt = """
        Você é um avaliador especialista em entrevistas técnicas.
        Sua tarefa é ler todas as perguntas e respostas do candidato e
        gerar um feedback final único, objetivo, profissional e construtivo.           
        Estruture bem para exibição, pode colocar quebra de linha para manter o texto organizado.


        Regras:
        - Devolva SOMENTE JSON válido.
        - Estrutura obrigatória:
        {
            "feedback": "texto do feedback final"
        }
        - O feedback deve incluir:
            * análise geral das respostas
            * pontos fortes
            * pontos de melhoria
            * sugestão do que estudar
        - Não inclua texto fora do JSON.
        """

        try:
            completion = openai_client.responses.parse(
                model=OPENAI_MODEL,
                input=[
                    {"role": "system", "content": system_prompt},
                    {
                        "role": "user",
                        "content": (
                            f"Tema da entrevista: {topic}\n\n"
                            f"Avalie:\n\n{formatted_text}"
                        )
                    }
                ],
                text_format=FinalFeedbackResponse,
            )

            return completion.output_parsed


        except Exception as e:
            print(f"[ERROR] Falha ao gerar feedback: {e}")
            return "Erro ao gerar feedback."
