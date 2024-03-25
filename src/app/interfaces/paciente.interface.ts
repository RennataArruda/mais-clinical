export interface PacienteInterface {
  id: number,
  created_at: string,
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
  numero_carteir: number
}
