import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { persona } from '../model/persona.model';

@Injectable({
  providedIn: 'root',
})
export class PersonaService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getPersona(): Observable<persona[]> {
    return this.http.get<persona[]>(`${this.apiServerUrl}personas/traer`);
  }

  public createPersona(persona: persona): Observable<persona> {
    return this.http.post<persona>(
      `${this.apiServerUrl}personas/crear`,
      persona
    );
  }

  public editPersona(persona: persona): Observable<persona> {
    return this.http.put<persona>(
      `${this.apiServerUrl}personas/editar`,
      persona
    );
  }

  public deletePersona(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}personas/borrar/${id}`);
  }
}

// ORIGINAL ↓

//   constructor(private http: HttpClient) {}

//   public getPersona(): Observable<persona[]> {
//     return this.http.get<persona[]>(this.URL + '/traer');
//   }

//   public createPersona(persona: persona): Observable<persona> {
//     return this.http.post<persona>(this.URL + '/crear', persona);
//   }

//   public editPersona(persona: persona): Observable<persona> {
//     return this.http.put<persona>(this.URL + '/editar', persona);
//   }

//   public deletePersona(id: number): Observable<void> {
//     return this.http.delete<void>(this.URL + `/borrar/${id}`);
//   }
// }

// CON ENVIROMENT ↓

//   private apiServerUrl = environment.apiBaseUrl;

//   constructor(private http: HttpClient) {}

//   public getPersona(): Observable<persona[]> {
//     return this.http.get<persona[]>(`${this.apiServerUrl}/traer`);
//   }

//   public createPersona(persona: persona): Observable<persona> {
//     return this.http.post<persona>(`${this.apiServerUrl}/crear`, persona);
//   }

//   public editPersona(persona: persona): Observable<persona> {
//     return this.http.put<persona>(`${this.apiServerUrl}/editar`, persona);
//   }

//   public deletePersona(id: number): Observable<void> {
//     return this.http.delete<void>(`${this.apiServerUrl}/borrar/${id}`);
//   }
// }

// SIN ENVIROMENT PERO NO ORIGINAL ↓

//   private apiServerUrl = 'https://apjvportfolioback.herokuapp.com/personas';

//   constructor(private http: HttpClient) {}

//   public getPersona(): Observable<persona[]> {
//     return this.http.get<persona[]>(`${this.apiServerUrl}/traer`);
//   }

//   public createPersona(persona: persona): Observable<persona> {
//     return this.http.post<persona>(`${this.apiServerUrl}/crear`, persona);
//   }

//   public editPersona(persona: persona): Observable<persona> {
//     return this.http.put<persona>(`${this.apiServerUrl}/editar`, persona);
//   }

//   public deletePersona(id: number): Observable<void> {
//     return this.http.delete<void>(`${this.apiServerUrl}/borrar/${id}`);
//   }
// }

// ng serve --host 0.0.0.0
// modificar URL en el servicio de cada componente por: 192.168.1.111:8080/nombreComponente (IP DE LA PC DESDE DONDE SE EJECUTA EL PROGRAMA )
