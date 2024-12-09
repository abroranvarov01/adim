export type Banner = {
  id: number;
  title: string;
  description: string;
  image: string;
  created_at: string;
  updated_at: string;
};

export interface BannerResponse {
  count: number;
  next?: string | null;
  previous?: string | null;
  results: Banner[];
}
