<template>
  <v-form
    ref="orderForm"
    class="mt-4 max-w-600 mx-auto"
    @submit.prevent="submitForm"
  >
    <p class="pb-4 font-weight-bold">Order Details</p>

    <v-row>
      <v-col cols="12" class="py-1">
        <v-text-field
          v-model="order.orderNumber"
          label="Order Number"
          variant="outlined"
          density="compact"
          required
          :rules="[(input) => isDefined(input) || 'Order Number is required']"
        />
      </v-col>

      <v-col cols="12" md="6" class="py-1">
        <v-autocomplete
          v-model="selectedCustomerCompanyId"
          :items="availableCustomerCompanies"
          item-title="name"
          item-value="id"
          label="Customer Company"
          variant="outlined"
          density="compact"
          :rules="[(input) => isDefined(input) || 'Customer is required']"
        />
      </v-col>

      <v-col cols="12" md="6" class="py-1">
        <v-autocomplete
          v-model="selectedSupplierCompanyId"
          :items="availableSupplierCompanies"
          item-title="name"
          item-value="id"
          label="Supplier Company"
          variant="outlined"
          density="compact"
          :rules="[(input) => isDefined(input) || 'Supplier is required']"
        />
      </v-col>
    </v-row>

    <v-divider class="mt-4 mb-10" />

    <p class="pb-2 font-weight-bold">Order Items</p>
    <v-row>
      <v-col cols="12">
        <v-autocomplete
          ref="productAutocomplete"
          :items="products"
          variant="outlined"
          density="compact"
          :return-object="false"
          item-value="id"
          item-title="name"
          v-model="selectedProductId"
          label="Select Product"
          :rules="[
            () =>
              hasOrderItems || 'The order must contain at least one product',
          ]"
        ></v-autocomplete>
      </v-col>
    </v-row>
    <v-table density="compact" class="mt-10" v-if="hasOrderItems">
      <thead>
        <tr class="bg-surface-light">
          <th>Product</th>
          <th>Quantity</th>
          <th class="text-end">Price</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in orderItems"
          :key="index"
          class="order-item-row"
        >
          <td>
            <p class="pb-6">{{ item.product.name }}</p>
          </td>
          <td>
            <v-text-field
              v-model="item.quantity"
              type="number"
              density="compact"
              variant="outlined"
              min="1"
              :rules="[
                (input) => isDefined(input) || 'Quantity is required',
                (input) =>
                  hasOnlyNumbers(input) ||
                  input > 0 ||
                  'Quantity must be a positive number',
              ]"
              ref="productQuantity"
            ></v-text-field>
          </td>
          <td class="text-end">
            <p class="pb-6">{{ item.product.price }} EUR</p>
          </td>
          <td>
            <v-btn
              variant="text"
              @click="onRemoveOrderItem(index)"
              min-width="20"
              class="mb-6"
            >
              <v-icon>mdi-close</v-icon></v-btn
            >
          </td>
        </tr>
        <tr class="font-weight-bold">
          <td>Total</td>
          <td colspan="2" class="text-end">{{ totalAmount }} EUR</td>
        </tr>
      </tbody>
    </v-table>

    <v-row class="justify-center ma-0 mb-4">
      <v-divider class="mt-6 mb-6" />
      <v-col cols="12"></v-col>
      <v-btn @click="submitForm()" color="primary" :loading="isSubmitting">
        Save
      </v-btn>
    </v-row>
  </v-form>
</template>

<script setup lang="ts">
import { watch, ref, onMounted, computed } from "vue";
import {
  createEmptyOrder,
  type OrderItem,
  type Company,
  type Order,
  type NewOrder,
} from "../types.orders";
import { useUtils } from "@/composables/useUtils";
import { getCustomerCompanies, getSupplierCompanies } from "../services.orders";
import { getProducts } from "@/modules/products/services.products";
import type { Product } from "@/modules/products/types.products";

const order = ref<NewOrder | Order>(createEmptyOrder());
const orderForm = ref<HTMLFormElement>();
const orderItems = ref<OrderItem[]>([]);

const productAutocomplete = ref<HTMLFormElement>();
const productQuantity = ref<HTMLFormElement[]>([]);
const products = ref<Product[]>([]);
const selectedProductId = ref<string | null>(null);

const availableCustomerCompanies = ref<Company[]>([]);
const availableSupplierCompanies = ref<Company[]>([]);
const selectedCustomerCompanyId = ref<string | null>(null);
const selectedSupplierCompanyId = ref<string | null>(null);

const isSubmitting = ref<boolean>(false);

const emit = defineEmits<{
  (e: "save", order: NewOrder | Order): void;
}>();

const props = defineProps<{
  existingOrder?: Order;
  isSaving: boolean;
}>();

const { isDefined, hasOnlyNumbers } = useUtils();

const loadCustomerCompanies = () => {
  getCustomerCompanies().then((companies) => {
    availableCustomerCompanies.value = companies;
  });
};

const loadSupplierCompanies = () => {
  getSupplierCompanies().then((companies) => {
    availableSupplierCompanies.value = companies;
  });
};

const loadProducts = () => {
  getProducts().then((response) => {
    products.value = response;
  });
};

onMounted(() => {
  loadCustomerCompanies();
  loadSupplierCompanies();
  loadProducts();
});

const hasOrderItems = computed(() => {
  return orderItems.value.length > 0;
});

const totalAmount = computed(() => {
  return orderItems.value.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);
});

const onRemoveOrderItem = (index: number) => {
  const removedItem = orderItems.value[index];
  products.value.push(removedItem.product);
  orderItems.value.splice(index, 1);
};

watch(
  () => selectedProductId.value,
  (id) => {
    if (!id) return;

    const product = products.value.find((product) => product.id === id);
    if (!product) return;

    orderItems.value.push({
      product,
      quantity: 1,
    });

    products.value = products.value.filter((product) => product.id !== id);
    selectedProductId.value = null;
    productAutocomplete.value?.reset();
    productAutocomplete.value?.blur();
  }
);

const prepareOrder = () => {
  const customerCompany = availableCustomerCompanies.value.find(
    (company) => company.id === selectedCustomerCompanyId.value
  );
  if (customerCompany) order.value.customerCompany = customerCompany;

  const supplierCompany = availableSupplierCompanies.value.find(
    (company) => company.id === selectedSupplierCompanyId.value
  );
  if (supplierCompany) order.value.supplierCompany = supplierCompany;

  order.value.orderItems = orderItems.value;
  order.value.totalAmount = totalAmount.value;
};

const submitForm = () => {
  if (orderForm.value) {
    orderForm.value.validate();
    const isProductQuantityValid = productQuantity.value?.every((input) => {
      input.validate();
      return input.isValid;
    });
    if (orderForm.value.isValid && isProductQuantityValid) {
      prepareOrder();
      emit("save", order.value);
    }
  }
};

watch(
  () => props.existingOrder,
  (existingOrder) => {
    if (existingOrder) {
      order.value = { ...existingOrder };
      orderItems.value = existingOrder.orderItems;
      selectedCustomerCompanyId.value = existingOrder.customerCompany.id;
      selectedSupplierCompanyId.value = existingOrder.supplierCompany.id;
      products.value = products.value.filter(
        (product) =>
          !existingOrder.orderItems.some(
            (item) => item.product.id === product.id
          )
      );
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

<style lang="scss" scoped>
.order-item-row {
  height: 100px;
}
</style>
