import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { useAuth } from '../../context/AuthContext.jsx';
import { getJobs, getCandidatesAppliedToJob } from '../../services/database_realtime.tsx';

interface Job {
  id: string;
  title: string;
  company: string;
  description: string;
  skillsRequired: string[];
  createdAt: string;
}

interface Candidate {
  uid: string;
  name: string;
  abilities: { category: string; skills: string[] }[];
}

interface CandidateMatch {
  candidate: Candidate;
  matchedSkills: string[];
  matchPercentage: number;
}

const Analize = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [matches, setMatches] = useState<Record<string, CandidateMatch[]>>({}); // jobId -> matches

  useEffect(() => {
    // Buscar vagas
    getJobs().then(async (jobsList) => {
      setJobs(jobsList);

      // Para cada vaga, buscar candidatos inscritos
      const newMatches: Record<string, CandidateMatch[]> = {};
      for (const job of jobsList) {
        const candidates = await getCandidatesAppliedToJob(job.id);

        const jobMatches = candidates.map(candidate => {
          const candidateSkills = candidate.abilities.flatMap(a => a.skills);
          const matchedSkills = candidateSkills.filter(s => job.skillsRequired.includes(s));
          const matchPercentage = Math.round((matchedSkills.length / job.skillsRequired.length) * 100);
          return { candidate, matchedSkills, matchPercentage };
        })
        .filter(m => m.matchPercentage > 0)
        .sort((a, b) => b.matchPercentage - a.matchPercentage);

        newMatches[job.id] = jobMatches;
      }
      setMatches(newMatches);
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 pt-24 pb-12 gradient-hero">
        <div className="container mx-auto px-4 space-y-6">
          {jobs.map((job) => (
            <Card key={job.id}>
              <CardHeader>
                <CardTitle>{job.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>{job.description}</p>
                <div className="flex flex-wrap gap-2">
                  {job.skillsRequired.map((skill, i) => (
                    <Badge key={i} variant="outline">{skill}</Badge>
                  ))}
                </div>

                <h4 className="font-semibold mt-4">Candidatos inscritos</h4>
                {matches[job.id]?.length ? (
                  <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
                    {matches[job.id].map((m, idx) => (
                      <Card key={idx} variant="flat" className="p-4">
                        <h5 className="font-semibold">{m.candidate.name}</h5>
                        <p>Compatibilidade: {m.matchPercentage}%</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {m.matchedSkills.map((skill, i) => (
                            <Badge key={i} variant="secondary">{skill}</Badge>
                          ))}
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground mt-2">Nenhum candidato compatível encontrado</p>
                )}
              </CardContent>
              <CardFooter>
                <Button variant="destructive">Excluir vaga</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Analize;
