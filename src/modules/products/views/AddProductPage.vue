<template>
  <v-container class="main-container">
    <TitleBar title="Products" :show-back-button="true" back-route="products" />
    <v-card class="pa-6 mt-10">
      <v-form ref="newProductForm" class="mt-4 max-w-600 mx-auto">
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="newProduct.name"
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
              v-model="newProduct.description"
              label="Description"
              variant="outlined"
              density="compact"
            ></v-textarea>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="newProduct.price"
              label="Price"
              variant="outlined"
              density="compact"
              required
              :rules="[
                (input) => isDefined(input) || 'Price is required',
                (input) => hasOnlyNumbers(input) || 'Price must be a number',
              ]"
              ><template v-slot:prepend-inner>
                <v-icon size="18" icon="mdi-currency-eur" /> </template
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="justify-center mb-4">
          <v-divider class="mt-6 mb-6" />
          <v-col cols="12"></v-col>
          <v-btn
            @click="createNewProduct()"
            :disabled="isCreatingProduct"
            :loading="isCreatingProduct"
            color="primary"
          >
            Add Product
          </v-btn>
        </v-row>
      </v-form></v-card
    >

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
import { createEmptyProduct, type NewProduct } from "../types.products";
import { nextTick, ref } from "vue";
import { useUtils } from "@/composables/useUtils";
import { addProduct } from "../services.products";
import { useRouter } from "vue-router";

const { isDefined, hasOnlyNumbers } = useUtils();
const router = useRouter();

const newProduct = ref<NewProduct>(createEmptyProduct());
const newProductForm = ref<HTMLFormElement>();
const isCreatingProduct = ref(false);
const showNotification = ref(false);
const isSuccess = ref(false);

const createNewProduct = () => {
  if (newProductForm.value) {
    newProductForm.value.validate();

    if (newProductForm.value.isValid) {
      newProduct.value.createdAt = new Date();
      isCreatingProduct.value = true;
      addProduct(newProduct.value)
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
    }
  }
};
</script>

<style lang="scss" scoped></style>
