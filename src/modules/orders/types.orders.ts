import type { Product } from "../products/types.products";

export interface Order {
  id: string;
  orderNumber: string;
  orderItems: OrderItem[];
  customerCompany: Company;
  supplierCompany: Company;
  totalAmount: number;
  createdAt: Date;
  updatedAt?: Date;
}

export interface NewOrder {
  orderNumber: string;
  orderItems: OrderItem[];
  customerCompany: Company;
  supplierCompany: Company;
  totalAmount: number;
  createdAt: Date;
}

export interface OrderItem {
  product: Product;
  quantity: number;
}

export interface Company {
  id: string;
  name: string;
}

export const createEmptyOrder = (): NewOrder => {
  return {
    orderNumber: "",
    orderItems: [],
    createdAt: new Date(),
    customerCompany: { id: "", name: "" },
    supplierCompany: { id: "", name: "" },
    totalAmount: 0,
  };
};
