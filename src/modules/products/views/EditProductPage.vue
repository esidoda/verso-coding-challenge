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

    <Notification
      v-if="showNotification"
      :show="showNotification"
      :type="isSuccess ? 'success' : 'error'"
    />
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import TitleBar from "@/components/TitleBar.vue";
import Notification from "@/components/Notification.vue";
import ProductForm from "../components/ProductForm.vue";
import { type NewProduct, type Product } from "../types.products";
import { getProduct, updateProduct } from "../services.products";

const existingProduct = ref<Product>();
const isUpdatingProduct = ref(false);
const showNotification = ref(false);
const isSuccess = ref(false);
const route = useRoute();
const router = useRouter();

const loadProduct = (productId: string) => {
  getProduct(productId)
    .then((fetchedProduct) => {
      existingProduct.value = fetchedProduct;
    })
    .catch((error) => {
      console.error("Error fetching product:", error);
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
      isSuccess.value = true;
      router.push({ name: "products" });
    })
    .catch(() => {
      isSuccess.value = false;
    })
    .finally(() => {
      isUpdatingProduct.value = false;
      showNotification.value = true;
    });
};
</script>
