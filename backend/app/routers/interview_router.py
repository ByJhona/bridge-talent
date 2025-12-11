from fastapi import APIRouter, UploadFile, File, HTTPException, Form
from app.schema.evaluate_interview_request import EvaluateInterviewRequest
from app.schema.final_feedback_response import FinalFeedbackResponse
from app.schema.generate_questions_request import GenerateQuestionsRequest
from app.schema.generate_questions_response import GenerateQuestionsResponse
from app.schema.resume_feedback_schema import ResumeFeedback
from app.services.extract_text_pdf import extract_text_from_pdf
from app.services.interview_service import InterviewService
from app.services.resume_service import ResumeService

router = APIRouter()

@router.post("/generate-questions", response_model=GenerateQuestionsResponse)
async def generate_questions(payload: GenerateQuestionsRequest):
    topic = payload.topic.strip()

    result = InterviewService.generate_questions(topic)


    return GenerateQuestionsResponse(questions=result.questions)


@router.post("/evaluate", response_model=FinalFeedbackResponse)
async def evaluate_interview(payload: EvaluateInterviewRequest):
    print(payload)
    feedback = InterviewService.evaluate_interview(
        payload.topic,
        payload.questions,
        payload.answers
    )

    return feedback