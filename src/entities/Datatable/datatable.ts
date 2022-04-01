import {
  IColumnConfig,
  IDatatableColumn,
  IDatatableColumnData,
  IDatatableRow,
  IDatatableRowData
} from "./datatable.types";

export class DatatableColumn implements IDatatableColumn {
  readonly key: string
  readonly title: string
  readonly config: IColumnConfig

  constructor (data: IDatatableColumnData) {
    this.key = data.key
    this.title = data.title
    this.config = data.config
  }
}

export class DatatableRow implements IDatatableRow {
  readonly selected: boolean
  readonly account: string
  readonly id: number
  readonly name: string
  readonly city: string
  readonly country: string
  readonly position: string

  constructor(data: IDatatableRowData) {
    this.selected = false
    this.account = data.account
    this.id = data.id
    this.name = data.name
    this.city = data.city
    this.country = data.country
    this.position = data.position
  }
}
