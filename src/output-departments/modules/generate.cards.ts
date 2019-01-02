import { GenerateOtherStuff } from './generate.other-stuff';
import { IDepartment } from "src/models/organizational-chart.model";
import { IHashElement } from 'src/models/hash-table.model';
import { GenerateBreadcrumb } from './generate.breadcrumb';

export class GenerateCards {

  private static _header(
      department: IDepartment,
      bodyId: string
  ): string {
    return `
      <div class="card-header">
        <a class="card-link" data-toggle="collapse" href="#${bodyId}">
          Department: ${department.name}
        </a>
      </div>
    `;
  }

  private static _body(
      department: IDepartment,
      breadcrumb: string,
      bodyId: string
  ): string {
    return `
      <div id="${bodyId}" class="collapse" data-parent="#accordion">
        <div class="card-body">
          ${breadcrumb}
          <div class="container pt-3 pb-3">
            ${ GenerateOtherStuff.tableRow('Department Name', department.name, 'bg-info', 'pt-3') }
            ${ GenerateOtherStuff.tableRow('Description', department.description, 'bg-info') }
            ${ GenerateOtherStuff.tableRow('Employees', GenerateOtherStuff.employeesTable(department.employees), 'bg-info') }
            ${ GenerateOtherStuff.tableRow('Address', department.address, 'bg-info') }
            ${ GenerateOtherStuff.tableRow('Phone', department.phone, 'bg-info', 'pb-3') }
          </div>
        </div>
      </div>
    `;
  }

  private static _card(
      department: IDepartment,
      breadcrumb: string,
      bodyId: string
  ): string {
    return `
      <div class="card">
        ${ this._header(department, bodyId) }
        ${ this._body(department, breadcrumb, bodyId) }
      </div>
    `;
  }

  public static create(items: Array<IHashElement>, preLabel: string): Array<string> {
    const cards: Array<string> = [];
    items.forEach((item: IHashElement, index: number) => {
      cards.push(`
        ${
          this._card(
            item.department,
            GenerateBreadcrumb.create(item),
            preLabel + index
          )
        }
      `);
    });
    return cards;
  }

}