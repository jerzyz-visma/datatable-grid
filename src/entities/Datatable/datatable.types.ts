export interface IDatatableColumnData {
  readonly key: string
  readonly title: string
  readonly config: IColumnConfig
}

export interface IDatatableColumn extends IDatatableColumnData {}

export interface IColumnConfig {
  readonly type: string
  readonly width: number
  readonly align: string
  readonly freeze: boolean
  readonly hidden: boolean
  readonly resizable: boolean
}

export interface IDatatableRowData {
  readonly id: number
  readonly account: string
  readonly name: string
  readonly city: string
  readonly country: string
  readonly position: string
}

export interface IDatatableRow extends IDatatableRowData {
  readonly selected: boolean
}
