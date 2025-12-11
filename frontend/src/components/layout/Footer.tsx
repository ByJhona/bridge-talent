import { Link } from "react-router-dom";
import { Briefcase, Mail, Linkedin, Twitter, Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary/50 border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 gradient-primary rounded-lg flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">TalentBridge</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Conectando talentos às melhores oportunidades. Sua ponte para o sucesso profissional.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Para Candidatos */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Para Candidatos</h4>
            <ul className="space-y-2">
              <li><Link to="/jobs" className="text-sm text-muted-foreground hover:text-primary transition-colors">Buscar Vagas</Link></li>
              <li><Link to="/training" className="text-sm text-muted-foreground hover:text-primary transition-colors">Treinamento AI</Link></li>
              <li><Link to="/resume" className="text-sm text-muted-foreground hover:text-primary transition-colors">Análise de Currículo</Link></li>
              <li><Link to="/register" className="text-sm text-muted-foreground hover:text-primary transition-colors">Criar Conta</Link></li>
            </ul>
          </div>

          {/* Para Empresas */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Para Empresas</h4>
            <ul className="space-y-2">
              <li><Link to="/register?type=company" className="text-sm text-muted-foreground hover:text-primary transition-colors">Publicar Vagas</Link></li>
              <li><Link to="/company" className="text-sm text-muted-foreground hover:text-primary transition-colors">Buscar Talentos</Link></li>
              <li><Link to="/pricing" className="text-sm text-muted-foreground hover:text-primary transition-colors">Planos e Preços</Link></li>
              <li><Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">Sobre Nós</Link></li>
            </ul>
          </div>

          {/* Contato */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Contato</h4>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="w-4 h-4" />
              <span>contato@talentbridge.com.br</span>
            </div>
            <p className="text-sm text-muted-foreground">
              São Paulo, Brasil
            </p>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 TalentBridge. Todos os direitos reservados.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacidade</Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">Termos de Uso</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
