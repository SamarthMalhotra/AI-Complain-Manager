export type ComplainStore = {
  title: string;
  date: string;
  description: string;
  status: number;
  index: number;
  reply?: string;
  id: string;
  company: { _id: string; name: string };
  product: string;
};
