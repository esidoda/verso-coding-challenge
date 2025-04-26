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
      v-else
      :items="items"
      :headers="headers"
      :search="search"
      :loading="isLoading"
      :show-expand="isExpandable"
    >
      <!-- Expandable Button Slot -->
      <template
        v-slot:item.data-table-expand="{
          internalItem,
          isExpanded,
          toggleExpand,
        }"
      >
        <v-btn
          :append-icon="
            isExpanded(internalItem) ? 'mdi-chevron-up' : 'mdi-chevron-down'
          "
          :text="isExpanded(internalItem) ? 'Collapse' : 'Expand'"
          class="text-none"
          color="medium-emphasis"
          size="small"
          variant="text"
          slim
          @click="toggleExpand(internalItem)"
        ></v-btn>
      </template>

      <!-- Expanded Row Slot -->
      <template v-slot:expanded-row="{ columns, item }">
        <tr>
          <td :colspan="columns.length" class="py-2">
            <v-sheet rounded="lg">
              <v-table density="compact">
                <thead>
                  <tr class="bg-surface-light">
                    <th v-for="header in expandableHeaders" :key="header.value">
                      {{ header.title }}
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <template v-if="expandableProperty">
                    <tr
                      v-for="(expandableItem, index) in item[expandableProperty as keyof Entity]"
                      :key="index"
                    >
                      <td
                        v-for="header in expandableHeaders"
                        :key="header.value"
                      >
                        <template
                          v-if="header.valueLevelOne && !header.valueLevelTwo"
                        >
                          {{
                            getNestedProperty(
                              (expandableItem as unknown as Record<string, any>),
                              header.valueLevelOne
                            )
                          }}
                        </template>

                        <template
                          v-if="header.valueLevelOne && header.valueLevelTwo"
                        >
                          {{
                            getNestedProperty(
                              (expandableItem as unknown as Record<string, any>),
                              header.valueLevelOne,
                              header.valueLevelTwo
                            )
                          }}
                        </template>
                      </td>
                    </tr>
                  </template>
                </tbody>
              </v-table>
            </v-sheet>
          </td>
        </tr>
      </template>
      <template v-slot:item.actions="{ item }">
        <div class="d-flex ga-2 justify-end">
          <v-btn
            variant="text"
            small
            @click="onEditButtonClick(item)"
            class="px-1"
            min-width="20"
          >
            <v-icon dark>mdi-pencil</v-icon>
          </v-btn>

          <v-btn
            variant="text"
            small
            @click="onDeleteButtonClick(item)"
            class="px-1"
            min-width="20"
            e2e-id="delete-button"
          >
            <v-icon dark>mdi-delete</v-icon>
          </v-btn>
        </div>
      </template>
    </v-data-table>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import MessageDisplay from "./MessageDisplay.vue";
import type { TableHeader } from "@/types";
import type { Order } from "@/modules/orders/types.orders";
import type { Product } from "@/modules/products/types.products";
import { useUtils } from "@/composables/useUtils";

const props = defineProps<{
  isLoading: boolean;
  hasRequestFailed: boolean;
  items: Entity[];
  headers: TableHeader[];
  expandableHeaders?: TableHeader[];
  searchLabel: string;
  addButtonText: string;
  addButtonRoute: string;
  editButtonRoute: string;
  isExpandable?: boolean;
  expandableProperty?: string;
  collapseText?: string;
}>();

type Entity = Order | Product;

const { getNestedProperty } = useUtils();

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
