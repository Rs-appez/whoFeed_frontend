import { Injectable } from '@angular/core';
import { Champions } from '../interfaces/champions';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChampionsService {
  constructor(private http: HttpClient) { }

  private apiKey = environment.apiKey;
  private backendUrl = environment.backendUrl;

  url = `${this.backendUrl}/game/api/champions`;

  headers = new HttpHeaders({
    Authorization: `TOKEN ${this.apiKey}`,
    'Content-Type': 'application/json',
  });

  getChampPool(): Observable<Champions[]> {
    return this.http.get<Champions[]>(`${this.url}/get_champions/`, {
      headers: this.headers,
    });
  }
}
