import useHttp from "../../composables/useHttp";
import type { NewProduct, Product } from "./types.products";

export const getProducts = (): Promise<Product[]> => {
  return useHttp()
    .http.get(`/products`)
    .then((response) => response.data);
};

export const addProduct = (product: NewProduct): Promise<Product> => {
  return useHttp()
    .http.post(`/products`, product)
    .then((response) => response.data);
};

export const getProduct = (id: string): Promise<Product> => {
  return useHttp()
    .http.get(`/products/${id}`)
    .then((response) => response.data);
};

export const updateProduct = (product: Product): Promise<Product> => {
  return useHttp()
    .http.put(`/products/${product.id}`, product)
    .then((response) => response.data);
};

export const deleteProduct = (id: string): Promise<void> => {
  return useHttp()
    .http.delete(`/products/${id}`)
    .then(() => undefined);
};
