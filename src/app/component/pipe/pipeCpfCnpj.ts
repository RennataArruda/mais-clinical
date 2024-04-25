import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cpfCnpjMask'
})
export class CpfCnpjMaskPipe implements PipeTransform {
  transform(value: string): string {
    // Verifica se o valor é válido
    if (!value || typeof value !== 'string') {
      return value;
    }

    // Remove todos os caracteres não numéricos do valor
    const cpfCnpjOnlyNumbers = value.replace(/\D/g, '');

    // Verifica o comprimento do valor para determinar se é CPF ou CNPJ
    if (cpfCnpjOnlyNumbers.length > 11) {
      // Aplica a máscara de CNPJ (##.###.###/####-##)
      return cpfCnpjOnlyNumbers.replace(
        /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
        '$1.$2.$3/$4-$5'
      );
    } else {
      // Aplica a máscara de CPF (###.###.###-##)
      return cpfCnpjOnlyNumbers.replace(
        /^(\d{3})(\d{3})(\d{3})(\d{2})$/,
        '$1.$2.$3-$4'
      );
    }
  }
}
