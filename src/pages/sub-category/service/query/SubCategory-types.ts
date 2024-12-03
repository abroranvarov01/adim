type SubCategory = {
  id: string;
  title: string;
  image?: string;
  parent: { id: string; title: string };
};

export type SubResponse = {
  count: number;
  next?: string | null;
  previous?: string | null;
  results: SubCategory[];
};
