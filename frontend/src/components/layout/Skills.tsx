import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { SkillCategory } from '../../services/apiService.tsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { deleteAllAbilities, getAbilities, registerAbilities } from '../../services/database_realtime.tsx';
import { ref, onValue } from "firebase/database";

const Skills = () => {
  const { user } = useAuth();
  const [skills, setSkills] = useState<SkillCategory[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [newSkills, setNewSkills] = useState("");
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (!user) return;
    getAbilities(user.uid).then((res) => {
      setSkills(res);
    });
  }, [user]);
  
  const handleAddCategory = () => {
    if (!newCategory || !newSkills) return;
    const skillsArray = newSkills.split(",").map(s => s.trim()).filter(Boolean);
    const updatedSkills = [...skills, { category: newCategory, skills: skillsArray }];
    setSkills(updatedSkills);
    registerAbilities(user.uid, updatedSkills);
    setNewCategory("");
    setNewSkills("");
  };

  const handleDeleteSkills = () => {
    deleteAllAbilities(user.uid).finally(()=>{
      setSkills([])
    });
  };


  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 pt-24 pb-12 gradient-hero">
        <div className="container mx-auto px-4 space-y-6">
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
                <Button onClick={handleDeleteSkills}>Apagar tudo</Button>
              </CardFooter>
            </Card>
          )}

          {/* Mini Form para adicionar categoria */}
          <Card>
            <CardHeader>
              <CardTitle>Adicionar Categoria/Skills</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="category">Categoria</Label>
                <Input
                  id="category"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="Ex: Frontend, Soft Skills"
                />
              </div>
              <div>
                <Label htmlFor="skills">Skills (separadas por vírgula)</Label>
                <Input
                  id="skills"
                  value={newSkills}
                  onChange={(e) => setNewSkills(e.target.value)}
                  placeholder="Ex: React, TypeScript"
                />
              </div>
              <Button onClick={handleAddCategory} className="w-full">
                Adicionar
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Skills;
