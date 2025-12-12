export interface Job {
  id: string;
  title: string;
  company: string;
  description: string;
  skillsRequired: string[];
  createdAt: string; 
  owner:string;
}

export interface UserApplication {
  jobId: string;
  appliedAt: string;
}

export interface JobApplication {
  id: string;
  title: string;
  company: string;
  status: "Pendente" | "Aprovado" | "Rejeitado";
  appliedAt: string;
}

export interface Candidate {
  uid: string;
  name: string;
  abilities: { category: string; skills: string[] }[];
}


export interface FirebaseUser {
  name?: string;
  abilities?: { category: string; skills: string[] }[];
  applications?: Record<string, { appliedAt: string }>;
}
