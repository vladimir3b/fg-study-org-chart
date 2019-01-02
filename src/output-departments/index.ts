import * as $ from 'jquery';

import { GenerateBreadcrumb } from './modules/generate.breadcrumb';
import { IHashTable } from 'src/models/hash-table.model';
import { ParseOrganizationalChart } from "../parse-organizational-chart";
import { IHashElement } from 'src/models/hash-table.model';
import { IDepartment } from 'src/models/organizational-chart.model';
import { GenerateModals } from './modules/generate.modals';
import { GenerateOtherStuff } from './modules/generate.other-stuff';
import { GenerateCards } from './modules/generate.cards';

const CARDS_PER_PAGE: number = 10;

export class OutputDepartments {

  /** Properties */
  private static _applicationOutput: HTMLInputElement;
  private static _cards: Array<string>;
  private static _currentPageNumber: number;

  /** Methods */
  private static _numberOfCards(): number {
    return this._cards.length;
  }

  private static _firstCardListed(): number {
    return CARDS_PER_PAGE * this._currentPageNumber;
  }

  private static _lastCardListed(): number {
    if (this._firstCardListed() + CARDS_PER_PAGE  <= this._numberOfCards()){
      return this._firstCardListed() + CARDS_PER_PAGE - 1;
    } else {
      return this._numberOfCards() - 1;
    }
  }

  private static _numberOfNavigationButtons(): number {
    return (this._numberOfCards() % CARDS_PER_PAGE === 0)
      ? this._numberOfCards() / CARDS_PER_PAGE
      : this._numberOfCards() / CARDS_PER_PAGE + 1;
  }

  private static _createContent(): string {
    return GenerateOtherStuff.accordion(
      this._firstCardListed(),
      this._lastCardListed(),
      this._cards
    ) + GenerateOtherStuff.navigation(this._numberOfNavigationButtons());
  }

  private static _displayContent() {
    this._applicationOutput.innerHTML = this._createContent();
  }

  private static _addFunctionality() {
    $(function () {
      (<any>$('[data-toggle="tooltip"]')).tooltip({
        placement: 'bottom',
        trigger: 'hover'
      })
    })
    for (let i = 1; i <= this._numberOfNavigationButtons(); i++) {
      document.querySelector(`#navButton${i}`).addEventListener('click', () => {
        this._currentPageNumber = i - 1;
        this._displayContent();
        this._addFunctionality();
      });
    }
  }

  private static _init(): void {
    this._applicationOutput = document.querySelector('#applicationOutput');
    this._applicationOutput.innerHTML = '';
    this._cards = [];
    this._currentPageNumber = 0;
  }

  public static listSearchedItems(listOfTerms: Array<string>) {
    this._init();
    const hashObject: IHashTable = ParseOrganizationalChart.hashTable;
    listOfTerms.forEach((item: string) => {
      if (hashObject.hasOwnProperty(item)) {
        GenerateCards.create(hashObject[item], item).forEach((card: string) => {
          this._cards.push(card);
        });
        this._displayContent();
        this._addFunctionality();
      }
    });
  }

}