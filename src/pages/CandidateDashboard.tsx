import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart3, 
  BookOpen, 
  Brain, 
  Briefcase, 
  Calendar, 
  ChevronRight, 
  FileText, 
  GraduationCap, 
  MessageSquare, 
  Settings, 
  Star, 
  Target, 
  TrendingUp, 
  User,
  Bell,
  LogOut,
  Home
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const CandidateDashboard = () => {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-card border-r border-border">
        <div className="p-6 border-b border-border">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 gradient-primary rounded-lg flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">TalentBridge</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/10 text-primary font-medium">
            <Home className="w-5 h-5" />
            Dashboard
          </Link>
          <Link to="/profile" className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
            <User className="w-5 h-5" />
            Meu Perfil
          </Link>
          <Link to="/jobs" className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
            <Briefcase className="w-5 h-5" />
            Vagas
          </Link>
          <Link to="/training" className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
            <Brain className="w-5 h-5" />
            Treinamento AI
          </Link>
          <Link to="/resume" className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
            <FileText className="w-5 h-5" />
            Currículo
          </Link>
          <Link to="/messages" className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
            <MessageSquare className="w-5 h-5" />
            Mensagens
            <Badge variant="accent" className="ml-auto">3</Badge>
          </Link>
        </nav>

        <div className="p-4 border-t border-border space-y-2">
          <Link to="/settings" className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
            <Settings className="w-5 h-5" />
            Configurações
          </Link>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors">
            <LogOut className="w-5 h-5" />
            Sair
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border">
          <div className="flex items-center justify-between px-6 h-16">
            <h1 className="text-xl font-semibold text-foreground">Dashboard</h1>
            <div className="flex items-center gap-4">
              <button className="relative p-2 rounded-lg hover:bg-secondary transition-colors">
                <Bell className="w-5 h-5 text-muted-foreground" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full"></span>
              </button>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-primary text-primary-foreground">JS</AvatarFallback>
                </Avatar>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-foreground">João Silva</p>
                  <p className="text-xs text-muted-foreground">Candidato</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6 space-y-6">
          {/* Welcome Section */}
          <div className="gradient-primary rounded-2xl p-6 text-primary-foreground">
            <h2 className="text-2xl font-bold mb-2">Olá, João! 👋</h2>
            <p className="text-primary-foreground/80 mb-4">
              Seu perfil está 75% completo. Complete para aumentar suas chances!
            </p>
            <div className="flex items-center gap-4">
              <Progress value={75} className="flex-1 bg-white/20 h-2" />
              <span className="text-sm font-medium">75%</span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card variant="flat">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-primary" />
                  </div>
                  <Badge variant="success">+12%</Badge>
                </div>
                <p className="text-2xl font-bold text-foreground">24</p>
                <p className="text-sm text-muted-foreground">Candidaturas</p>
              </CardContent>
            </Card>

            <Card variant="flat">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                    <Target className="w-5 h-5 text-success" />
                  </div>
                  <Badge variant="success">+5%</Badge>
                </div>
                <p className="text-2xl font-bold text-foreground">8</p>
                <p className="text-sm text-muted-foreground">Entrevistas Marcadas</p>
              </CardContent>
            </Card>

            <Card variant="flat">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                    <Brain className="w-5 h-5 text-warning" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-foreground">12</p>
                <p className="text-sm text-muted-foreground">Simulações Realizadas</p>
              </CardContent>
            </Card>

            <Card variant="flat">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Star className="w-5 h-5 text-accent" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-foreground">85%</p>
                <p className="text-sm text-muted-foreground">Score Médio</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Grid */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Recent Applications */}
            <Card variant="default" className="lg:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Candidaturas Recentes</CardTitle>
                  <CardDescription>Acompanhe o status das suas candidaturas</CardDescription>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/applications">
                    Ver todas
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { company: "TechCorp", role: "Desenvolvedor Frontend", status: "Em análise", statusColor: "warning" },
                  { company: "Inovação SA", role: "Estágio em UX Design", status: "Entrevista", statusColor: "success" },
                  { company: "StartupXYZ", role: "Desenvolvedor Full Stack", status: "Enviada", statusColor: "muted" },
                ].map((app, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Briefcase className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{app.role}</p>
                        <p className="text-sm text-muted-foreground">{app.company}</p>
                      </div>
                    </div>
                    <Badge variant={app.statusColor as any}>{app.status}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card variant="default">
              <CardHeader>
                <CardTitle>Ações Rápidas</CardTitle>
                <CardDescription>Continue seu desenvolvimento</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start gap-3" asChild>
                  <Link to="/training">
                    <Brain className="w-5 h-5 text-primary" />
                    Simular Entrevista
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3" asChild>
                  <Link to="/resume">
                    <FileText className="w-5 h-5 text-accent" />
                    Atualizar Currículo
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3" asChild>
                  <Link to="/jobs">
                    <Target className="w-5 h-5 text-success" />
                    Buscar Vagas
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3" asChild>
                  <Link to="/profile">
                    <User className="w-5 h-5 text-warning" />
                    Completar Perfil
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Suggestions */}
          <Card variant="default">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Sugestões de Desenvolvimento
              </CardTitle>
              <CardDescription>Baseado no seu perfil e nas vagas de interesse</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-secondary/50 space-y-2">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">Curso Recomendado</span>
                  </div>
                  <p className="text-sm text-muted-foreground">React Avançado - Aprimore suas habilidades em frontend</p>
                  <Button variant="ghost" size="sm" className="p-0 h-auto text-primary">
                    Ver curso <ChevronRight className="w-3 h-3 ml-1" />
                  </Button>
                </div>

                <div className="p-4 rounded-lg bg-secondary/50 space-y-2">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-success" />
                    <span className="text-sm font-medium text-foreground">Habilidade em Alta</span>
                  </div>
                  <p className="text-sm text-muted-foreground">TypeScript - Muito requisitado nas vagas do seu interesse</p>
                  <Button variant="ghost" size="sm" className="p-0 h-auto text-primary">
                    Aprender <ChevronRight className="w-3 h-3 ml-1" />
                  </Button>
                </div>

                <div className="p-4 rounded-lg bg-secondary/50 space-y-2">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-accent" />
                    <span className="text-sm font-medium text-foreground">Melhoria no CV</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Adicione suas certificações para destacar seu perfil</p>
                  <Button variant="ghost" size="sm" className="p-0 h-auto text-primary">
                    Atualizar <ChevronRight className="w-3 h-3 ml-1" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default CandidateDashboard;
