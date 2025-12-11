import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Brain, 
  Building2, 
  FileText, 
  GraduationCap, 
  MessageSquare, 
  Target, 
  TrendingUp, 
  Users,
  CheckCircle2,
  Sparkles,
  BarChart3
} from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge variant="secondary" className="animate-fade-up">
              <Sparkles className="w-3 h-3 mr-1" />
              Potencializado por Inteligência Artificial
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground animate-fade-up" style={{ animationDelay: '0.1s' }}>
              Conecte seu{" "}
              <span className="text-gradient">talento</span>
              {" "}às melhores oportunidades
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: '0.2s' }}>
              A plataforma que une estudantes e profissionais a empresas inovadoras, 
              com treinamento AI personalizado e análise inteligente de perfil.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <Button variant="hero" size="xl" asChild>
                <Link to="/register">
                  Começar Agora
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="outline" size="xl" asChild>
                <Link to="/register?type=company">
                  <Building2 className="w-5 h-5" />
                  Sou Empresa
                </Link>
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-6 pt-8 animate-fade-up" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>+10.000 candidatos</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>+500 empresas</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>+2.000 vagas ativas</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="accent" className="mb-4">Funcionalidades</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Tudo que você precisa para sua carreira
            </h2>
            <p className="text-muted-foreground">
              Ferramentas inteligentes para impulsionar sua jornada profissional
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card variant="interactive" className="group">
              <CardHeader>
                <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center mb-4 group-hover:shadow-glow transition-all duration-300">
                  <Brain className="w-6 h-6 text-primary-foreground" />
                </div>
                <CardTitle>Simulador de Entrevistas AI</CardTitle>
                <CardDescription>
                  Pratique entrevistas com IA e receba feedback detalhado sobre suas respostas
                </CardDescription>
              </CardHeader>
            </Card>

            <Card variant="interactive" className="group">
              <CardHeader>
                <div className="w-12 h-12 gradient-accent rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300">
                  <FileText className="w-6 h-6 text-accent-foreground" />
                </div>
                <CardTitle>Análise de Currículo</CardTitle>
                <CardDescription>
                  Upload do CV para análise automatizada e sugestões de melhoria personalizadas
                </CardDescription>
              </CardHeader>
            </Card>

            <Card variant="interactive" className="group">
              <CardHeader>
                <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-success/20 transition-all duration-300">
                  <Target className="w-6 h-6 text-success" />
                </div>
                <CardTitle>Match Inteligente</CardTitle>
                <CardDescription>
                  Algoritmos que conectam candidatos às vagas mais compatíveis com seu perfil
                </CardDescription>
              </CardHeader>
            </Card>

            <Card variant="interactive" className="group">
              <CardHeader>
                <div className="w-12 h-12 bg-warning/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-warning/20 transition-all duration-300">
                  <TrendingUp className="w-6 h-6 text-warning" />
                </div>
                <CardTitle>Progresso e Insights</CardTitle>
                <CardDescription>
                  Dashboard com métricas de desenvolvimento e sugestões de cursos e habilidades
                </CardDescription>
              </CardHeader>
            </Card>

            <Card variant="interactive" className="group">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-all duration-300">
                  <MessageSquare className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Comunicação Direta</CardTitle>
                <CardDescription>
                  Chat integrado para comunicação entre candidatos e recrutadores
                </CardDescription>
              </CardHeader>
            </Card>

            <Card variant="interactive" className="group">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-all duration-300">
                  <BarChart3 className="w-6 h-6 text-accent" />
                </div>
                <CardTitle>Análise de Candidatos</CardTitle>
                <CardDescription>
                  Para empresas: ferramenta completa de análise e score de candidatos
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="muted" className="mb-4">Como Funciona</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Sua jornada em 3 passos simples
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto text-2xl font-bold text-primary-foreground">
                1
              </div>
              <h3 className="text-xl font-semibold text-foreground">Crie seu Perfil</h3>
              <p className="text-muted-foreground">
                Cadastre-se e preencha suas informações, experiências e competências
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 gradient-accent rounded-2xl flex items-center justify-center mx-auto text-2xl font-bold text-accent-foreground">
                2
              </div>
              <h3 className="text-xl font-semibold text-foreground">Treine com AI</h3>
              <p className="text-muted-foreground">
                Use nosso simulador para praticar entrevistas e melhorar seu currículo
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-success rounded-2xl flex items-center justify-center mx-auto text-2xl font-bold text-success-foreground">
                3
              </div>
              <h3 className="text-xl font-semibold text-foreground">Conecte-se</h3>
              <p className="text-muted-foreground">
                Candidate-se às vagas e receba feedback das empresas em tempo real
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* User Types CTA */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <Card variant="elevated" className="p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all duration-500" />
              <div className="relative space-y-6">
                <div className="w-14 h-14 gradient-primary rounded-xl flex items-center justify-center">
                  <GraduationCap className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Para Candidatos</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-muted-foreground">
                    <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                    Simulador de entrevistas com feedback AI
                  </li>
                  <li className="flex items-center gap-3 text-muted-foreground">
                    <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                    Análise e otimização de currículo
                  </li>
                  <li className="flex items-center gap-3 text-muted-foreground">
                    <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                    Match inteligente com vagas
                  </li>
                  <li className="flex items-center gap-3 text-muted-foreground">
                    <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                    Dashboard de progresso
                  </li>
                </ul>
                <Button variant="hero" className="w-full sm:w-auto" asChild>
                  <Link to="/register">
                    Criar Conta Grátis
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </Card>

            <Card variant="elevated" className="p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-40 h-40 bg-accent/5 rounded-full blur-2xl group-hover:bg-accent/10 transition-all duration-500" />
              <div className="relative space-y-6">
                <div className="w-14 h-14 gradient-accent rounded-xl flex items-center justify-center">
                  <Building2 className="w-7 h-7 text-accent-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Para Empresas</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-muted-foreground">
                    <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                    Publicação ilimitada de vagas
                  </li>
                  <li className="flex items-center gap-3 text-muted-foreground">
                    <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                    Análise inteligente de candidatos
                  </li>
                  <li className="flex items-center gap-3 text-muted-foreground">
                    <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                    Score de compatibilidade por vaga
                  </li>
                  <li className="flex items-center gap-3 text-muted-foreground">
                    <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                    Comunicação integrada
                  </li>
                </ul>
                <Button variant="accent" className="w-full sm:w-auto" asChild>
                  <Link to="/register?type=company">
                    Cadastrar Empresa
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-white/5 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Pronto para transformar sua carreira?
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Junte-se a milhares de profissionais que já estão usando nossa plataforma
          </p>
          <Button variant="glass" size="xl" className="bg-white/10 text-white border-white/20 hover:bg-white/20" asChild>
            <Link to="/register">
              Começar Gratuitamente
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
