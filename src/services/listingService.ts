import axiosInstance from "./axiosInstance";

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
  async getListings(
  page = 1,
  pageSize = 10,
  status?: "approved" | "pending" | "rejected" | "all"
): Promise<PaginatedResponse<Listing>> {
  const params: any = { page, page_size: pageSize };
  if (status && status !== "all") {
    params.status = status;
  }

  const response = await axiosInstance.get(`/listings/`, { params });
  return response.data;
}


  async getListing(id: number): Promise<Listing> {
    const response = await axiosInstance.get(`/listings/${id}/`);
    return response.data;
  }

  async updateListing(id: number, payload: ListingUpdatePayload): Promise<Listing> {
    const response = await axiosInstance.put(`/listings/${id}/`, payload);
    return response.data;
  }

  async updateStatus(id: number, status: "approved" | "rejected" | "pending"): Promise<{ message: string }> {
    const response = await axiosInstance.patch(`/listings/${id}/status/`, { status });
    return response.data;
  }
}

export default new ListingService();
