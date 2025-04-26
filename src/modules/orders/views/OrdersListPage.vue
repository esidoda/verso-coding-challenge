<template>
  <v-container class="main-container">
    <TitleBar title="Orders" />
    <DataTable
      :is-loading="isLoading"
      :has-request-failed="hasRequestFailed"
      :headers="headers"
      :expandableHeaders="expandableHeaders"
      expandableProperty="orderItems"
      :items="orders"
      search-label="Search Order"
      add-button-text="Add Order"
      add-button-route="add-order"
      edit-button-route="/orders/edit"
      @delete-item="onDeleteOrder"
      :is-expandable="true"
      collapse-text="Products"
    />

    <Notification
      v-if="showNotification"
      :show="showNotification"
      :type="!hasRequestFailed ? 'success' : 'error'"
    />

    <ConfirmationDialog
      v-model="showDeleteDialog"
      title="Are you sure you want to delete this order?"
      actionText="Delete"
      @confirmed="onConfirmedDelete"
    />
  </v-container>
</template>

<script setup lang="ts">
import TitleBar from "@/components/TitleBar.vue";
import Notification from "@/components/Notification.vue";
import DataTable from "@/components/DataTable.vue";
import ConfirmationDialog from "@/components/ConfirmationDialog.vue";
import { onMounted, ref } from "vue";
import { deleteOrder, getOrders } from "../services.orders";
import type { Order } from "../types.orders";
import type { TableHeader } from "@/types";

const isLoading = ref(false);
const hasRequestFailed = ref(false);
const showNotification = ref(false);

const showDeleteDialog = ref(false);
const selectedOrderIdForDeletion = ref<string | null>(null);

const orders = ref<Order[]>([]);

const headers = [
  { title: "Order Number", value: "orderNumber" },
  { title: "Customer", value: "customerCompany.name" },
  { title: "Supplier", value: "supplierCompany.name" },
  { title: "Total Amount (EUR)", value: "totalAmount", sortable: true },
  { title: "Actions", value: "actions", align: "end" },
] as TableHeader[];

const expandableHeaders = [
  { title: "Product", valueLevelOne: "product", valueLevelTwo: "name" },
  { title: "Price (EUR)", valueLevelOne: "product", valueLevelTwo: "price" },
  { title: "Product Quantity", valueLevelOne: "quantity" },
] as TableHeader[];

const loadTable = () => {
  isLoading.value = true;
  getOrders()
    .then((response) => {
      orders.value = response;
    })
    .catch(() => {
      hasRequestFailed.value = true;
    })
    .finally(() => {
      isLoading.value = false;
    });
};

const onConfirmedDelete = () => {
  if (!selectedOrderIdForDeletion.value) return;

  deleteOrder(selectedOrderIdForDeletion.value)
    .then(() => {
      orders.value = orders.value.filter(
        (order: Order) => order.id !== selectedOrderIdForDeletion.value
      );
    })
    .catch(() => {
      hasRequestFailed.value = true;
    })
    .finally(() => {
      showNotification.value = true;
    });
};

const onDeleteOrder = (id: string) => {
  selectedOrderIdForDeletion.value = id;
  showDeleteDialog.value = true;
};

onMounted(() => {
  loadTable();
});
</script>
