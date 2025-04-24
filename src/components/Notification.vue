<template>
    <v-snackbar
      v-model="isVisible"
      :timeout="2000"
      :color="snackbarColor"
      location="top"
      position="fixed"
      style="justify-content: flex-end"
    >
      <span>{{ message }}</span>
  
      <template v-slot:actions>
        <v-btn icon @click.stop="isVisible = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </template>
  
  <script setup lang="ts">
  import { ref, watch, computed } from "vue";
  
  const props = defineProps<{
    show: boolean;
    type: "success" | "error"; 
  }>();
  
  const isVisible = ref(false);

  const snackbarColor = computed(() => {
    return props.type === "error" ? "red" : "green"; 
  });
  watch(
    () => props.show,
    (value: boolean) => {
      isVisible.value = value;
    },
    { immediate: true }
  );
  
  const message = computed(() => {
    return props.type === "error"
      ? "Something went wrong. Please try again."
      : "Action was successful!";
  });
  </script>