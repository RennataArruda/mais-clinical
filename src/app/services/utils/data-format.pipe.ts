import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  standalone: true,
  name: 'dataFormat'
})
export class DataFormatPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value) {
      const [year, month, day] = value.split('-');

      // Return the new date string in the format 'DD/mm/YYYY'
      return `${day}/${month}/${year}`;
    }
    return null;
  }

}
