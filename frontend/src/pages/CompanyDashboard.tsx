import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { Bell, Briefcase, Home, Users, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../services/authService.tsx";
import { Button } from "@/components/ui/button.tsx";
import JobManager from "@/components/layout/JobManager.tsx";
import Analize from "@/components/layout/Analize.tsx";

const CompanyDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleLogout = () => {
    logoutUser().finally(() => {
      navigate("/");
    });
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-card border-r border-border">
        <nav className="flex-1 p-4 space-y-2">
          <Link to="/" className="flex items-center gap-2 mb-6">
            <div className="w-9 h-9 gradient-primary rounded-lg flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">TalentBridge</span>
          </Link>

          <button
            onClick={() => setActiveTab("dashboard")}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === "dashboard"
                ? "bg-orange-100 text-orange-600 font-medium"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
          >
            <Home className="w-5 h-5" />
            Dashboard
          </button>

          <button
            onClick={() => setActiveTab("jobs")}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === "jobs"
                ? "bg-orange-100 text-orange-600 font-medium"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
          >
            <Briefcase className="w-5 h-5" />
            Vagas
          </button>

          <button
            onClick={() => setActiveTab("candidates")}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === "candidates"
                ? "bg-orange-100 text-orange-600 font-medium"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
          >
            <Users className="w-5 h-5" />
            Candidatos
          </button>
          <button
            onClick={() => setActiveTab("analytics")}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === "analytics"
                ? "bg-orange-100 text-orange-600 font-medium"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
          >
            <Star className="w-5 h-5" />
            Análises
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border">
          <div className="flex items-center justify-between px-6 h-16">
            <h1 className="text-xl font-semibold text-foreground">Dashboard Empresa</h1>
            <div className="flex items-center gap-4 " >
        <Button onClick={() => setActiveTab("jobs")}
      size="sm"
      className="bg-orange-600 text-white hover:bg-orange-500"
    >
      Nova Vaga
    </Button>
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                  <AvatarImage src={user?.avatarUrl || ""} />
                  <AvatarFallback className="text-orange-600 font-bold">
                    {user?.name && user.name.length > 0 ? user.name[0].toUpperCase() : "E"}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-foreground">{user?.name || "Empresa"}</p>
                  <p className="text-xs text-muted-foreground">Empresa</p>
                </div>
              </div>
              <Button size="sm" variant="ghost" onClick={handleLogout}>
                Sair
              </Button>
            </div>
          </div>
        </header>
        {/* Dashboard Content */}
        <div className="p-6 space-y-6">
          {activeTab === "dashboard" && (
          <div className="gradient-accent rounded-2xl p-6 text-accent-foreground">
            <h2 className="text-2xl font-bold mb-2">Bem-vinda, {user?.name || "Empresa"}! 🚀</h2>
            <p className="text-accent-foreground/80">
              Aqui você verá um resumo das suas vagas e candidatos.            </p>
          </div>
          )}
          {activeTab === "jobs" && (
           <JobManager/>
          )}
          {activeTab === "candidates" && (
            <div>
              <p>Top candidatos para suas vagas</p>
            </div>
          )}
          {activeTab === "analytics" && (
            <Analize/>
          )}
        </div>
      </main>
    </div>
  );
};

export default CompanyDashboard;