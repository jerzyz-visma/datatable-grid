<template>
  <main class="dt">
    <h1>{{ title }}</h1>
    <div
      ref="gridRef"
      class="dt-grid">
      <DatatableHead @resize="initResize" />
      <DatatableBody :columns="columns" :rows="rows" />
      <div class="dt-footer">
        Footer
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Datatable"
})
</script>

<script setup lang="ts">
import DatatableHead from "./DatatableHead.vue";
import DatatableBody from "./DatatableBody.vue";
import { IDatatableColumn, IDatatableRow, IColumnSize, IResizeEvent } from "./types";
import { onMounted, provide, ref } from "vue";

const props = defineProps<{
  title: string;
  columns: IDatatableColumn[];
  rows: IDatatableRow[];
}>();

provide("columns", props.columns);

const gridRef = ref<HTMLElement | null>(null);
const thRefs = ref<NodeListOf<HTMLElement>>();
const columnsSize = ref<IColumnSize[] | null>(null);

const minColWidth = 120;
const columnTypeToRatioMap: Record<string, number> = {
  "checkbox": 1,
  "numeric": 1,
  "text-short": 1.67,
  "text-long": 3.33,
}

onMounted(() => {
  thRefs.value =  gridRef.value?.querySelectorAll('.dt-th')

  columnsSize.value = props.columns.map((col: IDatatableColumn, index) => (
    {
      th: thRefs.value[index],
      size: `minmax(${minColWidth}px, ${columnTypeToRatioMap[col.config.type] + 'fr'})`
    }
  ))

  gridRef.value.style.gridTemplateColumns =  gridSize(columnsSize.value)
})

const gridSize = (columnsSize: IColumnSize[]) => {
  return columnsSize
    .map(({ size }) => size)
    .join(' ');
}

// Resizing columns
const resizedHeader = ref();

const initResize = (e: IResizeEvent) => {
  resizedHeader.value = e.thRef;
  resizedHeader.value.classList.add('active-resize');
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseup', onMouseUp);
}

const onMouseMove = (e: MouseEvent) => {
  // Calculate the desired width
  const horizontalScrollOffset = document.documentElement.scrollLeft;
  const width = (horizontalScrollOffset + e.clientX - gridRef.value?.offsetLeft) - resizedHeader.value?.offsetLeft;

  // Update the column object with the new size value
  const resizedColumn = columnsSize.value!.find(({ th }) => th === resizedHeader.value);
  resizedColumn!.size = `${Math.max(minColWidth, width)}px`;

  // For other th which don't have a set width, fix it to their computed width
  columnsSize.value!.forEach((column: IColumnSize) => {
    if (column.size.startsWith('minmax')) {
      // isn't fixed yet it would be a pixel value otherwise
      column.size = `${column.th.clientWidth}px`;
    }
  })

  // Make last column take remaining space
  const tableWidth = gridRef.value.offsetWidth;
  const colsWidthSum = [...thRefs.value]
    .reduce((accumulator: number, col: HTMLElement) => accumulator + col.offsetWidth, 0);

  if (colsWidthSum < tableWidth) {
    const lastColumnSize = columnsSize.value![columnsSize.value.length - 1].size;
    const availableSpace = tableWidth - colsWidthSum - 2;

    columnsSize.value![columnsSize.value.length - 1].size = `${parseInt(lastColumnSize) + availableSpace}px`
  }

  gridRef.value.style.gridTemplateColumns =  gridSize(columnsSize.value)
}

const onMouseUp = () => {
  window.removeEventListener('mousemove', onMouseMove);
  window.removeEventListener('mouseup', onMouseUp);
  resizedHeader.value.classList.remove('active-resize');
  resizedHeader.value = null;
}
</script>

<style lang="scss">
@import "datatable";
</style>
