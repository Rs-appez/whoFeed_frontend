import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Player } from '../interfaces/player';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  http = inject(HttpClient);

  player: WritableSignal<Player | null> = signal<Player | null>(null);

  private backendUrl = environment.backendUrl;

  url = `${this.backendUrl}/game/api/players`;

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  makePlayer(username: string): Observable<Player> {
    let player = { name: username };
    return this.http.post<Player>(`${this.url}/`, player, {
      headers: this.headers,
    });
  }
}
