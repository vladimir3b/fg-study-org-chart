import { IDepartment } from "./organizational-chart.model";

interface IHashElement {
  department: IDepartment;
  map: Array<IDepartment>;
}

interface IHashTable {
  [index: string]: Array<IHashElement>;
}

export {
  IHashTable,
  IHashElement
}