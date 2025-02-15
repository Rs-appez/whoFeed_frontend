import { inject, Injectable } from '@angular/core';
import { Champion } from '../interfaces/champions';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { LocalstorageService } from './localstorage.service';
import { Player } from '../interfaces/player';

@Injectable({
  providedIn: 'root',
})
export class ChampionsService {
  http = inject(HttpClient);

  private localstorageService = inject(LocalstorageService);
  private backendUrl = environment.backendUrl;

  url = `${this.backendUrl}/game/api/champions`;

  private player: Player = this.localstorageService.get<Player>('player')!;
  private jwtToken: string = '';

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  getChampPool(): Observable<Champion[]> {
    this.headers = this.headers.set(
      'Authorization',
      `Bearer ${this.player.jwttoken}`,
    );
    return this.http.get<Champion[]>(`${this.url}/get_champions/`, {
      headers: this.headers,
    });
  }
}
