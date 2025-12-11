import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx";
import { createJob, getJobs } from "../../services/database_realtime.tsx";
import { Job } from "@/components/types/Types";
import { ref, remove } from "firebase/database";

const JobManager = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchJobs = async () => {
    const allJobs = await getJobs();
    setJobs(allJobs);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleCreateJob = async () => {
    if (!title || !description) return;
    setLoading(true);
    const skillsArray = skills.split(",").map((s) => s.trim()).filter(Boolean);
    await createJob({
      title,
      company: user?.name || "Empresa",
      description,
      skillsRequired: skillsArray,
    });
    setTitle("");
    setDescription("");
    setSkills("");
    setLoading(false);
    fetchJobs(); // atualiza lista
  };

  // Excluir todas as vagas
 const handleDeleteAllJobs = async () => {
  if (!confirm("Deseja realmente excluir todas as suas vagas?")) return;

  setJobs([]);
};

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 pt-24 pb-12 gradient-hero">
        <div className="container mx-auto px-4 space-y-6">
          {/* Form para criar nova vaga */}
          <Card>
            <CardHeader>
              <CardTitle>Criar Nova Vaga</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Título da Vaga</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex: Desenvolvedor Frontend"
                />
              </div>
              <div>
                <Label htmlFor="description">Descrição</Label>
                <Input
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Descreva a vaga"
                />
              </div>
              <div>
                <Label htmlFor="skills">Skills Requeridas (vírgula separadas)</Label>
                <Input
                  id="skills"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  placeholder="Ex: React, TypeScript"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleCreateJob} className="flex-1" disabled={loading}>
                  {loading ? "Criando..." : "Criar Vaga"}
                </Button>
                <Button
                  onClick={handleDeleteAllJobs}
                  variant="destructive"
                  className="flex-1"
                >
                  Excluir Todas
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Lista de vagas */}
          {jobs.map((job) => (
            <Card key={job.id}>
              <CardHeader>
                <CardTitle>{job.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-2">{job.description}</p>
                <div className="flex flex-wrap gap-2">
                  {job.skillsRequired.map((skill, idx) => (
                    <Badge key={idx} variant="outline">
                      {skill} <Star className="w-3 h-3 text-yellow-500 inline-block ml-1" />
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default JobManager;
