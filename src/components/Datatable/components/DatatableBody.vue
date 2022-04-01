<template>
  <div class="dt-body">
    <DatatableGroup
      name="Company 1"
      :rows="rows"
      :collapse="false"
    />

<!--    <DatatableRow v-for="row in rows" :row="row" />-->
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "DatatableBody"
})
</script>

<script setup lang="ts">
import { IDatatableColumn, IDatatableRow } from "../types";
import DatatableGroup from "./DatatableGroup.vue";

const props = defineProps<{
  columns: IDatatableColumn[];
  rows: IDatatableRow[];
}>();
</script>

<style lang="scss" scoped>
  .dt-body {
    display: contents;
  }
</style>
