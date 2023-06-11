import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";

export const  Options = [
  { value: '', label: 'None' },
  { value: 'time', label: 'Time' },
  { value: 'price', label: 'Price' },
  { value: 'quantity', label: 'Quantity' },
];
export const columnsTrades = [
  {
    dataField: 'time',
    text: 'Time',
    sort: true
  },
  {
    dataField: 'price',
    text: 'Price',
    sort: true
  },
  {
    dataField: 'qty',
    text: 'Quantity',
    sort: true
  },
];
export const columnsTicker = [
  {
    dataField: 'symbol',
    text: 'Symbol',
    
  },
  {
    dataField: 'askPrice',
    text: 'Ask Price',
  },
  {
    dataField: 'highPrice',
    text: 'High Price',
  },
  {
    dataField: 'lastPrice',
    text: 'Last Price',
  },
  
  {
    dataField: 'askQty',
    text: 'Quantity',
  },
  {
    dataField: 'lastQty',
    text: 'Last Quantity',
  },
];
export const customStyles = {
  control: () => ({
    alignItems: "center",
    backgroundColor: "hsl(0,0%,100%)",
    borderColor: "hsl(0,0%,60%)",
    borderRadius: "4px",
    borderStyle: "solid",
    borderWidth: "1px",
    cursor: "default",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    height: "31px",
    minHeight: "38px",
    outline: "0 !important",
    position: "relative",
    transition: "all 100ms",
    boxSizing: "border-box",
    marginRight:"4rem",
    width:"100%",
  }),
  indicatorSeparator: (provided: any) => ({
    ...provided,
    backgroundColor: "hsl(0,0%,60%)",
  }),
  dropdownIndicator: (provided: any) => ({
    ...provided,
    color: "hsl(0,0%,60%)",
  }),
  placeholder: (provided: any) => {
    return { ...provided, color: "hsl(0,0%,80%)" };
  },
};
export const customTotal = (from: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined, to: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined, size: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined) => (
  <span className="react-bootstrap-table-pagination-total">
    Showing { from } to { to } of { size } Results
  </span>
);