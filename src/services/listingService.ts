// services/listingService.ts
import axios from "axios";

export interface Listing {
  id: number;
  title: string;
  car_name: string;
  status: "pending" | "approved" | "rejected";
  updated_by_email?: string | null;
  updated_at?: string;
  created_at: string;
}

export interface ListingUpdatePayload {
  title?: string;
  car_name?: string;
  status?: "pending" | "approved" | "rejected";
}

export interface PaginatedResponse<T> {
  results: T[];
  count: number;
  next: string | null;
  previous: string | null;
}

class ListingService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api";
  }

  private getAuthHeaders() {
    const token = localStorage.getItem("access_token");
    return {
      Authorization: `Bearer ${token}`,
    };
  }

  async getListings(page = 1, pageSize = 10): Promise<PaginatedResponse<Listing>> {
    const response = await axios.get(`${this.baseUrl}/listings/?page=${page}&page_size=${pageSize}`, {
      headers: this.getAuthHeaders(),
    });
    return response.data;
  }

  async getListing(id: number): Promise<Listing> {
    const response = await axios.get(`${this.baseUrl}/listings/${id}/`, {
      headers: this.getAuthHeaders(),
    });
    return response.data;
  }

  async updateListing(id: number, payload: ListingUpdatePayload): Promise<Listing> {
    const response = await axios.put(`${this.baseUrl}/listings/${id}/`, payload, {
      headers: this.getAuthHeaders(),
    });
    return response.data;
  }

  async updateStatus(id: number, status: "approved" | "rejected" | "pending"): Promise<{ message: string }> {
    const response = await axios.patch(
      `${this.baseUrl}/listings/${id}/status/`,
      { status },
      {
        headers: this.getAuthHeaders(),
      }
    );
    return response.data;
  }
}

export default new ListingService();
