export interface IColumn<T> {
  label: string;
  key: keyof T;
  align?: 'left' | 'center' | 'right';
  customRender?: (row: T) => React.ReactNode;
}

export interface ITableProps<T> {
  columns: IColumn<T>[];
  data: T[];
}
