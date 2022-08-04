export class estudios {
  id?: number;
  tituloEstudios: String;
  casaEstudios: String;
  periodo: String;
  urlLogo: String;

  constructor(
    tituloEstudios: String,
    casaEstudios: String,
    periodo: String,
    urlLogo: String
  ) {
    this.tituloEstudios = tituloEstudios;
    this.casaEstudios = casaEstudios;
    this.periodo = periodo;
    this.urlLogo = urlLogo;
  }
}
