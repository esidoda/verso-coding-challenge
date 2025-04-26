import {
  addProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "@/modules/products/services.products";
import { expect, test } from "vitest";

test("should allow creating a product, editing and deleting", async () => {
  // testing the product creation
  const newProduct = {
    name: "New Product",
    price: 20,
    description: "New Product Description",
    createdAt: new Date().toISOString(),
  }
  const response = await addProduct(newProduct);

  expect(response).toMatchObject({
    name: newProduct.name,
    price: newProduct.price,
    description: newProduct.description,
  });
  
  // testing the product update
  const updatedProduct = await updateProduct({
    ...response, // Spread the existing product properties
    description: "Updated Description",
    updatedAt: new Date().toISOString(),
  });

  expect(updatedProduct.description).toBe("Updated Description");

  // testing the product deletion
  await deleteProduct(response.id);
  const allProducts = await getProducts();
  const deletedProduct = allProducts.find((p) => p.id === response.id);
  expect(deletedProduct).toBeUndefined();
});