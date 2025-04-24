import type { Router } from "vue-router";
import ProductsListPage from "./views/ProductsListPage.vue";
import AddProductPage from "./views/AddProductPage.vue";
import EditProductPage from "./views/EditProductPage.vue";

export default (router: Router) => {
  router.addRoute({
    path: "/products",
    name: "products",
    component: ProductsListPage,
  });

  router.addRoute({
    path: "/products/add",
    name: "add-product",
    component: AddProductPage,
  });

  router.addRoute({
    path: "/products/edit/:id",
    name: "edit-product",
    component: EditProductPage,
  });
};
