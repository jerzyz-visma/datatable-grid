<template>
  <div
    ref="thRef"
    class="dt-th"
  >
    {{ column.title }}
    <span class="resize-handle" @mousedown="emitResize($event)" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "DatatableTh"
})
</script>

<script setup lang="ts">
import { ref } from "vue";
import { IDatatableColumn } from "./types";

const thRef = ref<HTMLElement | null>(null);

const props = defineProps<{
  column: IDatatableColumn;
}>();

const emit = defineEmits({
  'resize' (payload) {
    return !!payload.ref;
  }
});

const emitResize = () => {
  emit('resize', {
    thRef: thRef.value
  });
}
</script>
