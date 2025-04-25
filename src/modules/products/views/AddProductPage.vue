<template>
  <v-container class="main-container">
    <TitleBar title="Products" :show-back-button="true" back-route="products" />
    <v-card class="pa-6 mt-10">
      <ProductForm @save="createNewProduct" />
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
import ProductForm from "../components/ProductForm.vue";
import { type NewProduct } from "../types.products";
import { nextTick, ref } from "vue";
import { addProduct } from "../services.products";
import { useRouter } from "vue-router";

const router = useRouter();

const isCreatingProduct = ref(false);
const showNotification = ref(false);
const isSuccess = ref(false);

const createNewProduct = (product: NewProduct) => {
  product.createdAt = new Date();
  isCreatingProduct.value = true;
  addProduct(product)
    .then(() => {
      isSuccess.value = true;
      nextTick(() => {
        router.push({ name: "products" });
      });
    })
    .catch(() => {
      isSuccess.value = false;
    })
    .finally(() => {
      isCreatingProduct.value = false;
      showNotification.value = true;
    });
};
</script>

<style lang="scss" scoped></style>
