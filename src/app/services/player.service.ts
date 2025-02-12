import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Player } from '../interfaces/player';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  http = inject(HttpClient);

  private apiKey = environment.apiKey;
  private backendUrl = environment.backendUrl;

  url = `${this.backendUrl}/game/api/players`;

  headers = new HttpHeaders({
    Authorization: `TOKEN ${this.apiKey}`,
    'Content-Type': 'application/json',
  });

  makePlayer(username: string): Observable<Player> {
    let player = { name: username };
    return this.http.post<Player>(`${this.url}/`, player, {
      headers: this.headers,
    });
  }
}
