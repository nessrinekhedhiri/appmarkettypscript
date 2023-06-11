// TypeScript will now recognize react-select package without any issues.
declare module 'react-select' {
  export type OptionTypeBase = {
    label: string;
    value: string;
  };

  interface SelectProps<T extends OptionTypeBase> {
    styles?: any; // Define the type for custom styles
    id: string;
    value: SelectOption | null;
    options: SelectOption[];
    onChange: (newValue: OptionType, actionMeta: any) => void;
  }

  export default function Select<T extends OptionTypeBase>(
    props: SelectProps<T>
  ): JSX.Element;
}

// TypeScript will now recognize react-bootstrap-table-next  package without any issues.
declare module 'react-bootstrap-table-next' {
  import { ComponentType, CSSProperties, ReactNode } from 'react';

  export interface ColumnDescription<T> {
    dataField: keyof T;
    text: string;
    sort?:boolean
  }

  export interface BootstrapTableProps<T> {
    keyField: keyof T;
    data: T[];
    columns: ColumnDescription<T>[];
    noDataIndication?: ReactNode;
    pagination?: PaginationOptions; 
  }

  const BootstrapTable: ComponentType<BootstrapTableProps<any>>;

  export default BootstrapTable;
}
// TypeScript will now recognize react-bootstrap-table2-paginator package without any issues.
declare module 'react-bootstrap-table2-paginator' {
  import { ComponentType } from 'react';
  import { BootstrapTableProps } from 'react-bootstrap-table-next';

  export interface PaginationOptions {
    custom?: boolean;
    paginationSize?: number;
    pageStartIndex?: number;
    firstPageText?: string;
    prePageText?: string;
    nextPageText?: string;
    lastPageText?: string;
    nextPageTitle?: string;
    prePageTitle?: string;
    firstPageTitle?: string;
    lastPageTitle?: string;
    showTotal?: boolean;
    paginationTotalRenderer?: (from: number, to: number, size: number) => React.ReactNode;
    disablePageTitle?: boolean;
    sizePerPageList?: { text: string; value: number }[];
  }

  const paginationFactory: (options: PaginationOptions) => ComponentType<BootstrapTableProps<any>>;

  export default paginationFactory;
}





