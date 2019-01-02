import { IDepartment } from 'src/models/organizational-chart.model';
import { GenerateOtherStuff } from './generate.other-stuff';


export class GenerateModals {

  private static _header(departmentName: string): string {
    return `
      <div class="modal-header">
        <div class="container">
          <div class="row">
            <div class="col">
              <h5 class="modal-title">${ departmentName }</h5>
            </div>
          </div>
        </div>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    `;
  }

  private static _body(department: IDepartment): string {
    return `
      <div class="modal-body">
        <div class="container">
          <div class="row">
            <div class="col">
              <h6>Description</h6>
              <p>
                ${ department.description }
              </p>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <h6>Details</h6>
              <div class="container">
                ${
                  GenerateOtherStuff.tableRow(
                    'Employees',
                    GenerateOtherStuff.employeesTable(department.employees),
                    'bg-success',
                    'pt-2'
                  )
                }
                ${ GenerateOtherStuff.tableRow('Address', department.address, 'bg-success') }
                ${ GenerateOtherStuff.tableRow('Phone', department.phone, 'bg-success', 'pb-2') }
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private static _footer(): string {
    return `
      <div class="modal-footer">
        <button type="button" class="btn btn-success" data-dismiss="modal">Close</button>
      </div>
    `;
  }

  public static create(department: IDepartment, modalId: string): string {
    return `
      <div
          class="modal fade"
          id="${ modalId }"
          tabindex="-1"
          role="dialog"
          aria-hidden="true"
        >
        <div class="modal-dialog modal-xl" role="document">
          <div class="modal-content">

            ${ this._header(department.name) }
            ${
              this._body(department)
            }
            ${ this._footer()}

          </div>
        </div>
      </div>
    `;
  }

}