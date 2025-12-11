import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  Bell,
  Briefcase, 
  Building2, 
  ChevronRight, 
  Eye, 
  Home,
  LogOut,
  MessageSquare, 
  Plus, 
  Settings, 
  Star, 
  Target, 
  TrendingUp, 
  Users,
  FileText,
  Calendar
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const CompanyDashboard = () => {
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
          <Link to="/company/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/10 text-primary font-medium">
            <Home className="w-5 h-5" />
            Dashboard
          </Link>
          <Link to="/company/jobs" className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
            <Briefcase className="w-5 h-5" />
            Vagas
            <Badge variant="secondary" className="ml-auto">5</Badge>
          </Link>
          <Link to="/company/candidates" className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
            <Users className="w-5 h-5" />
            Candidatos
          </Link>
          <Link to="/company/analytics" className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
            <BarChart3 className="w-5 h-5" />
            Análises
          </Link>
          <Link to="/company/messages" className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
            <MessageSquare className="w-5 h-5" />
            Mensagens
            <Badge variant="accent" className="ml-auto">8</Badge>
          </Link>
        </nav>

        <div className="p-4 border-t border-border space-y-2">
          <Link to="/company/settings" className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
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
            <h1 className="text-xl font-semibold text-foreground">Dashboard Empresa</h1>
            <div className="flex items-center gap-4">
              <Button variant="hero" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Nova Vaga
              </Button>
              <button className="relative p-2 rounded-lg hover:bg-secondary transition-colors">
                <Bell className="w-5 h-5 text-muted-foreground" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full"></span>
              </button>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-accent text-accent-foreground">TC</AvatarFallback>
                </Avatar>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-foreground">TechCorp</p>
                  <p className="text-xs text-muted-foreground">Empresa</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6 space-y-6">
          {/* Welcome Section */}
          <div className="gradient-accent rounded-2xl p-6 text-accent-foreground">
            <h2 className="text-2xl font-bold mb-2">Bem-vinda, TechCorp! 🚀</h2>
            <p className="text-accent-foreground/80">
              Você tem 12 novos candidatos e 3 entrevistas agendadas para hoje.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card variant="flat">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-primary" />
                  </div>
                  <Badge variant="success">Ativas</Badge>
                </div>
                <p className="text-2xl font-bold text-foreground">5</p>
                <p className="text-sm text-muted-foreground">Vagas Publicadas</p>
              </CardContent>
            </Card>

            <Card variant="flat">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-success" />
                  </div>
                  <Badge variant="success">+23%</Badge>
                </div>
                <p className="text-2xl font-bold text-foreground">156</p>
                <p className="text-sm text-muted-foreground">Total de Candidatos</p>
              </CardContent>
            </Card>

            <Card variant="flat">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-warning" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-foreground">8</p>
                <p className="text-sm text-muted-foreground">Entrevistas Agendadas</p>
              </CardContent>
            </Card>

            <Card variant="flat">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Star className="w-5 h-5 text-accent" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-foreground">92%</p>
                <p className="text-sm text-muted-foreground">Taxa de Satisfação</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Grid */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Active Jobs */}
            <Card variant="default" className="lg:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Vagas Ativas</CardTitle>
                  <CardDescription>Gerencie suas vagas publicadas</CardDescription>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/company/jobs">
                    Ver todas
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { role: "Desenvolvedor Frontend", candidates: 45, score: 85, type: "Estágio" },
                  { role: "UX Designer Senior", candidates: 32, score: 78, type: "CLT" },
                  { role: "DevOps Engineer", candidates: 28, score: 92, type: "CLT" },
                ].map((job, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Briefcase className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{job.role}</p>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {job.candidates} candidatos
                          </span>
                          <Badge variant="secondary">{job.type}</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="text-sm font-medium text-foreground">Score médio</p>
                        <p className="text-lg font-bold text-primary">{job.score}%</p>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Top Candidates */}
            <Card variant="default">
              <CardHeader>
                <CardTitle>Top Candidatos</CardTitle>
                <CardDescription>Maior compatibilidade com suas vagas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: "Maria Santos", role: "Dev Frontend", score: 95, initials: "MS" },
                  { name: "Pedro Lima", role: "UX Designer", score: 92, initials: "PL" },
                  { name: "Ana Costa", role: "Full Stack", score: 88, initials: "AC" },
                  { name: "Lucas Silva", role: "DevOps", score: 85, initials: "LS" },
                ].map((candidate, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-9 h-9">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs">
                          {candidate.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-foreground">{candidate.name}</p>
                        <p className="text-xs text-muted-foreground">{candidate.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className="h-full gradient-primary rounded-full" 
                          style={{ width: `${candidate.score}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-primary">{candidate.score}%</span>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full mt-4" asChild>
                  <Link to="/company/candidates">
                    Ver todos os candidatos
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card variant="default">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Atividade Recente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: "Nova candidatura", detail: "Maria Santos se candidatou para Desenvolvedor Frontend", time: "Há 5 min", icon: FileText },
                  { action: "Entrevista confirmada", detail: "Pedro Lima confirmou entrevista para amanhã às 14h", time: "Há 1 hora", icon: Calendar },
                  { action: "Mensagem recebida", detail: "Ana Costa enviou uma mensagem sobre a vaga", time: "Há 2 horas", icon: MessageSquare },
                  { action: "Nova candidatura", detail: "Lucas Silva se candidatou para DevOps Engineer", time: "Há 3 horas", icon: FileText },
                ].map((activity, i) => (
                  <div key={i} className="flex items-start gap-4 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <activity.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{activity.action}</p>
                      <p className="text-sm text-muted-foreground truncate">{activity.detail}</p>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default CompanyDashboard;
