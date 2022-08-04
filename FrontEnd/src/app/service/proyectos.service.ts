import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { proyectos } from '../model/proyectos.model';

@Injectable({
  providedIn: 'root',
})
export class ProyectosService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getProyectos(): Observable<proyectos[]> {
    return this.http.get<proyectos[]>(`${this.apiServerUrl}proyectos/traer`);
  }

  public createProyectos(proyectos: proyectos): Observable<proyectos> {
    return this.http.post<proyectos>(
      `${this.apiServerUrl}proyectos/crear`,
      proyectos
    );
  }

  public editProyectos(proyectos: proyectos): Observable<proyectos> {
    return this.http.put<proyectos>(
      `${this.apiServerUrl}proyectos/editar`,
      proyectos
    );
  }

  public deleteProyectos(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}proyectos/borrar/${id}`);
  }
}
