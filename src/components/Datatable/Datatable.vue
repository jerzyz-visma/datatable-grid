<template>
  <main class="dt">
    <h1>{{ title }}</h1>
    <div
      ref="gridRef"
      class="dt-grid">
      <DatatableHead @resize="initResize" />
      <DatatableBody
        :columns="columns"
        :rows="rows"
      />
      <div class="dt-footer">
        Total rows: {{ datatableStore.rowsCount }}
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
import { useDatatableStore } from "../../stores/DatatableStore";
import DatatableHead from "./components/DatatableHead.vue";
import DatatableBody from "./components/DatatableBody.vue";

import { IDatatableColumn, IColumnSize, IResizeEvent } from "./types";
import { onMounted, provide, ref } from "vue";
import { storeToRefs } from "pinia";


const datatableStore = useDatatableStore();
const { title, columns, rows } = storeToRefs(useDatatableStore());

datatableStore.fetchRows()

provide("columns", columns);

const gridRef = ref<HTMLElement | null>(null);
const thRefs = ref<HTMLElement[] | null>(null);
const columnsSize = ref<IColumnSize[] | null>(null);

const minColWidth = 50;
const columnTypeToRatioMap: Record<string, string> = {
  "checkbox": "50px",
  "numeric": "100px",
  "text-short": "1.67fr",
  "text-long": "3.33fr",
}

onMounted(() => {
  thRefs.value =  gridRef.value!.getElementsByClassName('dt-th') as any

  // Set default minmax size based on column's config type
  columnsSize.value = columns.value.map((col: IDatatableColumn, index: number) => (
    {
      th: thRefs.value?.[index],
      size: `minmax(${minColWidth}px, ${columnTypeToRatioMap[col.config.type]})`
    }
  ))
  gridRef.value!.style.gridTemplateColumns = gridSize(columnsSize.value)
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
  if (!gridRef.value) return false

  const horizontalScrollOffset = document.documentElement.scrollLeft;
  const width = (horizontalScrollOffset + e.clientX - gridRef.value?.offsetLeft) - resizedHeader.value?.offsetLeft;

  // Update the column object with the new size value
  const resizedColumn = columnsSize.value!.find(({ th }) => th === resizedHeader.value);
  resizedColumn!.size = `${Math.max(minColWidth, width)}px`;

  // For other th which don't have a set width, fix it to their computed width
  columnsSize.value!.forEach((column: IColumnSize) => {
    if (column.th && column.size.startsWith('minmax') ) {
      // isn't fixed yet it would be a pixel value otherwise
      column.size = `${column.th.clientWidth}px`;
    }
  })

  // Make last column take remaining space
  const tableWidth = gridRef!.value.offsetWidth;
  const colsWidthSum = [].slice.call(thRefs.value)
    .reduce((accumulator: number, col: HTMLElement) => accumulator + col.offsetWidth, 0);

  if (colsWidthSum < tableWidth) {
    const lastColumnSize = columnsSize.value![columnsSize.value!.length - 1].size;
    const availableSpace = tableWidth - colsWidthSum - 2;

    columnsSize.value![columnsSize.value!.length - 1].size = `${parseInt(lastColumnSize) + availableSpace}px`
  }

  gridRef.value.style.gridTemplateColumns =  gridSize(columnsSize.value!)
}

const onMouseUp = () => {
  window.removeEventListener('mousemove', onMouseMove);
  window.removeEventListener('mouseup', onMouseUp);
  resizedHeader.value.classList.remove('active-resize');
  resizedHeader.value = null;
}
</script>

<style lang="scss" scoped>
@import "datatable";

.dt {
  max-width: 1280px;
  margin: 0 auto;
  &-grid {
    border: 1px solid $border-color;
    display: grid;
    overflow-x: auto;
    position: relative;
    grid-template-columns:
    repeat(7, minmax($min-col-width, 1fr));
  }

  &-footer {
    padding: calc(3* #{$cell-pad-y}) calc(3 * #{$cell-pad-x});
    background: $tfoot-bg;
    color: white;
    grid-column: 1 / -1;
    text-align: left;
  }

  :deep(.dt-row) {
    display: contents;
  }

  :deep(.dt-cell) {
    border-right: 1px solid $border-color;
    padding: $cell-pad-y $cell-pad-x;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    &:last-of-type {
      border: none;
    }
  }
}
</style>
