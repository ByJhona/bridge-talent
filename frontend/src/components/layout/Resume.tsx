import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Brain, Briefcase, Star, Target } from "lucide-react";
import {api, SkillCategory} from '../../services/apiService'
import {useAuth} from '../../context/AuthContext.jsx'
import {registerAbilities, registerFeedback} from '../../services/database_realtime.tsx'

const Resume = () => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [feedback, setFeedback] = useState("");
  const [skills, setSkills] = useState<SkillCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPdfFile(e.target.files[0]);
      setFeedback("");
      setSkills([]);
    }
  };

  const handleSaveSkills = () => {
      registerAbilities(user.uid, skills)
      registerFeedback(user.uid, feedback)

    }


    const handleFeedback = async () => {
    if (!pdfFile) {
      alert("Selecione um PDF primeiro!");
      return;
    }



    setLoading(true);

    try {
      const res = await api.analyzeResume(pdfFile);

      if (res.error) {
        alert(`Erro: ${res.error}`);
        return;
      }

      setSkills(res.data.abilities);
      setFeedback(res.data.feedback);

    } catch (error) {
      console.error("Erro ao gerar feedback:", error);
      alert("Erro ao gerar feedback, tente novamente.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 pt-24 pb-12 gradient-hero">
        <div className="container mx-auto px-4 space-y-6">
          {/* Upload PDF */}
          <Card className="animate-scale-in">
            <CardHeader>
              <CardTitle>Enviar currículo para análise</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pdf-upload">Selecione um arquivo PDF</Label>
                <Input
                  id="pdf-upload"
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                />
              </div>
              <Button onClick={handleFeedback} disabled={loading || !pdfFile} className="w-full">
                {loading ? "Gerando feedback..." : "Gerar Feedback"}
              </Button>
              {feedback && (
                <div className="mt-4 p-4 bg-muted rounded space-y-2">
                  <h3 className="font-semibold">Feedback Detalhado</h3>
                  <p className="text-sm whitespace-pre-line">{feedback}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Skills Categorizadas */}
          {skills?.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Skills Identificadas</CardTitle>
              </CardHeader>
              <CardContent className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {skills.map((category, idx) => (
                  <Card key={idx} variant="flat" className="p-4">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      {category.category} <Star className="w-4 h-4 text-yellow-500" />
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, i) => (
                        <Badge key={i} variant="outline">{skill}</Badge>
                      ))}
                    </div>
                  </Card>
                ))}
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveSkills}>Salvar</Button>
            </CardFooter>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default Resume;
