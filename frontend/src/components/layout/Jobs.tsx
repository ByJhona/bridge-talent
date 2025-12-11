import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, FileText } from "lucide-react";
import { useAuth } from '../../context/AuthContext.jsx';
import { getJobs, applyToJob, getUserApplications, cancelApplication } from '../../services/database_realtime.tsx';
import { Job } from "../types/Types.tsx";



const JobsDashboard = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [userApplications, setUserApplications] = useState<string[]>([]);
  const [expandedJobId, setExpandedJobId] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    getJobs().then((res) => setJobs(res));
    getUserApplications(user.uid).then((res) => setUserApplications(res)); // array de jobIds
  }, [user]);

  const handleApply = (jobId: string) => {
    if (!user) return;
    applyToJob(user.uid, jobId).then(() => {
      setUserApplications((prev) => [...prev, jobId]);
    });
  };

  const handleCancel = (jobId: string) => {
    if (!user) return;
    cancelApplication(user.uid, jobId).then(() => {
      setUserApplications((prev) => prev.filter((id) => id !== jobId));
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 pt-24 pb-12 gradient-hero">
        <div className="container mx-auto px-4 space-y-6">

          {jobs.length === 0 && (
            <p className="text-center text-muted-foreground">Nenhuma vaga disponível no momento.</p>
          )}

          {jobs.map((job) => {
            const isExpanded = expandedJobId === job.id;
            const isApplied = userApplications.includes(job.id);

            return (
              <Card key={job.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5" /> {job.title} - {job.company}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex flex-wrap gap-2">
                    {job.skillsRequired.map((skill, idx) => (
                      <Badge key={idx} variant="outline">{skill}</Badge>
                    ))}
                  </div>
                  {isExpanded && (
                    <div className="mt-2 p-2 border rounded bg-muted">
                      <h5 className="font-semibold mb-1 flex items-center gap-2">
                        <FileText className="w-4 h-4" /> Descrição
                      </h5>
                      <p className="text-sm">{job.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">Publicado em: {job.createdAt}</p>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button size="sm" variant="ghost" onClick={() => setExpandedJobId(isExpanded ? null : job.id)}>
                    {isExpanded ? "Esconder detalhes" : "Ver detalhes"}
                  </Button>
                  {isApplied ? (
                    <Button size="sm" variant="destructive" onClick={() => handleCancel(job.id)}>
                      Cancelar inscrição
                    </Button>
                  ) : (
                    <Button size="sm" onClick={() => handleApply(job.id)}>Inscrever-se</Button>
                  )}
                </CardFooter>
              </Card>
            );
          })}

        </div>
      </main>
    </div>
  );
};

export default JobsDashboard;
