export interface CategoryType {
  count: number;
  next: string;
  previous: string;
  results: { id: number; name: string; img: string; parent: number }[];
}
