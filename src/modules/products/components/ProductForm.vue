<template>
  <v-form ref="productForm" class="mt-4 max-w-600 mx-auto">
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
          ><template v-slot:append-inner> EUR</template></v-text-field
        >
      </v-col>
    </v-row>
    <v-row class="justify-center mb-4">
      <v-divider class="mt-6 mb-6" />
      <v-col cols="12"></v-col>
      <v-btn @click="submitForm()" color="primary" :loading="isSubmitting">
        Save
      </v-btn>
    </v-row>
  </v-form>
</template>

<script setup lang="ts">
import {
  createEmptyProduct,
  type NewProduct,
  type Product,
} from "../types.products";
import { ref, watch } from "vue";
import { useUtils } from "@/composables/useUtils";

const { isDefined, hasOnlyNumbers } = useUtils();

const product = ref<NewProduct | Product>(createEmptyProduct());
const productForm = ref<HTMLFormElement>();

const isSubmitting = ref<boolean>(false);

const props = defineProps<{
  existingProduct?: Product;
  isSaving?: boolean;
}>();

const emit = defineEmits<{
  (e: "save", product: NewProduct | Product): void;
}>();

const submitForm = async () => {
  if (productForm.value) {
    await productForm.value.validate();
    const isValid = productForm.value.isValid;
    if (isValid) {
      emit("save", product.value);
    }
  }
};

watch(
  () => props.existingProduct,
  (existingProduct) => {
    if (existingProduct) {
      product.value = { ...existingProduct };
    }
  },
  { immediate: true }
);

watch(
  () => props.isSaving,
  (value) => {
    isSubmitting.value = value;
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped></style>
