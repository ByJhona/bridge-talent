import { auth, database } from "../../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut , updateProfile} from "firebase/auth";
import { ref, set } from "firebase/database";


export const registerUser = async (name, email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await updateProfile(user, { displayName: name });


    await set(ref(database, 'users/' + user.uid), {
      name: name,
      email: email,
      createdAt: new Date().toISOString()
    });


    return user;

};

export const loginUser = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return userCredential.user;

};

// Logout
export const logoutUser = async () => {
    await signOut(auth);
};
