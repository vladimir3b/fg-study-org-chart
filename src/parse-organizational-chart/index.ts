import { IOrganizationalChartJSON, IDepartment } from "src/models/organizational-chart.model";
import { IHashTable } from "src/models/hash-table.model";

export class ParseOrganizationalChart {

  /** Properties */
  public static hashTable: IHashTable;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             able;

  /** Methods */
  private static _loadJSON(path: string, success: Function, error: Function): void {
    const xhr: XMLHttpRequest = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          success(JSON.parse(xhr.responseText));
        } else {
          error(xhr)
        }
      }
    }
    xhr.open("GET", path, true);
    xhr.send();
  }

  private static _createHashTable(jsonObjects: Array<IOrganizationalChartJSON>, map: Array<IDepartment> = []): void {
    jsonObjects.forEach((jsonObject: IOrganizationalChartJSON) => {
      const jsObject: IDepartment = {
        address: jsonObject.address,
        name: jsonObject["department name"],
        description: jsonObject.description,
        employees: jsonObject.employees,
        phone: jsonObject.phone,
      }
      let currentMap: Array<IDepartment> = [ ...map ];
      currentMap.push(jsObject);
      jsonObject.tags
        .filter((value: string, index: number) => jsonObject.tags.indexOf(value) === index)
        .map((value: string) => value.toLowerCase())
        .forEach((tag: string) => {
          if (!this.hashTable[tag]) {
            this.hashTable[tag] = [];
          }
          this.hashTable[tag].push({
            department: {...jsObject },
            map: currentMap
          });
        })
      this._createHashTable(jsonObject["subordinated departments"], [ ...currentMap ]);
    })
  }

  public static init() {
    this.hashTable = {};
    this._loadJSON(
      '/data',
      (data: Array<IOrganizationalChartJSON>) => this._createHashTable(data),
      (error: Error) => console.log(error)
    );
  }

}
