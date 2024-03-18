export type SearchPizzaParams = {
  categoryBy: string;
  sortBy: string;
  order: string;
  search: string;
  currentPage: string;
};

export type PizzaItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  rating?: number;
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface PizzaSliceState {
  items: PizzaItem[];
  status: Status;
}