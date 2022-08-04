import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { proyectos } from 'src/app/model/proyectos.model';
import { ProyectosService } from 'src/app/service/proyectos.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css'],
})
export class ProyectosComponent implements OnInit {
  public proyectos: proyectos[];
  public deleteProyectos: proyectos;
  public editProyectos: proyectos;
  roles: string[];
  isAdmin: boolean = false;

  constructor(
    public proyectosService: ProyectosService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.proyectosService.getProyectos().subscribe((data) => {
      this.proyectos = data;
    });
    this.getProyectos();
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach((role) => {
      if (role === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    });
  }
  public onEditProyectos(proyectos): void {
    this.proyectosService.editProyectos(proyectos).subscribe(
      (response: proyectos) => {
        console.log(response);
        this.getProyectos();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteProyectos(id: number): void {
    this.proyectosService.deleteProyectos(id).subscribe(
      (response: void) => {
        console.log(response);
        this.getProyectos();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onCreateProyectos(addForm: NgForm): void {
    document.getElementById('#addProyectosModal')?.click();
    this.proyectosService.createProyectos(addForm.value).subscribe(
      (response: proyectos) => {
        console.log(response);
        this.getProyectos();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public getProyectos() {
    this.proyectosService.getProyectos().subscribe((data) => {
      this.proyectos = data;
    });
  }

  public onOpenModal(proyectos: proyectos, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addProyectosModal');
    }
    if (mode === 'delete') {
      this.deleteProyectos = proyectos;
      button.setAttribute('data-target', '#deleteProyectosModal');
    }
    if (mode === 'edit') {
      this.editProyectos = proyectos;
      button.setAttribute('data-target', '#editProyectosModal');
    }
    container.appendChild(button);
    button.click();
  }
}
