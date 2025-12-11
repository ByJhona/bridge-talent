import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, database } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { ref, get } from "firebase/database";

// Criando o Context com valor inicial explícito
const AuthContext = createContext({
  user: null,
  loading: true
});

// Named export do Provider
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      try {
        if (currentUser) {
          const userRef = ref(database, 'users/' + currentUser.uid);
          const snapshot = await get(userRef);
          const userData = snapshot.exists() ? snapshot.val() : {};
          setUser({ uid: currentUser.uid, email: currentUser.email, ...userData });
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// Named export do hook
function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
