<template>
  <div class="appbar-container">
    <v-icon v-if="showBackButton" class="back-arrow" @click="navigateBack">
      mdi-arrow-left
    </v-icon>
    <div class="text-h5">{{ title }}</div>
  </div>
  <v-divider></v-divider>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const props = defineProps<{
  title: string;
  showBackButton?: boolean;
  backRoute?: string;
}>();

const router = useRouter();

const navigateBack = () => {
  if (!props.showBackButton) return;
  router.push({ name: props.backRoute });
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
