<template>
  <v-container class="main-container">
    <TitleBar title="Orders" :show-back-button="true" back-route="orders" />
    <v-card class="pa-6 mt-10">
      <OrderFrom
        @save="updateExistingOrder"
        :existing-order="existingOrder"
        :is-saving="isUpdatingOrder"
      />
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import TitleBar from "@/components/TitleBar.vue";
import OrderFrom from "../components/OrderForm.vue";
import {  onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { type NewOrder, type Order } from "../types.orders";
import { getOrder, updateOrder } from "../services.orders";
import { useNotificationStore } from "@/stores/notificationStore";
import { NOTIFICATION_TYPE } from "@/types";

const isUpdatingOrder = ref(false);

const router = useRouter();
const existingOrder = ref<Order>();
const notificationStore = useNotificationStore();

const loadExistingOrder = () => {
  const orderId = router.currentRoute.value.params.id as string;
  if (!orderId) {
    return;
  }
  getOrder(orderId)
    .then((response) => {
      existingOrder.value = response;
    })
    .catch(() => {
      notificationStore.showNotification(NOTIFICATION_TYPE.ERROR);
    });
};

const updateExistingOrder = (orderData: NewOrder | Order) => {
  const order = orderData as Order;
  order.updatedAt = new Date().toISOString();
  isUpdatingOrder.value = true;
  updateOrder(order)
    .then(() => {
      router.push({ name: "orders" });
      notificationStore.showNotification(NOTIFICATION_TYPE.SUCCESS);
    })
    .catch(() => {
      notificationStore.showNotification(NOTIFICATION_TYPE.ERROR);
    })
    .finally(() => {
      isUpdatingOrder.value = false;
    });
};

onMounted(() => {
  loadExistingOrder();
});
</script>

<style lang="scss" scoped>
.order-item-row {
  height: 100px;
}
</style>
