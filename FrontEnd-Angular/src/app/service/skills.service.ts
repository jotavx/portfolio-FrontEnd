import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { skills } from '../model/skills.model';

@Injectable({
  providedIn: 'root',
})
export class SkillsService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getSkills(): Observable<skills[]> {
    return this.http.get<skills[]>(`${this.apiServerUrl}skills/traer`);
  }

  public createSkills(skills: skills): Observable<skills> {
    return this.http.post<skills>(`${this.apiServerUrl}skills/crear`, skills);
  }

  public editSkills(skills: skills): Observable<skills> {
    return this.http.put<skills>(`${this.apiServerUrl}skills/editar`, skills);
  }

  public deleteSkills(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}skills/borrar/${id}`);
  }
}
