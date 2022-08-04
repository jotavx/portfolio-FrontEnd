import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { persona } from 'src/app/model/persona.model';
import { PersonaService } from 'src/app/service/persona.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css'],
})
export class AcercaDeComponent implements OnInit {
  public persona: persona[];
  public deletePersona: persona;
  public editPersona: persona;
  roles: string[];
  isAdmin: boolean = false;

  constructor(
    public personaService: PersonaService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.personaService.getPersona().subscribe((data) => {
      this.persona = data;
    });
    this.getPersona();
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach((role) => {
      if (role === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    });
  }

  public onEditPersona(persona: persona): void {
    this.personaService.editPersona(persona).subscribe(
      (response: persona) => {
        console.log(response);
        this.getPersona();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeletePersona(id: number): void {
    this.personaService.deletePersona(id).subscribe(
      (response: void) => {
        console.log(response);
        this.getPersona();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onCreatePersona(addForm: NgForm): void {
    document.getElementById('#addPersonaModal')?.click();
    this.personaService.createPersona(addForm.value).subscribe(
      (response: persona) => {
        console.log(response);
        this.getPersona();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }
  public getPersona() {
    this.personaService.getPersona().subscribe((data) => {
      this.persona = data;
    });
  }

  public onOpenModal(persona: persona, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addPersonaModal');
    }
    if (mode === 'delete') {
      this.deletePersona = persona;
      button.setAttribute('data-target', '#deletePersonaModal');
    }
    if (mode === 'edit') {
      this.editPersona = persona;
      button.setAttribute('data-target', '#editPersonaModal');
    }
    container.appendChild(button);
    button.click();
  }
}
