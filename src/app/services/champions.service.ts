import { inject, Injectable } from '@angular/core';
import { Champion } from '../interfaces/champions';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChampionsService {
  http = inject(HttpClient);

  private apiKey = environment.apiKey;
  private backendUrl = environment.backendUrl;

  url = `${this.backendUrl}/game/api/champions`;

  headers = new HttpHeaders({
    Authorization: `TOKEN ${this.apiKey}`,
    'Content-Type': 'application/json',
  });

  getChampPool(): Observable<Champion[]> {
    return this.http.get<Champion[]>(`${this.url}/get_champions/`, {
      headers: this.headers,
    });
  }
}
