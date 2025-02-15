import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LocalstorageService } from './localstorage.service';
import { Player } from '../interfaces/player';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Party } from '../interfaces/party';

@Injectable({
  providedIn: 'root',
})
export class PartyService {
  http = inject(HttpClient);

  private localstorageService = inject(LocalstorageService);
  private backendUrl = environment.backendUrl;

  url = `${this.backendUrl}/game/api/party`;

  private player: Player = this.localstorageService.get<Player>('player')!;

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  makeParty(): Observable<Party> {
    this.headers = this.headers.set(
      'Authorization',
      `Bearer ${this.player.jwttoken}`,
    );
    return this.http.post<Party>(`${this.url}/make_party/`, {
      headers: this.headers,
    });
  }
}
