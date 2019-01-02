import { IHashElement } from 'src/models/hash-table.model';
import { IDepartment } from 'src/models/organizational-chart.model';
import { GenerateModals } from './generate.modals';
import { GenerateOtherStuff } from './generate.other-stuff';


export class GenerateBreadcrumb {

  private static _breadcrumbElement(
      department: IDepartment,
      modalId: string
  ): string {
    return `
      <span
          class="btn-link"
          data-toggle="tooltip"
          title="${ department.description }"
        >
        <small
            data-toggle="modal"
            data-target="#${ modalId }">
          ${ department.name }
        </small>
      </span>
    `;
  }

  public static create(item: IHashElement): string {
    let breadcrumb = '<small>';
    item.map.forEach((department: IDepartment) => {
      const modalUniqueId: string = GenerateOtherStuff.uniqueId();
      breadcrumb += `
        ${ this._breadcrumbElement(department, 'modal'+ modalUniqueId) }/
        ${ GenerateModals.create(department, 'modal'+ modalUniqueId) }
      `;
    });
    breadcrumb += '</small>';
    return breadcrumb;
  }

}