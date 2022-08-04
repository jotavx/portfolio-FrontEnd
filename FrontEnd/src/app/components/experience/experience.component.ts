import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { experiencia } from 'src/app/model/experiencia.model';
import { ExperienciaService } from 'src/app/service/experiencia.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css'],
})
export class ExperienceComponent implements OnInit {
  public experiencia: experiencia[];
  public deleteExperiencia: experiencia;
  public editExperiencia: experiencia;
  roles: string[];
  isAdmin: boolean = false;

  constructor(
    public experienciaService: ExperienciaService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.experienciaService.getExperiencia().subscribe((data) => {
      this.experiencia = data;
    });
    this.getExperiencia();
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach((role) => {
      if (role === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    });
  }

  public onEditExperiencia(experiencia): void {
    this.experienciaService.editExperiencia(experiencia).subscribe(
      (response: experiencia) => {
        console.log(response);
        this.getExperiencia();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteExperiencia(id: number): void {
    this.experienciaService.deleteExperiencia(id).subscribe(
      (response: void) => {
        console.log(response);
        this.getExperiencia();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onCreateExperiencia(addForm: NgForm): void {
    document.getElementById('#addExperienciaModal')?.click();
    this.experienciaService.createExperiencia(addForm.value).subscribe(
      (response: experiencia) => {
        console.log(response);
        this.getExperiencia();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public getExperiencia() {
    this.experienciaService.getExperiencia().subscribe((data) => {
      this.experiencia = data;
    });
  }

  public onOpenModal(experiencia: experiencia, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addExperienciaModal');
    }
    if (mode === 'delete') {
      this.deleteExperiencia = experiencia;
      button.setAttribute('data-target', '#deleteExperienciaModal');
    }
    if (mode === 'edit') {
      this.editExperiencia = experiencia;
      button.setAttribute('data-target', '#editExperienciaModal');
    }
    container.appendChild(button);
    button.click();
  }
}
