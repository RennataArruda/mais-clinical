export class TransformData {

  transformData(dataString: string): string {
    const data = new Date(dataString);
    const ano = data.getFullYear();
    const mes = (data.getMonth() + 1).toString().padStart(2, '0'); // Obtém o mês (lembrando que janeiro é 0) e adiciona zero à esquerda se necessário
    const dia = data.getDate().toString().padStart(2, '0'); // Obtém o dia e adiciona zero à esquerda se necessário

    return `${ano}-${mes}-${dia}`;
  }
}
