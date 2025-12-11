import { useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, GraduationCap, Mail, Lock, Eye, EyeOff, Linkedin } from "lucide-react";
import {loginUser} from '../services/authService.tsx'
const Login = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const defaultTab = searchParams.get("type") === "company" ? "company" : "candidate";
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
          await loginUser(email, password);
          console.log("Candidate login successful:", email);
          
          navigate("/dashboard");
        } catch (error) {
          console.error("Erro ao entrar no dashboard do candidato:", error);
          alert("Erro no login, tente novamente");
        }
  };

    const handleSubmitCompany = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
          await loginUser(email, password);
          console.log("Company login successful:", email);
          
          navigate("/company/dashboard");
        } catch (error) {
          console.error("Erro ao entrar no dashboard da empresa:", error);
          alert("Erro no login, tente novamente");
        }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-12 gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Bem-vindo de volta</h1>
              <p className="text-muted-foreground">Faça login para continuar sua jornada</p>
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
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email-candidate">E-mail</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="email-candidate"
                            type="email"
                            placeholder="seu@email.com"
                            className="pl-10"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            placeholder="••••••••"
                            className="pl-10 pr-10"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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

                      <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 text-sm text-muted-foreground">
                          <input type="checkbox" className="rounded border-border" />
                          Lembrar-me
                        </label>
                        <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                          Esqueci minha senha
                        </Link>
                      </div>

                      <Button type="submit" variant="hero" className="w-full">
                        Entrar
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
                    <form onSubmit={handleSubmitCompany} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email-company">E-mail Corporativo</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="email-company"
                            type="email"
                            placeholder="contato@empresa.com"
                            className="pl-10"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            placeholder="••••••••"
                            className="pl-10 pr-10"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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

                      <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 text-sm text-muted-foreground">
                          <input type="checkbox" className="rounded border-border" />
                          Lembrar-me
                        </label>
                        <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                          Esqueci minha senha
                        </Link>
                      </div>

                      <Button type="submit" variant="accent" className="w-full">
                        Entrar
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>

                <p className="text-center text-sm text-muted-foreground mt-6">
                  Não tem uma conta?{" "}
                  <Link to="/register" className="text-primary font-medium hover:underline">
                    Cadastre-se
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

export default Login;
