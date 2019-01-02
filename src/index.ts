import './index.scss';

import 'bootstrap';

import { SearchInput } from './search-input';
import { ParseOrganizationalChart } from './parse-organizational-chart';
import { OutputDepartments } from './output-departments';

ParseOrganizationalChart.init();

window.addEventListener('DOMContentLoaded', () => {
  SearchInput.init();
  SearchInput.parse((listOfTerms: Array<string>) => {
    OutputDepartments.listSearchedItems(listOfTerms);
  })
});
