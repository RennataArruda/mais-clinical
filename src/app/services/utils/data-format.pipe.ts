import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  standalone: true,
  name: 'dataFormat'
})
export class DataFormatPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value) {
      const data = new Date(value);
      const dia = data.getDate().toString().padStart(2, '0'); // Obtém o dia e adiciona zero à esquerda se necessário
      const mes = (data.getMonth() + 1).toString().padStart(2, '0'); // Obtém o mês (lembrando que janeiro é 0) e adiciona zero à esquerda se necessário
      const ano = data.getFullYear();

      return `${dia}/${mes}/${ano}`;
    }
    return null;
  }

}
