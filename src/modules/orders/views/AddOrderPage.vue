<template>
  <v-container class="main-container">
    <TitleBar title="Orders" :show-back-button="true" back-route="orders" />
    <v-card class="pa-6 mt-10">
      <OrderFrom @save="createNewOrder" :is-saving="isCreatingOrder" />
    </v-card>
    <Notification
      v-if="showNotification"
      :show="showNotification"
      :type="isSuccess ? 'success' : 'error'"
    />
  </v-container>
</template>

<script setup lang="ts">
import TitleBar from "@/components/TitleBar.vue";
import Notification from "@/components/Notification.vue";
import OrderFrom from "../components/OrderForm.vue";
import { nextTick, ref } from "vue";
import { useRouter } from "vue-router";
import { type NewOrder, type Order } from "../types.orders";
import { addOrder } from "../services.orders";

const isCreatingOrder = ref(false);
const showNotification = ref(false);
const isSuccess = ref(false);

const router = useRouter();

const createNewOrder = (orderData: Order | NewOrder) => {
  const order = orderData as NewOrder;
  isCreatingOrder.value = true;
  order.createdAt = new Date().toISOString();
  addOrder(order)
    .then(() => {
      isSuccess.value = true;
      nextTick(() => {
        router.push({ name: "orders" });
      });
    })
    .catch(() => {
      isSuccess.value = false;
    })
    .finally(() => {
      isCreatingOrder.value = false;
      showNotification.value = true;
    });
};
</script>

<style lang="scss" scoped>
.order-item-row {
  height: 100px;
}
</style>
