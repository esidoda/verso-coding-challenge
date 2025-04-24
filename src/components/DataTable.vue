<template>
  <div>
    <v-row class="mt-2 align-center mb-4">
      <v-col
        cols="12"
        md="3"
        class="d-flex justify-end order-1 order-md-2 py-0"
      >
        <v-btn
          v-if="addButtonText && addButtonRoute"
          color="primary"
          density="default"
          @click="onAddButtonClick"
        >
          {{ addButtonText }}
        </v-btn>
      </v-col>
      <v-col cols="12" md="9" class="order-2 order-md-1">
        <v-text-field
          v-model="search"
          :label="searchLabel"
          append-inner-icon="mdi-magnify"
          clearable
          density="compact"
          variant="outlined"
          hide-details
          :disabled="hasRequestFailed"
        />
      </v-col>
    </v-row>

    <MessageDisplay
      v-if="hasRequestFailed"
      :message="`An error occurred while fetching the data.`"
      :type="'error'"
    />

    <v-data-table
      :items="items"
      :headers="headers"
      :search="search"
      :loading="isLoading"
    >
      <template v-slot:item="{ item }">
        <tr>
          <td v-for="header in headers" :key="header.value">
            <span v-if="item[header.value]">{{ item[header.value] }}</span>
            <div
              class="d-flex align-end justify-end"
              v-else-if="header.value === 'actions'"
            >
              <v-btn variant="text" small @click="onEditButtonClick(item)">
                <v-icon dark>mdi-pencil</v-icon>
              </v-btn>

              <v-btn variant="text" small @click="onDeleteButtonClick(item)">
                <v-icon dark>mdi-delete</v-icon>
              </v-btn>
            </div>
          </td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import MessageDisplay from "./MessageDisplay.vue";

const props = defineProps<{
  isLoading: boolean;
  hasRequestFailed: boolean;
  items: any[];
  headers: any[];
  searchLabel: string;
  addButtonText: string;
  addButtonRoute: string;
  editButtonRoute: string;
}>();

const router = useRouter();
const search = ref("");

const emit = defineEmits<{
  (event: "delete-item", id: string): void;
}>();

const onAddButtonClick = () => {
  if (props.addButtonRoute) {
    router.push({
      name: props.addButtonRoute,
    });
  }
};

const onEditButtonClick = (item: any) => {
  router.push({
    path: `${props.editButtonRoute}/${item.id}`,
  });
};

const onDeleteButtonClick = (item: any) => {
  emit("delete-item", item.id);
};
</script>
