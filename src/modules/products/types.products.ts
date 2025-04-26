export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  createdAt: string;
  updatedAt?: string;
}

export interface NewProduct {
  name: string;
  description: string;
  price: number | null;
  createdAt: string;
}

export const createEmptyProduct = (): NewProduct => {
  return {
    name: "",
    price: null,
    description: "",
    createdAt: new Date().toISOString(),
  };
};
