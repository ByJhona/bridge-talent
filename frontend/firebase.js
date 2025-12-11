import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAajjT6lNnn5amCMmq5VSYf_ZsCmdIOy0I",
  authDomain: "talent-bridge-by-jhona.firebaseapp.com",
  projectId: "talent-bridge-by-jhona",
  storageBucket: "talent-bridge-by-jhona.firebasestorage.app",
  messagingSenderId: "502480895514",
  appId: "1:502480895514:web:c5be0298f0d4955d041ba3"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Exporta o auth
export const auth = getAuth(app);
export const database = getDatabase(app);