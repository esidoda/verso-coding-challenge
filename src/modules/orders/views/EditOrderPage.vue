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
import { nextTick, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { type NewOrder, type Order } from "../types.orders";
import { getOrder, updateOrder } from "../services.orders";

const isUpdatingOrder = ref(false);
const showNotification = ref(false);
const isSuccess = ref(false);

const router = useRouter();
const existingOrder = ref<Order>();

const loadExistingOrder = () => {
  const orderId = router.currentRoute.value.params.id as string;
  if (!orderId) {
    return;
  }
  getOrder(orderId).then((response) => {
    existingOrder.value = response;
  });
};

const updateExistingOrder = (orderData: NewOrder | Order) => {
  const order = orderData as Order;
  order.updatedAt = new Date().toISOString();
  isUpdatingOrder.value = true;
  updateOrder(order)
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
      isUpdatingOrder.value = false;
      showNotification.value = true;
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
