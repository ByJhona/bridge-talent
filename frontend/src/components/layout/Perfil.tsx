import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from '../../context/AuthContext.jsx';

const Perfil = () => {
  const { user } = useAuth();
  const [refresh, setRefresh] = useState(0);
  if (!user) return <p className="text-center Perfilmt-24">Carregando usuário...</p>;

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 pt-24 pb-12 gradient-hero">
        <div className="container mx-auto px-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações do Usuário</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                {user.photoURL && (
                  <img
                    src={user.photoURL}
                    alt="Avatar"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                )}
                <div>
                  <p><strong>Nome:</strong> {user.name || "Não informado"}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>UID:</strong> {user.uid}</p>
                  <p><strong>Email verificado:</strong> {user.emailVerified ? "Sim" : "Não"}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => setRefresh(r => r + 1)} variant="outline">
                Atualizar
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Perfil;
