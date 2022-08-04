import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { estudios } from '../model/estudios.model';

@Injectable({
  providedIn: 'root',
})
export class EstudiosService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getEstudios(): Observable<estudios[]> {
    return this.http.get<estudios[]>(`${this.apiServerUrl}estudios/traer`);
  }

  public createEstudios(estudios: estudios): Observable<estudios> {
    return this.http.post<estudios>(
      `${this.apiServerUrl}estudios/crear`,
      estudios
    );
  }

  public editEstudios(estudios: estudios): Observable<estudios> {
    return this.http.put<estudios>(
      `${this.apiServerUrl}estudios/editar`,
      estudios
    );
  }

  public deleteEstudios(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}estudios/borrar/${id}`);
  }
}
