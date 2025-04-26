<template>
  <v-container class="main-container">
    <TitleBar title="Orders" :show-back-button="true" back-route="orders" />
    <v-card class="pa-6 mt-10">
      <OrderFrom @save="createNewOrder" :is-saving="isCreatingOrder" />
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import TitleBar from "@/components/TitleBar.vue";
import OrderFrom from "../components/OrderForm.vue";
import { useRouter } from "vue-router";
import { type NewOrder, type Order } from "../types.orders";
import { addOrder } from "../services.orders";
import { useNotificationStore } from "@/stores/notificationStore";
import { NOTIFICATION_TYPE } from "@/types";
import { ref } from "vue";

const isCreatingOrder = ref(false);
const router = useRouter();
const notificationStore = useNotificationStore();

const createNewOrder = (orderData: Order | NewOrder) => {
  const order = orderData as NewOrder;
  isCreatingOrder.value = true;
  order.createdAt = new Date().toISOString();
  addOrder(order)
    .then(() => {
      router.push({ name: "orders" });
      notificationStore.showNotification(NOTIFICATION_TYPE.SUCCESS);
    })
    .catch(() => {
      notificationStore.showNotification(NOTIFICATION_TYPE.ERROR);
    })
    .finally(() => {
      isCreatingOrder.value = false;
    });
};
</script>

<style lang="scss" scoped>
.order-item-row {
  height: 100px;
}
</style>
