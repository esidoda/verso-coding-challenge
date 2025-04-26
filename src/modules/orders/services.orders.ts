import useHttp from "../../composables/useHttp";
import type { Company, NewOrder, Order } from "./types.orders";

export const getOrders = (): Promise<Order[]> => {
  return useHttp()
    .http.get(`/orders`)
    .then((response) => response.data);
};

export const addOrder = (order: NewOrder): Promise<Order> => {
  return useHttp()
    .http.post(`/orders`, order)
    .then((response) => response.data);
};

export const getOrder = (id: string): Promise<Order> => {
  return useHttp()
    .http.get(`/orders/${id}`)
    .then((response) => response.data);
};

export const updateOrder = (product: Order): Promise<Order> => {
  return useHttp()
    .http.put(`/orders/${product.id}`, product)
    .then((response) => response.data);
};

export const deleteOrder = (id: string): Promise<void> => {
  return useHttp()
    .http.delete(`/orders/${id}`)
    .then(() => undefined);
};

export const getCustomerCompanies = (): Promise<Company[]> => {
  return useHttp()
    .http.get(`/customers`)
    .then((response) => response.data);
};
export const getSupplierCompanies = (): Promise<Company[]> => {
  return useHttp()
    .http.get(`/suppliers`)
    .then((response) => response.data);
};
