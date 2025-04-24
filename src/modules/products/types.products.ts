export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  createdAt: Date;
  updatedAt?: Date;
}

export interface NewProduct {
  name: string;
  description: string;
  price: number | null;
  createdAt: Date;
}

export const createEmptyProduct = (): NewProduct => {
  return {
    name: "",
    price: null,
    description: "",
    createdAt: new Date(),
  };
};
