<template>
  <div class="dt-row">
    <div
      v-for="(value, key, index) in row"
      :key="`${key}-${index}`"
      class="dt-td"
    >
      <template v-if="`${key}` === 'selected'">
        <input type="checkbox" :checked="value" />
      </template>
      <template v-else>
        {{ value }}
      </template>
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
import { IDatatableRow } from "../types";

const props = defineProps<{
  row: IDatatableRow;
}>();
</script>

<style lang="scss" scoped>
.dt-row {

}
</style>
