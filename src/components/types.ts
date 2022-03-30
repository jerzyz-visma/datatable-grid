export interface IDatatableColumn {
  key: string;
  title: string;
  config: {
    type: string;
    width: number;
    align: string;
    freeze: boolean;
    hidden: boolean;
  }
}

export interface IDatatableRow {
  id: string;
  [key: string]: any;
}

export interface IColumnSize {
  th: HTMLElement,
  size: string
}

export interface IResizeEvent {
  thRef: HTMLElement
}
