import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "../../context/AuthContext.jsx";

// Tipagens da Web Speech API
declare global {
  interface SpeechRecognition extends EventTarget {
    lang: string;
    continuous: boolean;
    interimResults: boolean;
    start(): void;
    stop(): void;
    onresult: ((event: SpeechRecognitionEvent) => void) | null;
    onerror: ((event: unknown) => void) | null;
  }

  interface SpeechRecognitionEvent {
    results: {
      0: {
        0: {
          transcript: string;
        };
      };
    };
  }

  interface Window {
    SpeechRecognition?: new () => SpeechRecognition;
    webkitSpeechRecognition?: new () => SpeechRecognition;
  }
}

interface GeneratedQuestionsResponse {
  questions: string[];
}

interface FinalFeedbackResponse {
  feedback: string;
}

const InterviewTrainer = () => {
  const { user } = useAuth();

  const [topic, setTopic] = useState("");
  const [questions, setQuestions] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [recording, setRecording] = useState(false);
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentTranscript, setCurrentTranscript] = useState("");
  const [finalFeedback, setFinalFeedback] = useState("");

  // Estado visual
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [loadingEvaluation, setLoadingEvaluation] = useState(false);

  // -----------------------------
  // Função: gerar perguntas
  // -----------------------------
  const handleGenerateQuestions = async () => {
    if (!topic.trim()) return;

    setLoadingQuestions(true);

    const res = await fetch("https://bridge-talent.onrender.com/interview/generate-questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic }),
    });

    const data: GeneratedQuestionsResponse = await res.json();

    setQuestions(data.questions);
    setCurrentStep(0);
    setAnswers([]);
    setFinalFeedback("");

    setLoadingQuestions(false);
  };

  // -----------------------------
  // Gravação e transcrição
  // -----------------------------
  const startRecording = () => {
    if (!window.webkitSpeechRecognition) {
      alert("Seu navegador não suporta Web Speech API");
      return;
    }

    const recognition: SpeechRecognition = new window.webkitSpeechRecognition();
    recognition.lang = "pt-BR";
    recognition.continuous = false;
    recognition.interimResults = false;

    setRecording(true);
    recognition.start();

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const text = event.results[0][0].transcript;
      setCurrentTranscript(text);
      setRecording(false);
    };

    recognition.onerror = () => {
      setRecording(false);
    };
  };

  // -----------------------------
  // Salvar resposta do step atual
  // -----------------------------
  const handleSaveAnswer = () => {
    if (!currentTranscript.trim()) return;

    const updated = [...answers];
    updated[currentStep] = currentTranscript;
    setAnswers(updated);
    setCurrentTranscript("");

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  // -----------------------------
  // Enviar tudo para a API
  // -----------------------------
  const handleFinish = async () => {
    setLoadingEvaluation(true);

    const res = await fetch("https://bridge-talent.onrender.com/interview/evaluate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user?.uid || "",
        topic,
        questions,
        answers,
      }),
    });

    const data: FinalFeedbackResponse = await res.json();
    setFinalFeedback(data.feedback);

    setLoadingEvaluation(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 pt-24 pb-12 gradient-hero">
        <div className="container mx-auto px-4 space-y-6 max-w-2xl">

          {/* FEEDBACK VISUAL GLOBAL */}
          {(loadingQuestions || loadingEvaluation) && (
            <div className="p-3 text-center bg-blue-100 border border-blue-400 rounded-md text-sm">
              {loadingQuestions && "Gerando perguntas..."}
              {loadingEvaluation && "Avaliando suas respostas..."}
            </div>
          )}

          {/* Entrada do tema */}
          <Card>
            <CardHeader>
              <CardTitle>Treinador de Entrevistas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Label>Tema da entrevista</Label>
              <Input
                placeholder="Ex: vaga de desenvolvedor backend"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />

              <Button
                className="w-full"
                onClick={handleGenerateQuestions}
                disabled={!topic.trim() || loadingQuestions}
              >
                {loadingQuestions ? "Gerando..." : "Gerar perguntas"}
              </Button>
            </CardContent>
          </Card>

          {/* Perguntas */}
          {questions && questions?.length > 0 && (

            <Card>
              <CardHeader>
                <CardTitle>
                  Pergunta {currentStep + 1} de {questions.length}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="font-medium">{questions[currentStep]}</p>

                <Button onClick={startRecording} disabled={recording}>
                  {recording ? "Gravando..." : "Responder por voz"}
                </Button>

                {currentTranscript && (
                  <div className="mt-3 p-3 border rounded-md bg-muted">
                    <p className="text-sm">{currentTranscript}</p>
                  </div>
                )}
              </CardContent>

              <CardFooter className="flex justify-between">
                <Button
                  onClick={handleSaveAnswer}
                  disabled={!currentTranscript.trim()}
                >
                  {currentStep === questions.length - 1
                    ? "Finalizar"
                    : "Próxima pergunta"}
                </Button>
              </CardFooter>
            </Card>
          )}

          {/* Finalização */}
          {answers.length === questions.length && answers.length > 0 && (
            <Button
              className="w-full"
              onClick={handleFinish}
              disabled={loadingEvaluation}
            >
              {loadingEvaluation ? "Enviando..." : "Enviar para análise"}
            </Button>
          )}

          {/* Feedback final */}
          {finalFeedback && (
            <Card>
              <CardHeader>
                <CardTitle>Seu Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{finalFeedback}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default InterviewTrainer;
