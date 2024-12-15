export interface Product {
  id: string;
  image: string;
  title: string;
  price: number;
  is_available: boolean;
  category: string;
  is_new: boolean;
}

export interface ProductResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Product[];
}
