<template>
  <v-container class="main-container">
    <TitleBar
      title="Edit Product"
      :show-back-button="true"
      back-route="products"
    />
    <v-card class="pa-6 mt-10">
      <v-form
        ref="editProductForm"
        class="mt-4 max-w-600 mx-auto"
        v-if="product"
      >
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="product.name"
              label="Name"
              variant="outlined"
              density="compact"
              required
              :rules="[(input) => isDefined(input) || 'Name is required']"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-textarea
              v-model="product.description"
              label="Description"
              variant="outlined"
              density="compact"
            ></v-textarea>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="product.price"
              label="Price"
              variant="outlined"
              density="compact"
              required
              :rules="[
                (input) => isDefined(input) || 'Price is required',
                (input) => hasOnlyNumbers(input) || 'Price must be a number',
              ]"
            >
              <template v-slot:prepend-inner>
                <v-icon size="18" icon="mdi-currency-eur" />
              </template>
            </v-text-field>
          </v-col>
        </v-row>
        <v-row class="justify-center mb-4">
          <v-divider class="mt-6 mb-6" />
          <v-col cols="12"></v-col>
          <v-btn
            @click="updateExistingProduct()"
            :disabled="isUpdatingProduct"
            :loading="isUpdatingProduct"
            color="primary"
          >
            Update Product
          </v-btn>
        </v-row>
      </v-form>
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
import { type Product } from "../types.products";
import { useUtils } from "@/composables/useUtils";
import { getProduct, updateProduct } from "../services.products";

const { isDefined, hasOnlyNumbers } = useUtils();

const product = ref<Product>();
const editProductForm = ref<HTMLFormElement>();
const isUpdatingProduct = ref(false);
const showNotification = ref(false);
const isSuccess = ref(false);
const route = useRoute();
const router = useRouter();

const loadProduct = (productId: string) => {
  getProduct(productId)
    .then((fetchedProduct) => {
      product.value = fetchedProduct;
    })
    .catch((error) => {
      console.error("Error fetching product:", error);
    });
};

onMounted(() => {
  const productId = route.params.id as string;
  loadProduct(productId);
});

const updateExistingProduct = () => {
  if (editProductForm.value) {
    editProductForm.value.validate();

    if (editProductForm.value.isValid && product.value) {
      product.value.updatedAt = new Date();
      isUpdatingProduct.value = true;
      updateProduct(product.value)
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
    }
  }
};
</script>
