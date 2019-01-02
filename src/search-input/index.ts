export class SearchInput {

  /** Properties */
  private static _searchInput: HTMLInputElement;

  /** Methods */
  private static _listOfTerms(): Array<string> {
    const listOfTerms: Array<string> = this._searchInput.value
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, ' ')
    .replace(/\s\s+/g, ' ')
    .trim()
    .toLowerCase()
    .split(' ');
    return listOfTerms.filter((term: string, index: number) => listOfTerms.indexOf(term) === index);
  }

  public static init(): void {
    document.querySelector('#applicationInput').innerHTML = `
      <div class="form-group">
        <label for="searchInput">Search your term: </label>
        <input
            type="text"
            id="searchInput"
            aria-describedby="searchHelp"
            placeholder="what do you want to search for..."
            class="form-control">
        <small class="form-text text-muted">Insert one or more words.</small>
      </div>
    `;
    this._searchInput = document.querySelector('#searchInput');
  }

  public static parse(callback: Function): void {
    this._searchInput.addEventListener('keyup', () => {
      callback(this._listOfTerms());
    });
  }

}