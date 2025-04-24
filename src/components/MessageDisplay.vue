<template>
  <v-row>
    <v-col class="text-center">
      <div :class="messageClass" class="flex-container">
        <v-icon class="mr-2">{{ icon }}</v-icon>
        <span>{{ props.message }}</span>
      </div>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { computed, defineProps } from "vue";

// Define props for the component
const props = defineProps<{
  message: string;
  type: "error" | "info" | "success";
}>();

const icon = computed(() => {
  switch (props.type) {
    case "error":
      return "mdi-alert-circle";
    case "success":
      return "mdi-check-circle";
    case "info":
    default:
      return "mdi-information-outline";
  }
});

const messageClass = computed(() => {
  switch (props.type) {
    case "error":
      return "text-red";
    case "success":
      return "text-green";
    case "info":
    default:
      return "text-grey";
  }
});
</script>
