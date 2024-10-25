export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page_number: number;
  page_size: number;
  total_pages: number;
}

export interface Customer {
  id: number;
  name: string;
}

export interface Partner {
  id: number;
  name: string;
  rating_score: number;
  distance: number;
}

export interface PartnerDetails extends Partner {
  materials: Materials[];
  street_address: string;
  postcode: string;
  city: string;
  country_code: string;
  country: string;
  latitude: number;
  longitude: number;
  operating_radius: number;
  rating_score: number;
  rating_count: number;
}

export type CustomersReponse = PaginatedResponse<Customer>;
export type PartnersReponse = PaginatedResponse<Partner>;

export type Materials = "wood" | "carpet" | "tiles";
