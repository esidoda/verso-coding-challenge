import type { Product } from "../products/types.products";

export interface Order {
  id: string;
  orderNumber: string;
  orderItems: OrderItem[];
  customerCompany: Company;
  supplierCompany: Company;
  totalAmount: number;
  createdAt: string;
  updatedAt?: string;
}

export interface NewOrder {
  orderNumber: string;
  orderItems: OrderItem[];
  customerCompany: Company;
  supplierCompany: Company;
  totalAmount: number;
  createdAt: string;
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
    createdAt: new Date().toISOString(),
    customerCompany: { id: "", name: "" },
    supplierCompany: { id: "", name: "" },
    totalAmount: 0,
  };
};
