import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { experiencia } from '../model/experiencia.model';

@Injectable({
  providedIn: 'root',
})
export class ExperienciaService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getExperiencia(): Observable<experiencia[]> {
    return this.http.get<experiencia[]>(
      `${this.apiServerUrl}experiencias/traer`
    );
  }

  public createExperiencia(experiencia: experiencia): Observable<experiencia> {
    return this.http.post<experiencia>(
      `${this.apiServerUrl}experiencias/crear`,
      experiencia
    );
  }

  public editExperiencia(experiencia: experiencia): Observable<experiencia> {
    return this.http.put<experiencia>(
      `${this.apiServerUrl}experiencias/editar`,
      experiencia
    );
  }

  public deleteExperiencia(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiServerUrl}experiencias/borrar/${id}`
    );
  }
}
