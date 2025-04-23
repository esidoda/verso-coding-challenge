<template>
  <v-navigation-drawer v-if="!mobile" app permanent>
    <div class="mt-4">
      <v-col cols="12" class="font-weight-bold">VERSO System Management</v-col>
      <v-col cols="12" v-for="(item, index) in menuItems" :key="index">
        <router-link
          :to="{ name: item.link }"
          class="d-flex items-center justify-start ga-4 mx-4"
        >
          <v-icon size="22" :color="item.isActive ? '#646cff' : 'grey'">
            {{ item.icon }}
          </v-icon>
          <span class="navigation-title" :class="{ active: item.isActive }">
            {{ item.title }}
          </span>
        </router-link>
      </v-col>
    </div>
  </v-navigation-drawer>

  <v-bottom-navigation v-if="mobile" app height="64">
    <v-btn
      v-for="(item, index) in menuItems"
      :key="index"
      :to="{ name: item.link }"
      icon
      :color="item.isActive ? '#646cff' : 'grey'"
    >
      <v-icon :color="item.isActive ? '#646cff' : 'grey'">
        {{ item.icon }}
      </v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useDisplay } from "vuetify";

const route = useRoute();
const { mobile } = useDisplay();

const isItemActive = (item: string) => {
  return route.path.includes(item);
};

const menuItems = computed(() => [
  {
    icon: "mdi mdi-cart",
    title: "Orders",
    link: "orders",
    isActive: isItemActive("order"),
  },
  {
    icon: "mdi mdi-package-variant",
    title: "Products",
    link: "products",
    isActive: isItemActive("product"),
  },
]);
</script>

<style scoped lang="scss">
.navigation-title {
  color: grey;

  &.active {
    color: #646cff;
  }
}

:deep(.v-bottom-navigation .v-bottom-navigation__content > .v-btn) {
  background-color: transparent;
}
</style>
