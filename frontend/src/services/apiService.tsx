export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  status: number;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
      });

      const contentType = response.headers.get("content-type");

      let data: T | null = null;
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      }

      if (!response.ok) {
        return {
          data: null,
          error: data?.toString() || response.statusText,
          status: response.status,
        };
      }

      return { data, error: null, status: response.status };
    } catch (err) {
      console.error("API Request Error:", err);
      return { data: null, error: (err as Error).message, status: 0 };
    }
  }

  async analyzeResume(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    return this.request<{ abilities: SkillCategory[]; feedback: string }>("/resume/analyze", {
      method: "POST",
      body: formData,
    });
  }
}

export const api = new ApiService("http://localhost:8081");
