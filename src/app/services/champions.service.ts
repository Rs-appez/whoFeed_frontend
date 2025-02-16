import { inject, Injectable, Signal } from '@angular/core';
import { Champion } from '../interfaces/champions';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Player } from '../interfaces/player';
import { PlayerService } from './player.service';

@Injectable({
  providedIn: 'root',
})
export class ChampionsService {
  http = inject(HttpClient);

  private backendUrl = environment.backendUrl;
  private playerService = inject(PlayerService);

  url = `${this.backendUrl}/game/api/champions`;

  private player: Signal<Player | null> = this.playerService.player;

  headers = new HttpHeaders({
    Authorization: `Bearer ${this.player()!.jwttoken}`,
    'Content-Type': 'application/json',
  });

  getChampPool(): Observable<Champion[]> {
    return this.http.get<Champion[]>(`${this.url}/get_champions/`, {
      headers: this.headers,
    });
  }
}
