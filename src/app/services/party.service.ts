import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  effect,
  inject,
  Injectable,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { Player } from '../interfaces/player';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Party } from '../interfaces/party';
import { PlayerService } from './player.service';

@Injectable({
  providedIn: 'root',
})
export class PartyService {
  constructor() {
    effect(() => {
      const currentPlayer = this.player();
      if (currentPlayer) {
        this.headers = this.headers.set(
          'Authorization',
          `Bearer ${currentPlayer.jwttoken}`,
        );
      }
    });
  }
  http = inject(HttpClient);

  party: WritableSignal<Party | null> = signal<Party | null>(null);

  private backendUrl = environment.backendUrl;

  url = `${this.backendUrl}/game/api/parties`;

  private playerService = inject(PlayerService);
  private player: Signal<Player | null> = this.playerService.player;

  headers = new HttpHeaders({
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

  joinParty(partyId: string): Observable<Party> {
    return this.http.post<Party>(
      `${this.url}/join_party/`,
      { party_id: partyId },
      {
        headers: this.headers,
      },
    );
  }
}
