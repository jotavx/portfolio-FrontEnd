export class skills {
  id?: number;
  skill: String;
  porcentaje: String;
  urlLogo: String;

  constructor(skill: String, porcentaje: String, urlLogo: String) {
    this.skill = skill;
    this.porcentaje = skill;
    this.urlLogo = urlLogo;
  }
}
