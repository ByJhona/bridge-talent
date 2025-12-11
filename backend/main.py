from fastapi import FastAPI
from app.routers import resume_router, interview_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Api Bridge Talent")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],  
)

app.include_router(resume_router.router, prefix="/resume", tags=["Resume"])
app.include_router(interview_router.router, prefix="/interview", tags=["Resume"])


@app.get("/")
def root():
    return {"message": "API rodando!"}
