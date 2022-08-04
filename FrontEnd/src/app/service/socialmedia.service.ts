import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { socialmedia } from '../model/socialmedia';

@Injectable({
  providedIn: 'root',
})
export class SocialmediaService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getSocialMedia(): Observable<socialmedia[]> {
    return this.http.get<socialmedia[]>(
      `${this.apiServerUrl}socialmedia/traer`
    );
  }

  public createSocialMedia(socialmedia: socialmedia): Observable<socialmedia> {
    return this.http.post<socialmedia>(
      `${this.apiServerUrl}socialmedia/crear`,
      socialmedia
    );
  }

  public editSocialMedia(socialmedia: socialmedia): Observable<socialmedia> {
    return this.http.put<socialmedia>(
      `${this.apiServerUrl}socialmedia/editar`,
      socialmedia
    );
  }

  public deleteSocialMedia(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiServerUrl}socialmedia/borrar/${id}`
    );
  }
}
