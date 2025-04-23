<template>
  <div class="appbar-container">
    <v-icon class="back-arrow" @click="navigateBack"> mdi-arrow-left </v-icon>
    <div class="text-h5">{{ title }}</div>
  </div>
  <v-divider></v-divider>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { useRouter } from "vue-router";

const props = defineProps<{
  title: string;
  backRoute: string;
}>();

const router = useRouter();

// Function to handle navigation back
const navigateBack = () => {
  if (props.backRoute) {
    router.push(props.backRoute);
  } else {
    router.back();
  }
};
</script>

<style lang="scss">
.appbar-container {
  display: flex;
  align-items: center;
  padding-bottom: 12px;
  padding-top: 12px;

  &.status-indicator {
    justify-content: space-between;
  }
}

.back-arrow {
  cursor: pointer;
  margin-right: 16px;
}

.appbar-title {
  text-align: left;
  padding-left: 16px;
}
</style>
