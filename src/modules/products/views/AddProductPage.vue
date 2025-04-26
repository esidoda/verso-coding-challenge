<template>
  <v-container class="main-container">
    <TitleBar title="Products" :show-back-button="true" back-route="products" />
    <v-card class="pa-6 mt-10">
      <ProductForm @save="createNewProduct" />
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import TitleBar from "@/components/TitleBar.vue";
import ProductForm from "../components/ProductForm.vue";
import { type NewProduct } from "../types.products";
import { ref } from "vue";
import { addProduct } from "../services.products";
import { useNotificationStore } from "@/stores/notificationStore";
import { NOTIFICATION_TYPE } from "@/types";
import { useRouter } from "vue-router";

const router = useRouter();
const notificationStore = useNotificationStore();

const isCreatingProduct = ref(false);
const createNewProduct = (product: NewProduct) => {
  product.createdAt = new Date().toISOString();
  isCreatingProduct.value = true;
  addProduct(product)
    .then(() => {
      notificationStore.showNotification(NOTIFICATION_TYPE.SUCCESS);
      router.push({ name: "products" });
    })
    .catch(() => {
      notificationStore.showNotification(NOTIFICATION_TYPE.ERROR);
    })
    .finally(() => {
      isCreatingProduct.value = false;
    });
};
</script>

<style lang="scss" scoped></style>
