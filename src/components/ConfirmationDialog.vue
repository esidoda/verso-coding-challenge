<template>
  <v-dialog v-model="showDialog" max-width="600px">
    <v-card>
      <v-card-title class="px-6 pt-6">Confirmation Dialog</v-card-title>
      <v-card-text>
        <p>{{ title }}</p>
      </v-card-text>
      <v-card-actions class="pb-6">
        <v-btn text @click="cancel">Cancel</v-btn>
        <v-btn color="primary" @click="confirm">Yes, {{ actionText }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, defineEmits, watch } from "vue";

const props = defineProps<{
  title: string;
  actionText: string;
  modelValue: boolean;
}>();

const emit = defineEmits(["update:modelValue", "confirmed"]);

const showDialog = ref(props.modelValue);

watch(
  () => props.modelValue,
  (newValue) => {
    showDialog.value = newValue;
  },
  { immediate: true }
);

const cancel = () => {
  showDialog.value = false;
  emit("update:modelValue", false);
};

const confirm = () => {
  emit("confirmed");
  showDialog.value = false;
  emit("update:modelValue", false);
};
</script>
