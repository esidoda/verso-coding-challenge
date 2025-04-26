// stores/notificationStore.ts
import { NOTIFICATION_TYPE } from "@/types";
import { defineStore } from "pinia";

export const useNotificationStore = defineStore("notification", {
  state: () => ({
    show: false,
    type: NOTIFICATION_TYPE.INFO,
  }),
  actions: {
    showNotification(type = NOTIFICATION_TYPE.SUCCESS) {
      this.type = type;
      this.show = true;
    },
    hideNotification() {
      this.show = false;
    },
  }
});