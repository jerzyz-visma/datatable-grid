<template>
  <div class="dt-head">
    <div class="dt-row">
      <DatatableTh
        v-for="column in columns"
        :column="column"
        @resize="emitResize"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "DatatableHead",
})
</script>

<script setup lang="ts">
import { inject } from "vue";
import { IDatatableColumn, IResizeEvent } from "../types";
import DatatableTh from "./DatatableTh.vue";

const columns: IDatatableColumn[] | undefined = inject("columns");

const emit = defineEmits({
  'resize' (payload) {
    return !!payload;
  }
});

const emitResize = (e: IResizeEvent) => {
  emit('resize', e);
}
</script>

