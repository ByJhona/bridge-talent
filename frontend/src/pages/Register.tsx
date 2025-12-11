import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, GraduationCap, Mail, Lock, Eye, EyeOff, Linkedin, User, Phone, Briefcase } from "lucide-react";
import {registerCompany, registerUser} from '../services/authService.tsx'
import { useNavigate } from "react-router-dom";



const Register = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get("type") === "company" ? "company" : "candidate";
  const [showPassword, setShowPassword] = useState(false);
  
  const [candidateForm, setCandidateForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [companyForm, setCompanyForm] = useState({
    companyName: "",
    contactName: "",
    email: "",
    password: "",
  });

  const handleCandidateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await registerUser(candidateForm.name, candidateForm.email, candidateForm.password);
      console.log("Candidate registration successful:", candidateForm.email);
      
      navigate("/dashboard");
    } catch (error) {
      console.error("Erro ao registrar candidato:", error);
      alert("Erro no cadastro, tente novamente");
    }
  };

  const handleCompanySubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerCompany(companyForm.companyName, companyForm.contactName,companyForm.email, companyForm.password);
      console.log("Company registration successful:", companyForm.email);
      
      navigate("/company/dashboard");
    } catch (error) {
      console.error("Erro ao registrar empresa:", error);
      alert("Erro no cadastro, tente novamente");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-12 gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Crie sua conta</h1>
              <p className="text-muted-foreground">Comece sua jornada para o sucesso profissional</p>
            </div>

            <Card variant="elevated" className="animate-scale-in">
              <CardContent className="pt-6">
                <Tabs defaultValue={defaultTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="candidate" className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4" />
                      Candidato
                    </TabsTrigger>
                    <TabsTrigger value="company" className="flex items-center gap-2">
                      <Building2 className="w-4 h-4" />
                      Empresa
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="candidate">
                    <form onSubmit={handleCandidateSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nome Completo</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="name"
                            placeholder="Seu nome completo"
                            className="pl-10"
                            value={candidateForm.name}
                            required
                            onChange={(e) => setCandidateForm({...candidateForm, name: e.target.value})}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email-candidate">E-mail</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="email-candidate"
                            type="email"
                            placeholder="seu@email.com"
                            className="pl-10"
                            value={candidateForm.email}
                            required
                            onChange={(e) => setCandidateForm({...candidateForm, email: e.target.value})}
                          />
                        </div>
                      </div>

                      

                      <div className="space-y-2">
                        <Label htmlFor="password-candidate">Senha</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="password-candidate"
                            type={showPassword ? "text" : "password"}
                            placeholder="Mínimo 8 caracteres"
                            className="pl-10 pr-10"
                            value={candidateForm.password}
                            required
                            onChange={(e) => setCandidateForm({...candidateForm, password: e.target.value})}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>


                      <label className="flex items-start gap-2 text-sm text-muted-foreground">
                        <input type="checkbox" className="rounded border-border mt-0.5" required />
                        <span>
                          Concordo com os{" "}
                          <Link to="/terms" className="text-primary hover:underline">Termos de Uso</Link>
                          {" "}e{" "}
                          <Link to="/privacy" className="text-primary hover:underline">Política de Privacidade</Link>
                        </span>
                      </label>

                      <Button type="submit" variant="hero" className="w-full">
                        Criar Conta
                      </Button>

                      <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-border"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                        </div>
                      </div>
                    </form>
                  </TabsContent>

                  <TabsContent value="company">
                    <form onSubmit={handleCompanySubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="company-name">Nome da Empresa</Label>
                        <div className="relative">
                          <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="company-name"
                            placeholder="Nome da empresa"
                            className="pl-10"
                            value={companyForm.companyName}
                            onChange={(e) => setCompanyForm({...companyForm, companyName: e.target.value})}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="contact-name">Nome do Responsável</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="contact-name"
                            placeholder="Nome do contato"
                            className="pl-10"
                            value={companyForm.contactName}
                            onChange={(e) => setCompanyForm({...companyForm, contactName: e.target.value})}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email-company">E-mail Corporativo</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="email-company"
                            type="email"
                            placeholder="contato@empresa.com"
                            className="pl-10"
                            value={companyForm.email}
                            onChange={(e) => setCompanyForm({...companyForm, email: e.target.value})}
                          />
                        </div>
                      </div>

                      

                      <div className="space-y-2">
                        <Label htmlFor="password-company">Senha</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="password-company"
                            type={showPassword ? "text" : "password"}
                            placeholder="Mínimo 8 caracteres"
                            className="pl-10 pr-10"
                            value={companyForm.password}
                            onChange={(e) => setCompanyForm({...companyForm, password: e.target.value})}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      

                      <label className="flex items-start gap-2 text-sm text-muted-foreground">
                        <input type="checkbox" className="rounded border-border mt-0.5" />
                        <span>
                          Concordo com os{" "}
                          <Link to="/terms" className="text-primary hover:underline">Termos de Uso</Link>
                          {" "}e{" "}
                          <Link to="/privacy" className="text-primary hover:underline">Política de Privacidade</Link>
                        </span>
                      </label>

                      <Button type="submit" variant="accent" className="w-full">
                        Cadastrar Empresa
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>

                <p className="text-center text-sm text-muted-foreground mt-6">
                  Já tem uma conta?{" "}
                  <Link to="/login" className="text-primary font-medium hover:underline">
                    Faça login
                  </Link>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Register;
