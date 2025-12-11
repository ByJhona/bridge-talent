import { auth, database } from "../../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut , updateProfile} from "firebase/auth";
import { get, ref, remove, set ,update} from "firebase/database";
import { SkillCategory } from "./apiService";



export const registerAbilities = async (uid: string, newAbilities: SkillCategory[]) => {
  const abilitiesRef = ref(database, 'users/' + uid + '/abilities');

  const snapshot = await get(abilitiesRef);
  const existingAbilities: SkillCategory[] = snapshot.exists() ? snapshot.val() : [];

  const mergedAbilities = [...existingAbilities, ...newAbilities];

  await update(ref(database, 'users/' + uid), {
    abilities: mergedAbilities
  });
};

export const registerFeedback = async (uid: string, feedback:string) => {
  await update(ref(database, 'users/' + uid), {
    feedback
  });
};

export const getFeedback = async (uid: string) => {
  const feedbackRef = ref(database, 'users/' + uid + '/feedback');

  const snapshot = await get(feedbackRef);

  return snapshot.exists() ? snapshot.val() : "";
  
};


export const getAbilities = async (uid: string) => {
  const abilitiesRef = ref(database, 'users/' + uid + '/abilities');

  const snapshot = await get(abilitiesRef);
  const existingAbilities: SkillCategory[] = snapshot.exists() ? snapshot.val() : [];


return existingAbilities;
};

export const deleteAllAbilities = async (uid: string) => {
  const abilitiesRef = ref(database, 'users/' + uid + '/abilities');
  await remove(abilitiesRef);
};