import OrdersListPage from "./views/OrdersListPage.vue";
import AddOrderPage from "./views/AddOrderPage.vue";
import EditOrderPage from "./views/EditOrderPage.vue";
import type { Router } from "vue-router";

export default (router: Router) => {
  router.addRoute({
    path: "/orders",
    name: "orders",
    component: OrdersListPage,
  });

  router.addRoute({
    path: "/orders/add",
    name: "add-order",
    component: AddOrderPage,
  });

  router.addRoute({
    path: "/orders/edit",
    name: "edit-order",
    component: EditOrderPage,
  });
};
