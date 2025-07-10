import axios from "axios";
import Cookies from "js-cookie";
import { LoginCredentials, TokenResponse } from "@/models/Login";

class AuthService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api";
  }

  async login(credentials: LoginCredentials): Promise<TokenResponse> {
    try {
      const response = await axios.post(`${this.baseUrl}/login/`, credentials);
      const { access, refresh, message } = response.data;
      Cookies.set("access_token", access, { expires: 1 }); // 1 day
      Cookies.set("refresh_token", refresh, { expires: 7 }); // 7 days

      return { access, refresh, message };
    } catch (error: any) {
      const msg =
        error.response?.data?.detail ||
        error.response?.data?.non_field_errors?.[0] ||
        "Login failed";
      throw new Error(msg);
    }
  }

  async refreshToken(): Promise<string> {
    const refresh = Cookies.get("refresh_token");
    if (!refresh) throw new Error("No refresh token");

    try {
      const response = await axios.post(`${this.baseUrl}/token/refresh/`, {
        refresh,
      });
      const newAccess = response.data.access;
      Cookies.set("access_token", newAccess, { expires: 1 });
      return newAccess;
    } catch (error) {
      this.logout();
      throw new Error("Session expired. Please login again.");
    }
  }

  logout() {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
  }

  getAccessToken(): string | undefined {
    return Cookies.get("access_token");
  }
}

export default new AuthService();
