import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { estudios } from 'src/app/model/estudios.model';
import { EstudiosService } from 'src/app/service/estudios.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-estudios',
  templateUrl: './estudios.component.html',
  styleUrls: ['./estudios.component.css'],
})
export class EstudiosComponent implements OnInit {
  public estudios: estudios[];
  public deleteEstudios: estudios;
  public editEstudios: estudios;
  roles: string[];
  isAdmin: boolean = false;

  constructor(
    public estudiosService: EstudiosService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.estudiosService.getEstudios().subscribe((data) => {
      this.estudios = data;
    });
    this.getEstudios();
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach((role) => {
      if (role === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    });
  }

  public onEditEstudios(estudios: estudios): void {
    this.estudiosService.editEstudios(estudios).subscribe(
      (response: estudios) => {
        console.log(response);
        this.getEstudios();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteEstudios(id: number): void {
    this.estudiosService.deleteEstudios(id).subscribe(
      (response: void) => {
        console.log(response);
        this.getEstudios();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onCreateEstudios(addForm: NgForm): void {
    document.getElementById('#addEstudiosModal')?.click();
    this.estudiosService.createEstudios(addForm.value).subscribe(
      (response: estudios) => {
        console.log(response);
        this.getEstudios();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public getEstudios() {
    this.estudiosService.getEstudios().subscribe((data) => {
      this.estudios = data;
    });
  }

  public onOpenModal(estudios: estudios, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addEstudiosModal');
    }
    if (mode === 'delete') {
      this.deleteEstudios = estudios;
      button.setAttribute('data-target', '#deleteEstudiosModal');
    }
    if (mode === 'edit') {
      this.editEstudios = estudios;
      button.setAttribute('data-target', '#editEstudiosModal');
    }
    container.appendChild(button);
    button.click();
  }
}
