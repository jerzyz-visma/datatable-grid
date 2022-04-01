import { defineStore } from 'pinia'
import { IDatatableColumn, IDatatableRow } from "../components/Datatable/types";
import columns from "../data/columns.json"

interface IDatatableState {
  title: string,
  rows: IDatatableRow[]
  columns: IDatatableColumn[]
}

export const useDatatableStore = defineStore('DatatableStore', {
  state: (): IDatatableState => {
    return {
      title: 'Datatable demo state',
      columns: columns,
      rows: [],
    }
  },
  actions: {
    async fetchRows() {
      this.rows = (await import("../data/rows.json")).default
    }
  },
  getters: {
    rowsCount: (state) => state.rows.length
  }
})
