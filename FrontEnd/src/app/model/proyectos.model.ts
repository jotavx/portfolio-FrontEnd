export class proyectos {
  id?: number;
  nombreProyecto: string;
  fecha: string;
  institucion: string;
  descripcion: string;
  urlImg: string;

  constructor(
    nombreProyecto: string,
    fecha: string,
    institucion: string,
    descripcion: string,
    urlImg: string
  ) {
    this.nombreProyecto = nombreProyecto;
    this.fecha = fecha;
    this.institucion = institucion;
    this.descripcion = descripcion;
    this.urlImg = urlImg;
  }
}
