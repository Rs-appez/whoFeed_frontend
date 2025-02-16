import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, Signal } from '@angular/core';
import { Player } from '../interfaces/player';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Party } from '../interfaces/party';
import { PlayerService } from './player.service';

@Injectable({
  providedIn: 'root',
})
export class PartyService {
  http = inject(HttpClient);

  private backendUrl = environment.backendUrl;

  url = `${this.backendUrl}/game/api/parties`;

  private playerService = inject(PlayerService);
  private player: Signal<Player | null> = this.playerService.player;

  headers = new HttpHeaders({
    Authorization: `Bearer ${this.player()!.jwttoken}`,
    'Content-Type': 'application/json',
  });

  makeParty(): Observable<Party> {
    return this.http.post<Party>(
      `${this.url}/create_party/`,
      {},
      {
        headers: this.headers,
      },
    );
  }
}
