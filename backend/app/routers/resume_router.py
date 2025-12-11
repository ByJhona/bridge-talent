from fastapi import APIRouter, UploadFile, File, HTTPException, Form
from app.schema.generate_questions_response import GenerateQuestionsResponse
from app.schema.resume_feedback_schema import ResumeFeedback
from app.services.extract_text_pdf import extract_text_from_pdf
from app.services.resume_service import ResumeService

router = APIRouter()

@router.post("/analyze", response_model=ResumeFeedback)
async def analyze_resume(file: UploadFile = File(...)) -> ResumeFeedback:
    """
    Recebe um PDF, processa e retorna skills categorizadas e feedback.
    """

    # Lê os bytes do arquivo enviado
    file_bytes = await file.read()

    # Extrai texto do PDF
    text = extract_text_from_pdf(file_bytes)
    if not text:
        raise HTTPException(status_code=400, detail="Não foi possível extrair texto do PDF")

    # Gera feedback usando o ResumeService
    feedback = ResumeService.extract_feedback(text)
    if feedback is None:
        raise HTTPException(status_code=500, detail="Falha ao gerar feedback do currículo")

    return feedback
