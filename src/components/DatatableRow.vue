<template>
  <div class="dt-row">
    <div
      v-for="(value, key, index) in row"
      :key="`${key}-${index}`"
      class="dt-cell"
    >
      <div v-if="key === 'selected'">
        <input type="checkbox"/>
      </div>
      <div v-else>
        {{ value }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "DatatableRow"
})
</script>

<script setup lang="ts">
import { DatatableRow } from "./types";

const props = defineProps<{
  row: DatatableRow;
}>();
</script>
