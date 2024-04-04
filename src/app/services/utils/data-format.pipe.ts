import { Pipe, PipeTransform } from '@angular/core';
import {DatePipe} from "@angular/common";

@Pipe({
  standalone: true,
  name: 'dataFormat'
})
export class DataFormatPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value) {
      const date = new Date(value); // Converte a string para um objeto Date
      const day = date.getDate();
      const month = date.getMonth() + 1; // Adiciona 1 porque os meses são zero indexados
      const year = date.getFullYear();

      // Formata a data para o formato desejado
      return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
    }
    return null;
  }

}
