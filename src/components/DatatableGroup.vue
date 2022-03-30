<template>
  <section class="dt-group">
    <header class="dt-group-header">
      <div class="dt-group-bg dt-group-select">
        <input type="checkbox"/>
      </div>
      <div class="dt-group-bg dt-group-name">
        Company A
      </div>
      <div class="dt-group-bg">
        <button @click="collapsed = !collapsed">collapse</button>
      </div>
    </header>
    <div class="dt-group-body" v-if="collapsed">
      <DatatableRow v-for="row in rows" :row="row" />
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
import { IDatatableRow } from "./types";
import DatatableRow from "./DatatableRow.vue";
import { ref } from "vue";

const props = defineProps<{
  name: string,
  rows: IDatatableRow[];
}>();

const collapsed = ref(true);
</script>

