export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  qty?: number;
  category?: string;
  rating?: Rating;
}

export interface Rating {
  rate: number;
  count: number;
}
