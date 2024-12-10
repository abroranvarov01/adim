export interface BrandGet {
  id: number;
  title: string;
  image?: string;
}

export interface BrandResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: BrandGet[];
}
