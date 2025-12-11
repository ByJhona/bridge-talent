import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Briefcase, FileText } from "lucide-react";
import { SkillCategory } from '../../services/apiService.tsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { getAbilities, getApplications, getFeedback } from '../../services/database_realtime.tsx';
import { JobApplication } from "../types/Types.tsx";



const Dashboard = () => {
  const { user } = useAuth();
  const [skills, setSkills] = useState<SkillCategory[]>([]);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [feedback, setFeedback] = useState<string>("");

  useEffect(() => {
    if (!user) return;
    getAbilities(user.uid).then((res) => setSkills(res));
    
    getApplications(user.uid).then((res) => {setApplications(res)})

    getFeedback(user.uid).then((res) =>{
        setFeedback(res);
    })
  }, [user]);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 pt-24 pb-12 gradient-hero">
        <div className="container mx-auto px-4 space-y-6">

          {/* Skills Identificadas */}
          {skills.length > 0 && (
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
            </Card>
          )}

          {/* Minhas Inscrições */}
          <Card>
            <CardHeader>
              <CardTitle>Minhas Inscrições</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {applications.map((app) => (
                <Card key={app.id} variant="flat" className="p-4 flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold flex items-center gap-2">
                      <Briefcase className="w-4 h-4" /> {app.title} - {app.company}
                    </h4>
                    <div>Status: <Badge variant="outline">{app.status}</Badge> | Inscrito em: {app.appliedAt}</div>
                  </div>
                  <Button size="sm" variant="ghost">Cancelar</Button>
                </Card>
              ))}
            </CardContent>
          </Card>

          {/* Último Feedback */}
          {feedback && (
            <Card>
              <CardHeader>
                <CardTitle>Último Feedback do Currículo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p>{feedback}</p>
              </CardContent>
            </Card>
          )}

        </div>
      </main>
    </div>
  );
};

export default Dashboard;
