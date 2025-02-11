import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(value: any[], keys: string, term: string): any[] {
    console.log(value, keys, term);
    if (!term) return value;
    return value.filter((item) =>
      keys
        .split(',')
        .some(
          (key) =>
            item.hasOwnProperty(key) && new RegExp(term, 'gi').test(item[key]),
        ),
    );
  }
}
