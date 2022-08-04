export class socialmedia {
  id?: number;
  instagram: string;
  github: string;
  linkedin: string;

  constructor(instagram: string, github: string, linkedin: string) {
    this.instagram = instagram;
    this.github = github;
    this.linkedin = linkedin;
  }
}
