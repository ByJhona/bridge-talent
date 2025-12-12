import { auth, database } from "../../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut , updateProfile} from "firebase/auth";
import { equalTo, get, orderByChild, push, query, ref, remove, set ,update} from "firebase/database";
import { SkillCategory } from "./apiService";
import { Job, UserApplication , JobApplication, Candidate, FirebaseUser} from "@/components/types/Types";



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



export const getApplications = async (uid: string): Promise<JobApplication[]> => {
  const userAppsRef = ref(database, `users/${uid}/applications`);
  const jobsRef = ref(database, "jobs");

  const [appsSnapshot, jobsSnapshot] = await Promise.all([get(userAppsRef), get(jobsRef)]);
  
  if (!appsSnapshot.exists() || !jobsSnapshot.exists()) return [];

  const appsData = appsSnapshot.val();
  const jobsData = jobsSnapshot.val();

  return Object.keys(appsData).map((jobId) => {
    const job = jobsData[jobId];
    if (!job) return null;

    return {
      id: job.id,
      title: job.title,
      company: job.company,
      status: appsData[jobId].status || "Pendente",
      appliedAt: appsData[jobId].appliedAt,
    };
  }).filter(Boolean) as JobApplication[];
};

export const getCandidatesAppliedToJob = async (jobId: string): Promise<Candidate[]> => {
  const usersRef = ref(database, "users");
  const snapshot = await get(usersRef);

  if (!snapshot.exists()) return [];

  const users = snapshot.val() as Record<string, FirebaseUser>;
  const candidates: Candidate[] = [];

  Object.entries(users).forEach(([uid, user]) => {
    if (user.applications && user.applications[jobId]) {
      candidates.push({
        uid,
        name: user.name || "Candidato",
        abilities: user.abilities || []
      });
    }
  });

  return candidates;
};




export const getJobs = async (): Promise<Job[]> => {
  const jobsRef = ref(database, "jobs");
  const snapshot = await get(jobsRef);
  return snapshot.exists() ? Object.values(snapshot.val()) : [];
};

export const getJobsById = async (owner: string = ""): Promise<Job[]> => {
  const jobsRef = ref(database, "jobs");
  const jobsQuery = query(jobsRef, orderByChild("owner"), equalTo(owner));
  const snapshot = await get(jobsQuery);
  return snapshot.exists() ? Object.values(snapshot.val()) : [];
};


export const getUserApplications = async (uid: string): Promise<string[]> => {
  const userAppsRef = ref(database, `users/${uid}/applications`);
  const snapshot = await get(userAppsRef);
  return snapshot.exists() ? Object.keys(snapshot.val()) : [];
};

export const applyToJob = async (uid: string, jobId: string) => {
  const userAppsRef = ref(database, `users/${uid}/applications/${jobId}`);
  await set(userAppsRef, { appliedAt: new Date().toISOString() });
};

export const cancelApplication = async (uid: string, jobId: string) => {
  const userAppsRef = ref(database, `users/${uid}/applications/${jobId}`);
  await remove(userAppsRef);
};

export const createJob = async (job: Omit<Job, "id" | "createdAt">) => {
  const jobsRef = ref(database, "jobs");
  const newJobRef = push(jobsRef); 
  const newJob: Job = {
    ...job,
    id: newJobRef.key!,
    createdAt: new Date().toISOString(),
  };
  await set(newJobRef, newJob);
  return newJob;
};