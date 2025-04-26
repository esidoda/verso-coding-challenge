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
import DataTable from "@/components/DataTable.vue";
import ConfirmationDialog from "@/components/ConfirmationDialog.vue";
import { onMounted, ref } from "vue";
import type { Product } from "../types.products";
import { deleteProduct, getProducts } from "../services.products";
import { NOTIFICATION_TYPE, type TableHeader } from "@/types";
import { useNotificationStore } from "@/stores/notificationStore";
import { useUtils } from "@/composables/useUtils";

const isLoading = ref(false);
const hasRequestFailed = ref(false);
const notificationStore = useNotificationStore();
const showDeleteDialog = ref(false);
const selectedProductIdForDeletion = ref<string | null>(null);

const products = ref<Product[]>([]);

const { sortByCreatedAtDesc } = useUtils();

const headers = [
  { title: "Name", value: "name" },
  { title: "Price (EUR)", value: "price", sortable: true },
  { title: "Actions", value: "actions", align: "end" },
] as TableHeader[];

const loadTable = () => {
  isLoading.value = true;
  getProducts()
    .then((response: Product[]) => {
      products.value = sortByCreatedAtDesc(response);
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
      notificationStore.showNotification(NOTIFICATION_TYPE.SUCCESS);
    })
    .catch(() => {
      notificationStore.showNotification(NOTIFICATION_TYPE.ERROR);
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
