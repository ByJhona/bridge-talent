import { useState } from "react";
import Resume from "../components/layout/Resume.tsx";
import {useAuth} from '../context/AuthContext.jsx'
import { Bell, Briefcase, FileText, Home, Star, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Link, redirect, useNavigate } from "react-router-dom";
import {logoutUser} from '../services/authService.tsx'
import { Button } from "@/components/ui/button.tsx";
import Skills from "@/components/layout/Skills.tsx";
import Perfil from "@/components/layout/Perfil.tsx";
import Dashboard from "@/components/layout/Dashboard.tsx";
const CandidateDashboard = () => {
    const navigate = useNavigate();

  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");
 const handleLogout = () => {
      logoutUser().finally(()=> {
        navigate("/")
      })
    }

  return (
    <div className="min-h-screen bg-bUserInfoackground flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-card border-r border-border">
        <nav className="flex-1 p-4 space-y-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 gradient-primary rounded-lg flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">TalentBridge</span>
          </Link>

          
              <button 
                onClick={() => setActiveTab("dashboard")} 
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
              >
                <Home className="w-5 h-5" />
                Dashboard
              </button>

              <button 
                onClick={() => setActiveTab("profile")} 
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
              >
                <User className="w-5 h-5" />
                Meu Perfil
              </button>

              <button 
                onClick={() => setActiveTab("curriculo")} 
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
              >
                <FileText className="w-5 h-5" />
                Analisar Currículo
              </button>

              <button 
                onClick={() => setActiveTab("skills")} 
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
              >
                <Star className="w-5 h-5" />
                Skills
              </button> </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border">
          <div className="flex items-center justify-between px-6 h-16">
            <h1 className="text-xl font-semibold text-foreground">Dashboard</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <AvatarImage src={user?.avatarUrl || ""} />
                  <AvatarFallback className="text-primary-foreground font-bold">
                    {user?.name[0]?.toUpperCase()}
                  </AvatarFallback>
              </Avatar>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-foreground">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">Candidato</p>
                </div>
              </div>
              <Button size="sm" variant="ghost" onClick={handleLogout}>Sair</Button>

            </div>
          </div>
        </header>
         {/* Dashboard Content */}
        <div className="p-6 space-y-6">
          {/* Welcome Section */}
          <div className="gradient-primary rounded-2xl p-6 text-primary-foreground">
            <h2 className="text-2xl font-bold mb-2">Olá, {user?.name}! 👋</h2>
            <p className="text-primary-foreground/80 mb-4">
              Seu perfil está quase lá. Cadastre mais projetos para aumentar suas chances!
            </p>
          </div>
        </div>
        {activeTab === "curriculo" && <Resume />}
        {activeTab === "skills" && <Skills />}
        {activeTab === "profile" && <Perfil />}
        {activeTab === "dashboard" && <Dashboard />}

      </main>
    </div>
  );
};

export default CandidateDashboard;