<template>
  <div
    ref="thRef"
    class="dt-cell dt-th"
  >
    {{ column.title }}
    <span
      v-if="column.config.resizable"
      class="resize-handle"
      @mousedown="emitResize()"
    />
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
import { IDatatableColumn } from "../types";

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

<style lang="scss" scoped>
@import "../datatable";

.dt-th {
  background: $thead-bg;
  color: white;
  font-weight: 700;
  position: relative;
  &.active-resize {
    background: $resize-active-bg;
  }
}

.resize-handle {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  background: $resize-active-handle;
  opacity: 0;
  width: 5px;
  cursor: col-resize;
  z-index: 10;
  overflow: hidden;
  &:hover {
    background: $resize-active-handle;
    opacity: .7;
  }
}
</style>
