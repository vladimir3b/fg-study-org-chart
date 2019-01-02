
interface IDepartment {
  phone: string;
  address: string;
  description:string;
  name: string;
  employees: Array<string>;
}

interface IOrganizationalChartJSON {
  "phone": string;
  "address": string;
  "description": string;
  "department name": string;
  "tags": Array<string>;
  "employees": Array<string>;
  "subordinated departments": Array<IOrganizationalChartJSON>;
}

export {
  IDepartment,
  IOrganizationalChartJSON
}