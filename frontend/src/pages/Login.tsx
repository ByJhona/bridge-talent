import { useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, GraduationCap, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { loginUser } from "../services/authService.tsx";

const Login = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const defaultTab =
    searchParams.get("type") === "company" ? "company" : "candidate";

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // ADICIONADO

  const handleLogin = async (path: string) => {
    setLoading(true); // inicia loading
    try {
      await loginUser(email, password);
      navigate(path);
    } catch (error) {
      console.error("Erro ao autenticar:", error);
      alert("Erro no login, tente novamente");
    } finally {
      setLoading(false); // finaliza loading
    }
  };

  const handleSubmitCandidate = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin("/dashboard");
  };

  const handleSubmitCompany = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin("/company/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-12 gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Bem-vindo de volta
              </h1>
              <p className="text-muted-foreground">
                Faça login para continuar sua jornada
              </p>
            </div>

            <Card variant="elevated" className="animate-scale-in">
              <CardContent className="pt-6">
                <Tabs defaultValue={defaultTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="candidate">
                      <GraduationCap className="w-4 h-4 mr-2" />
                      Candidato
                    </TabsTrigger>

                    <TabsTrigger value="company">
                      <Building2 className="w-4 h-4 mr-2" />
                      Empresa
                    </TabsTrigger>
                  </TabsList>

                  {/* CANDIDATO */}
                  <TabsContent value="candidate">
                    <form onSubmit={handleSubmitCandidate} className="space-y-4">
                      {/* Email */}
                      <div className="space-y-2">
                        <Label>E-mail</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            type="email"
                            placeholder="seu@email.com"
                            className="pl-10"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>

                      {/* Senha */}
                      <div className="space-y-2">
                        <Label>Senha</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Insira sua senha"
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

                      <Button
                        type="submit"
                        variant="hero"
                        className="w-full"
                        disabled={loading}
                      >
                        {loading ? "Autenticando..." : "Entrar"}
                      </Button>
                    </form>
                  </TabsContent>

                  {/* EMPRESA */}
                  <TabsContent value="company">
                    <form onSubmit={handleSubmitCompany} className="space-y-4">
                      {/* Email */}
                      <div className="space-y-2">
                        <Label>E-mail Corporativo</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            type="email"
                            placeholder="contato@empresa.com"
                            className="pl-10"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>

                      {/* Senha */}
                      <div className="space-y-2">
                        <Label>Senha</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Insira sua senha"
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

                      <Button
                        type="submit"
                        variant="accent"
                        className="w-full"
                        disabled={loading}
                      >
                        {loading ? "Autenticando..." : "Entrar"}
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
