// services/authService.ts
import axios from "axios";

interface LoginCredentials {
  email: string;
  password: string;
}

interface TokenResponse {
  access: string;
  refresh: string;
  message: string;
}

class AuthService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api";
  }

  async login(credentials: LoginCredentials): Promise<TokenResponse> {
    try {
      const response = await axios.post(`${this.baseUrl}/login/`, credentials);
      const { access, refresh, message } = response.data;

      // Store tokens locally (for protected API usage later)
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);

      return { access, refresh, message };
    } catch (error: any) {
      const msg =
        error.response?.data?.detail ||
        error.response?.data?.non_field_errors?.[0] ||
        "Login failed";
      throw new Error(msg);
    }
  }

  logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  }

  getAccessToken(): string | null {
    return localStorage.getItem("access_token");
  }
}

export default new AuthService();
