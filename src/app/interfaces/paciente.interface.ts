export interface PacienteInterface {
  id: number,
  ativo: boolean,
  cpf: string,
  nome_completo: string,
  data_nascimento: string,
  endereco: string,
  celular: string,
  contato_adicional: string,
  convenio: boolean,
  convenio_id: number,
  email: string,
  cns: number,
  numero_carteira: number
}
