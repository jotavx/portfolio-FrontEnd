export class experiencia {
  id?: number;
  nombre: String;
  descripcion: String;
  periodo: String;
  logo: String;

  constructor(
    nombre: String,
    descripcion: String,
    periodo: String,
    logo: String
  ) {
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.periodo = periodo;
    this.logo = logo;
  }
}
