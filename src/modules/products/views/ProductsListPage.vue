<template>
  <v-container class="main-container">
    <TitleBar title="Products" />
    <DataTable
      :is-loading="isLoading"
      :has-request-failed="hasRequestFailed"
      :headers="headers"
      :items="products"
      search-label="Search Product"
      add-button-text="Add Product"
      add-button-route="add-product"
      edit-button-route="/products/edit"
      @delete-item="onDeleteProduct"
    />

    <Notification
      v-if="showNotification"
      :show="showNotification"
      :type="!hasRequestFailed ? 'success' : 'error'"
    />

    <ConfirmationDialog
      v-model="showDeleteDialog"
      title="Are you sure you want to delete this product?"
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
import type { Product } from "../types.products";
import { deleteProduct, getProducts } from "../services.products";

const isLoading = ref(false);
const hasRequestFailed = ref(false);
const showNotification = ref(false);

const showDeleteDialog = ref(false);
const selectedProductIdForDeletion = ref<string | null>(null);

const products = ref<Product[]>([]);

const headers = [
  { title: "Name", value: "name" },
  { title: "Price (€)", value: "price", sortable: true },
  { title: "Actions", value: "actions", align: "end" },
];

const loadTable = () => {
  isLoading.value = true;
  getProducts()
    .then((response) => {
      products.value = response;
    })
    .catch(() => {
      hasRequestFailed.value = true;
    })
    .finally(() => {
      isLoading.value = false;
    });
};

const onConfirmedDelete = () => {
  if (!selectedProductIdForDeletion.value) return;
  
  deleteProduct(selectedProductIdForDeletion.value)
    .then(() => {
      products.value = products.value.filter(
        (product) => product.id !== selectedProductIdForDeletion.value
      );
    })
    .catch(() => {
      hasRequestFailed.value = true;
    })
    .finally(() => {
      showNotification.value = true;
    });
};

const onDeleteProduct = (id: string) => {
  selectedProductIdForDeletion.value = id;
  showDeleteDialog.value = true;
};

onMounted(() => {
  loadTable();
});
</script>
