export class GenerateOtherStuff {

  public static uniqueId(precision: number = 32): string {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let text: string = '';
    for (let i = 1; i <= precision; i++) {
      text += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return text;
  }

  public static employeesTable(employees: Array<string>): string {
    let employeesTable: string = '';
      employees.forEach((employee: string) => {
        employeesTable += `
          <div class="row">
            <div class="col">
              ${employee}
            </div>
          </div>
        `
      });
    return employeesTable;
  }

  public static tableRow(
      title: string,
      content: string,
      titleStyle: string,
      specialStyle: string = ''
  ): string {
    return `
      <div class="row">
        <div class="col-3 ${ titleStyle } text-right text-white ${specialStyle}">
          ${title}
        </div>
        <div class="col-9 ${specialStyle}">
          ${content}
        </div>
      </div>
    `;
  }

  public static accordion(start: number, end: number, cards: Array<string>): string {
    let accordion: string = '<div id="accordion">';
    for (let i = start; i <= end; i++) {
      accordion += cards[i];
    }
    accordion += '</div>';
    return accordion;
  }

  public static navigation(numberOfNavigationButtons: number): string {
    let navigation: string = '<nav aria-label="cards navigation"><ul class="pagination justify-content-end">';
    for (let i = 1; i <= numberOfNavigationButtons; i++) {
      navigation +=`<li class="page-item"><button id="navButton${i}" class="page-link">${i}</button></li>`;
    }
    navigation +='</ul></nav>';
    return navigation;
  }

}