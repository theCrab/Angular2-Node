import { Pipe, PipeTransform } from '@angular/core';

import { filterObject } from "app/lib/pipe/filter.model";

@Pipe({
  name: 'search',
  pure: false
})
export class SearchPipe implements PipeTransform {

  transform(value: any, filterList: filterObject[], isOr: boolean = false): any {
    //Alan: this data must be array
    if (!(value && filterList)) {
      return value;
    }

    return value.filter(device => {
      //Alan:get all result from filterList
      let result: boolean[] = filterList.map((filterItem) => {
        return device[filterItem.key].includes(filterItem.value)
      });

      if (isOr) {
        return result.findIndex((value) => { return value === true }) > -1;
      }
      return result.every(Boolean);
    })
  }

}
