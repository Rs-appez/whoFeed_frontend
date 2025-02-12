import { Component, inject, AfterViewChecked } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { LocalstorageService } from '../../services/localstorage.service';
import { Player } from '../../interfaces/player';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connect',
  imports: [FormsModule],
  templateUrl: './connect.component.html',
  styleUrl: './connect.component.css',
})
export class ConnectComponent {
  private readonly route = inject(Router);
  private readonly localStorageService = inject(LocalstorageService);

  // services
  playerService: PlayerService = inject(PlayerService);

  // variables
  player: Player | null = {} as Player;
  playerName: string = '';

  constructor() {
    this.player = this.localStorageService.get<Player>('player');

    if (this.player) {
      this.connectPlayer();
    }
  }

  createPlayer() {
    if (this.playerName !== '') {
      this.playerService.makePlayer(this.playerName).subscribe((player) => {
        this.player = player;
        this.savePlayer();
      });
    }
  }

  savePlayer() {
    this.localStorageService.set('player', this.player);
    this.connectPlayer();
  }

  connectPlayer() {
    this.route.navigate(['/board']);
  }
}
