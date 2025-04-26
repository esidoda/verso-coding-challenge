<template>
  <v-container class="main-container">
    <TitleBar
      title="Edit Product"
      :show-back-button="true"
      back-route="products"
    />
    <v-card class="pa-6 mt-10">
      <ProductForm
        @save="updateExistingProduct"
        :existing-product="existingProduct"
        :is-saving="isUpdatingProduct"
      />
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import TitleBar from "@/components/TitleBar.vue";
import ProductForm from "../components/ProductForm.vue";
import { type NewProduct, type Product } from "../types.products";
import { getProduct, updateProduct } from "../services.products";
import { NOTIFICATION_TYPE } from "@/types";
import { useNotificationStore } from "@/stores/notificationStore";

const existingProduct = ref<Product>();
const isUpdatingProduct = ref(false);
const route = useRoute();
const router = useRouter();
const notificationStore = useNotificationStore();

const loadProduct = (productId: string) => {
  getProduct(productId)
    .then((fetchedProduct) => {
      existingProduct.value = fetchedProduct;
    })
    .catch(() => {
      notificationStore.showNotification(NOTIFICATION_TYPE.ERROR);
    });
};

onMounted(() => {
  const productId = route.params.id as string;
  loadProduct(productId);
});

const updateExistingProduct = (productData: Product | NewProduct) => {
  const product = productData as Product;
  product.updatedAt = new Date().toISOString();
  isUpdatingProduct.value = true;
  updateProduct(product)
    .then(() => {
      router.push({ name: "products" });
      notificationStore.showNotification(NOTIFICATION_TYPE.SUCCESS);
    })
    .catch(() => {
      notificationStore.showNotification(NOTIFICATION_TYPE.ERROR);
    })
    .finally(() => {
      isUpdatingProduct.value = false;
    });
};
</script>
