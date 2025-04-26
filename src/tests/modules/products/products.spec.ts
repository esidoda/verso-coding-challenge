import {
  addProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "@/modules/products/services.products";
import type { NewProduct, Product } from "@/modules/products/types.products";
import { expect, test } from "vitest";

let product: Product | null = null;

test("should allow adding a new product", async () => {
  const newProduct: NewProduct = {
    name: "New Product",
    price: 19.99,
    description: "New Product Description",
    createdAt: new Date().toISOString(),
  };

  const response = await addProduct(newProduct);
  expect(response).toMatchObject({
    name: newProduct.name,
    price: newProduct.price,
    description: newProduct.description,
  });

  product = response;
});

test("should update the product", async () => {
  if (!product) {
    throw new Error("No product to update");
  }
  
  const updatedProduct = await updateProduct({
    ...product, // Spread the existing product properties
    description: "Updated Description",
    updatedAt: new Date().toISOString(),
  });

  expect(updatedProduct.description).toBe("Updated Description");
});

test("should delete the product", async () => {
  if (!product) {
    throw new Error("No product to update");
  }

  await deleteProduct(product.id);

  const allProducts = await getProducts();
  const deletedProduct = allProducts.find((p) => p.id === product?.id);

  expect(deletedProduct).toBeUndefined();
});
