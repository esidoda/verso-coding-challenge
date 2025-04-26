<template>
  <v-snackbar
    v-model="show"
    :timeout="2000"
    :color="snackbarColor"
    location="top"
    position="fixed"
    style="justify-content: flex-end"
  >
    <span>{{ message }}</span>

    <template v-slot:actions>
      <v-btn icon @click.stop="onClose">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { useNotificationStore } from "@/stores/notificationStore";
import { NOTIFICATION_TYPE } from "@/types";

const store = useNotificationStore();
const { show, type } = storeToRefs(store);

const snackbarColor = computed(() => {
  switch (type.value) {
    case NOTIFICATION_TYPE.SUCCESS:
      return "green";
    case NOTIFICATION_TYPE.ERROR:
      return "red";
    case NOTIFICATION_TYPE.WARNING:
      return "orange";
    default:
      return "grey";
  }
});
const message = computed(() => {
  switch (type.value) {
    case NOTIFICATION_TYPE.ERROR:
      return "Something went wrong. Please try again.";
    case NOTIFICATION_TYPE.SUCCESS:
      return "Your changes have been saved successfully";
    case NOTIFICATION_TYPE.WARNING:
      return "Please verify your details before continuing.";
    default:
      return "Notification received.";
  }
});
const onClose = () => {
  store.hideNotification();
};
</script>
