<template>
  <section class="dt-group">
    <header class="dt-group-header">
      <div class="dt-group-bg dt-group-select">
        <input type="checkbox"/>
      </div>
      <div class="dt-group-bg dt-group-name">
        Company A
      </div>
      <div class="dt-group-bg dt-group-action">
        <button @click="collapsed = !collapsed">collapse</button>
      </div>
    </header>
    <div class="dt-group-body" v-if="collapsed">
      <div class="dt-row" v-for="row in rows">
          <DatatableCell
            v-for="(value, key, index) in row"
            :key="`${key}-${index}`"
            :th="false"
            :value="value"
            :col="key"
          />
        </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "DatatableGroup"
})
</script>

<script setup lang="ts">
import { ref } from "vue";
import { IDatatableRow } from "../types";
import DatatableCell from "./DatatableCell.vue";

const props = defineProps<{
  name: string,
  rows: IDatatableRow[];
}>();

const collapsed = ref(true);
</script>

<style lang="scss" scoped>
@import "../datatable";

.dt-group {
  display: contents;
  &-header,
  &-body {
    display: contents
  }
  &-body :deep(.dt-row) {
    &:nth-child(even) .dt-td {
      background: $row-alt-bg;
    }
  }
  &-bg {
    background: $group-head-bg;
    padding: $cell-pad-y 0;
  }
  &-select {
    grid-column: 1 / 2;
    position: sticky;
    left: 0;
  }
  &-name {
    color: black;
    font-weight: 700;
    grid-column: 2 / -2;
    padding-left: 1rem;
    text-align: left;
    position: sticky;
    left: 49px;
  }
  &-action {
    grid-column: -1 / -2;
    text-align: right;
    position: sticky;
    right: 0;
    padding-right: $cell-pad-x;
  }
}
</style>
