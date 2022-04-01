<template>
  <div
    class="dt-cell dt-td"
  >
    <template v-if="`${col}` === 'selected'">
      <input type="checkbox" :checked="value" />
    </template>
    <template v-else>
      {{ value }}
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "DatatableTd"
})
</script>

<script setup lang="ts">
const props = defineProps<{
  col: any;
  value: any;
}>();
</script>
