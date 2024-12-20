type Category = {
  id: string;
  title: string;
  image?: string;
  children?: Category[];
};

export type Response = {
  count: number;
  next?: string | null;
  previous?: string | null;
  results: Category[];
};
